import { NextResponse } from "next/server"
import { UserModel } from "@/models/User"
import { connectDB } from "@/lib/db"

// ─── ADMIN RESET ENDPOINT ─────────────────────────────────────────────────────
// GET /api/auth/reset-admin
//
// DANGER: This deletes ALL existing users and re-creates Ahmad's account fresh.
// Only works if ADMIN_USERNAME and ADMIN_PASSWORD are set in .env
// ─────────────────────────────────────────────────────────────────────────────

export async function GET() {
  await connectDB()
  try {
    const username = process.env.ADMIN_USERNAME
    const password = process.env.ADMIN_PASSWORD

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "ADMIN_USERNAME or ADMIN_PASSWORD not set in .env" },
        { status: 500 },
      )
    }

    // Delete ALL existing users
    await UserModel.deleteMany({})

    // Create fresh admin account with correct credentials
    await UserModel.create({ username, password })

    return NextResponse.json(
      {
        success: true,
        message: `All old accounts deleted. Fresh admin account for "${username}" created. You can now log in with your credentials.`,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Reset error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
