import { type NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export async function POST(request: NextRequest) {
  try {
    const { base64Image } = await request.json()

    if (!base64Image) {
      return NextResponse.json({ success: false, message: "No image data provided" }, { status: 400 })
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(base64Image, {
      resource_type: "image",
      folder: "portfolio",
      transformation: [{ width: 1000, height: 1000, crop: "limit" }, { quality: "auto" }, { fetch_format: "auto" }],
    })

    return NextResponse.json({
      success: true,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    })
  } catch (error: any) {
    console.error("Upload error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
