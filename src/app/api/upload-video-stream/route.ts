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

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024)
    console.log(`Uploading file: ${file.name}, Size: ${fileSizeInMB.toFixed(2)}MB`)

    // Use upload stream for better handling of large files
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "videos",
          // No transformations at upload time for large files
          eager_async: true,
          eager: [{ quality: "auto", format: "mp4" }],
          eager_notification_url: "http://localhost:3000/api/cloudinary-webhook",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error)
            reject(error)
          } else {
            resolve(result)
          }
        },
      )

      // Write buffer to stream
      uploadStream.end(buffer)
    })

    return NextResponse.json({
      success: true,
      video: {
        public_id: (result as any).public_id,
        url: (result as any).secure_url,
        duration: (result as any).duration,
        width: (result as any).width,
        height: (result as any).height,
        format: (result as any).format,
        bytes: (result as any).bytes,
      },
    })
  } catch (error: any) {
    console.error("Upload error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
