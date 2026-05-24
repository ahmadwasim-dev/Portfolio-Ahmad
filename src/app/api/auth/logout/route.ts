import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    cookies().delete("token")
    return NextResponse.json({ success: true, message: "Logged out successfully" }, { status: 200 })
  } catch (error: any) {
    console.error("Logout error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
