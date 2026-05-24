import { NextResponse, type NextRequest } from "next/server"
import { UserModel } from "@/models/User"
import { connectDB } from "@/lib/db"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  await connectDB()
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ success: false, message: "Username and password are required" }, { status: 400 })
    }

    const user = await UserModel.findOne({ username }).select("+password")

    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET!, {
      expiresIn: "1h", // Token expires in 1 hour
    })

    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure in production
      maxAge: 60 * 60, // 1 hour
      path: "/",
    })

    return NextResponse.json({ success: true, message: "Logged in successfully" }, { status: 200 })
  } catch (error: any) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
