import { NextResponse, type NextRequest } from "next/server"
import { UserModel } from "@/models/User"
import { connectDB } from "@/lib/db"


export async function POST(request: NextRequest) {
  await connectDB()
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required" },
        { status: 400 },
      )
    }

    const adminCount = await UserModel.countDocuments()
    if (adminCount > 0) {
      return NextResponse.json(
        { success: false, message: "Registration is closed. An admin account already exists." },
        { status: 403 },
      )
    }


    const allowedUsername = process.env.ADMIN_USERNAME
    if (!allowedUsername || username !== allowedUsername) {
      return NextResponse.json(
        { success: false, message: "Registration is not allowed for this username." },
        { status: 403 },
      )
    }

    const user = await UserModel.create({ username, password })

    return NextResponse.json(
      { success: true, message: "Admin account created successfully.", userId: user._id },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Registration error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
