import { NextResponse, type NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { UserModel } from "@/models/User"
import { connectDB } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  await connectDB()
  try {
    const token = cookies().get("token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    const user = await UserModel.findById(decoded.id).select("-password")

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, user }, { status: 200 })
  } catch (error: any) {
    console.error("Auth check error:", error)
    return NextResponse.json({ success: false, message: "Invalid token or not authenticated" }, { status: 401 })
  }
}
