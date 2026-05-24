import { type NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary directly in this file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const publicId = searchParams.get("publicId")

    if (!publicId) {
      return NextResponse.json({ success: false, message: "Public ID is required" }, { status: 400 })
    }

    // Delete video from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
    })

    console.log("Delete result:", result)

    return NextResponse.json({
      success: true,
      result: result,
    })
  } catch (error: any) {
    console.error("Delete error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
