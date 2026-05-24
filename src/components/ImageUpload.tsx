"use client"
import { useRef, useState } from "react"
import type React from "react"
import { Loader2, Upload, X } from "lucide-react"

interface ImageUploadProps {
  currentImage: { public_id: string; url: string }
  onImageChange: (image: { public_id: string; url: string }) => void
  className?: string
}

export default function ImageUpload({ currentImage, onImageChange, className = "" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileClick = () => {
    if (!uploading && !deleting) {
      fileInputRef.current?.click()
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      // Delete existing image if present
      if (currentImage.public_id) {
        await fetch(`/api/delete-image?publicId=${encodeURIComponent(currentImage.public_id)}`, {
          method: "DELETE",
        })
      }

      // Convert to base64 and upload
      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const base64String = reader.result as string
          const response = await fetch("/api/upload-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ base64Image: base64String }),
          })

          const data = await response.json()

          if (data.success) {
            onImageChange(data.image)
          } else {
            alert("Upload failed: " + data.message)
          }
        } catch (error) {
          console.error("Upload error:", error)
          alert("Error uploading image")
        } finally {
          setUploading(false)
        }
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Upload error:", error)
      alert("Error uploading image")
      setUploading(false)
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemoveImage = async () => {
    if (!currentImage.public_id) return

    setDeleting(true)

    try {
      const response = await fetch(`/api/delete-image?publicId=${encodeURIComponent(currentImage.public_id)}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        onImageChange({ public_id: "", url: "" })
      } else {
        alert("Failed to delete image: " + data.message)
      }
    } catch (error) {
      console.error("Delete error:", error)
      alert("Error deleting image")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading || deleting}
        ref={fileInputRef}
        className="hidden"
      />

      {/* When image is present */}
      {currentImage.url ? (
        <div className="space-y-2">
          <div className="relative">
            <img
              src={currentImage.url || "/placeholder.svg"}
              alt="Uploaded"
              className={`h-20 w-20 rounded-full object-cover border border-gray-400 dark:border-gray-600 ${
                uploading ? "opacity-50" : ""
              }`}
            />
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/80 dark:bg-black/80 rounded-full p-2">
                  <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleFileClick}
              disabled={uploading || deleting}
              className={`flex items-center gap-2 px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                uploading || deleting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Change
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={deleting || uploading}
              className={`flex items-center gap-2 px-3 py-1 text-sm border border-red-300 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors ${
                deleting || uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Removing...
                </>
              ) : (
                <>
                  <X className="w-4 h-4" />
                  Remove
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        // When no image is present
        <div>
          <button
            type="button"
            onClick={handleFileClick}
            disabled={uploading || deleting}
            className={`flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
              uploading || deleting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload Image
              </>
            )}
          </button>
        </div>
      )}

     
    </div>
  )
}
