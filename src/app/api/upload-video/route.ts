import { type NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary directly in this file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("video") as File

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 })
    }

    // Check file size and adjust upload strategy
    const fileSizeInMB = file.size / (1024 * 1024)
    const isLargeFile = fileSizeInMB > 100 // Files larger than 100MB

    console.log(`Uploading file: ${file.name}, Size: ${fileSizeInMB.toFixed(2)}MB`)

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Convert buffer to base64 string for Cloudinary
    const base64 = buffer.toString("base64")
    const dataUri = `data:${file.type};base64,${base64}`

    // For very large files, use a different upload strategy
    const uploadOptions: any = {
      resource_type: "video",
      folder: "videos",
      chunk_size: 6000000,
      timeout: 120000,
    }

    if (isLargeFile) {
      // For large files, only use async processing
      uploadOptions.eager = [
        { quality: "auto", format: "mp4" },
        { quality: "auto", format: "webm" },
      ]
      uploadOptions.eager_async = true
      uploadOptions.eager_notification_url = "http://localhost:3000/api/cloudinary-webhook"
    } else {
      // For smaller files, we can use some synchronous transformations
      uploadOptions.transformation = [{ quality: "auto" }]
    }

    // Upload video to Cloudinary - simplified for large files
    const result = await cloudinary.uploader.upload(dataUri, uploadOptions)

    return NextResponse.json({
      success: true,
      video: {
        public_id: result.public_id,
        url: result.secure_url,
        duration: result.duration,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
      },
    })
  } catch (error: any) {
    console.error("Upload error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
