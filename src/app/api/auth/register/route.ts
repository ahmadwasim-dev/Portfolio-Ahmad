import { NextResponse, type NextRequest } from "next/server"
import { UserModel } from "@/models/User"
import { connectDB } from "@/lib/db"

export async function POST(request: NextRequest) {
  await connectDB()
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ success: false, message: "Username and password are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ username })
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 409 })
    }

    const user = await UserModel.create({ username, password })

    return NextResponse.json(
      { success: true, message: "User registered successfully", userId: user._id },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Registration error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
