"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Video, Loader2, Play, RefreshCw } from "lucide-react"
interface VideoUploadProps{
    videoInfo:any,
    projectIndex:number,
     updateProjectVide: (index: number, video: any) => void;
     deleteProjectVide:(index: number)=>void
}
const VideoUpload:React.FC<VideoUploadProps>=({videoInfo,projectIndex,updateProjectVide, deleteProjectVide})=> {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)

  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("video", file)

    // Show different message for large files
    const isLargeFile = file.size > 100 * 1024 * 1024 // 100MB

    try {
      const res = await fetch("/api/upload-video-stream", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (data.success) {
    
        updateProjectVide(projectIndex,data.video)
        console.log("Video uploaded successfully:", data.video)

        if (isLargeFile) {
          alert("Large video uploaded! Processing may take a few minutes. You'll be notified when ready.")
        }
      } else {
        alert("Upload failed: " + data.message)
      }
    } catch (err) {
      console.error("Error uploading video:", err)
      alert("Error uploading video")
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteAndReset = async () => {
    if (!videoInfo?.public_id) return

    setDeleting(true)

    try {
      const res = await fetch(`/api/delete-video?publicId=${encodeURIComponent(videoInfo.public_id)}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (data.success) {
        // Reset all states
        setFile(null)
  
         deleteProjectVide(projectIndex)
        console.log("Video deleted successfully from Cloudinary")
      } else {
        alert("Failed to delete video: " + data.message)
      }
    } catch (err) {
      console.error("Error deleting video:", err)
      alert("Error deleting video")
    } finally {
      setDeleting(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            Video Upload to Cloudinary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!videoInfo.url && (
            <>
              <div className="space-y-2">
                <Input type="file" accept="video/*" onChange={handleFileChange} className="cursor-pointer" />
                <p className="text-sm text-muted-foreground">Select a video file (MP4, MOV, AVI, WebM, etc.)</p>
              </div>

              {file && file.size > 100 * 1024 * 1024 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Large file detected ({formatFileSize(file.size)}). Processing may take several minutes after
                    upload.
                  </p>
                </div>
              )}

              {file && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">File Information:</h3>
                  <div className="text-sm text-muted-foreground space-y-1 bg-muted p-3 rounded-lg">
                    <p>
                      <strong>Name:</strong> {file.name}
                    </p>
                    <p>
                      <strong>Size:</strong> {formatFileSize(file.size)}
                    </p>
                    <p>
                      <strong>Type:</strong> {file.type}
                    </p>
                  </div>
                </div>
              )}

              <Button onClick={handleUpload} disabled={!file || uploading} className="flex items-center gap-2 w-full">
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {uploading ? "Uploading..." : "Upload Video"}
              </Button>
            </>
          )}

          {  videoInfo.url && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-green-600 flex items-center gap-2">
                <Play className="w-4 h-4" />✅ Upload Successful!
              </h3>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Video Details:</h4>
                <div className="text-sm text-muted-foreground space-y-1 bg-muted p-3 rounded-lg">
                  <p>
                    <strong>Duration:</strong> {formatDuration(videoInfo.duration)}
                  </p>
                  <p>
                    <strong>Dimensions:</strong> {videoInfo.width} x {videoInfo.height}
                  </p>
                  <p>
                    <strong>Format:</strong> {videoInfo.format}
                  </p>
                  <p>
                    <strong>Size:</strong> {formatFileSize(videoInfo.bytes)}
                  </p>
                  <p>
                    <strong>Public ID:</strong> {videoInfo.public_id}
                  </p>
                </div>
              </div>

             

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Uploaded Video:</h4>
                <video src={videoInfo.url} controls className="w-full max-h-64 rounded-lg border" preload="metadata" />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleDeleteAndReset}
                  disabled={deleting}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                  {deleting ? "Removing..." : "Change Video"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default VideoUpload