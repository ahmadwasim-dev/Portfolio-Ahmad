import { NextResponse } from "next/server"
import { UserModel } from "@/models/User"
import { connectDB } from "@/lib/db"

// ─── ONE-TIME ADMIN SEED ──────────────────────────────────────────────────────
// GET /api/auth/seed
//
// Call this endpoint ONCE to create Ahmad's admin account.
// After the account exists, this endpoint is permanently locked and returns 403.
//
// Usage: visit http://localhost:3000/api/auth/seed in your browser (one time only)
// ─────────────────────────────────────────────────────────────────────────────

export async function GET() {
  await connectDB()
  try {
    // Check if any admin already exists
    const adminCount = await UserModel.countDocuments()
    if (adminCount > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin account already exists. This seed endpoint is permanently locked.",
        },
        { status: 403 },
      )
    }

    const username = process.env.ADMIN_USERNAME
    const password = process.env.ADMIN_PASSWORD

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "ADMIN_USERNAME or ADMIN_PASSWORD is not set in environment variables.",
        },
        { status: 500 },
      )
    }

    // Create the one and only admin account
    await UserModel.create({ username, password })

    return NextResponse.json(
      {
        success: true,
        message: `Admin account for "${username}" created successfully. This endpoint is now permanently locked.`,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Seed error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
