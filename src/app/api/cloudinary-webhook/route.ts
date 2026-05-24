import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()

    // Parse the webhook payload
    const data = JSON.parse(body)

    console.log("Cloudinary webhook received:", data)

    // Here you can handle the processed video
    // For example, update your database with the processed video URLs
    if (data.notification_type === "eager") {
      console.log("Video processing completed:", {
        public_id: data.public_id,
        eager: data.eager,
      })

      // You can emit events, update database, send notifications, etc.
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
