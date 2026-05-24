"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import Input from "@mui/material/Input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, ImageIcon, Loader2 } from "lucide-react"

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("image", file)

    try {
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (data.success) {
        setImageUrl(data.image.url)
        console.log("Image uploaded successfully:", data.image)
      } else {
        alert("Upload failed: " + data.message)
      }
    } catch (err) {
      console.error("Error uploading image:", err)
      alert("Error uploading image")
    } finally {
      setUploading(false)
    }
  }

  const resetUpload = () => {
    setFile(null)
    setPreview(null)
    setImageUrl(null)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Image Upload to Cloudinary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <input type="file" accept="image/*" onChange={handleFileChange} className="cursor-pointer" />
            <p className="text-sm text-muted-foreground">Select an image file (JPG, PNG, GIF, WebP)</p>
          </div>

          {preview && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Preview:</h3>
              <img
                src={preview || "/placeholder.svg"}
                alt="Preview"
                className="max-w-full h-48 object-contain rounded-lg border"
              />
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={handleUpload} disabled={!file || uploading} className="flex items-center gap-2">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {uploading ? "Uploading..." : "Upload Image"}
            </Button>

            {(file || imageUrl) && (
              <Button variant="outline" onClick={resetUpload}>
                Reset
              </Button>
            )}
          </div>

          {imageUrl && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-green-600">✅ Upload Successful!</h3>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-mono break-all">{imageUrl}</p>
              </div>
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="Uploaded"
                className="max-w-full h-64 object-contain rounded-lg border"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
