import { NextResponse } from "next/server"
import { UserModel } from "@/models/User"
import { connectDB } from "@/lib/db"

// Debug endpoint — DELETE THIS AFTER FIXING LOGIN
export async function GET() {
  try {
    await connectDB()
    const users = await UserModel.find({}).select("+username createdAt")
    return NextResponse.json({
      success: true,
      userCount: users.length,
      users: users.map((u) => ({ username: u.username, id: u._id, createdAt: u.createdAt })),
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
