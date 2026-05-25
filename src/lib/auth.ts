import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export function verifyAuthToken(): { valid: boolean; message?: string } {
  try {
    const token = cookies().get("token")?.value
    if (!token) {
      return { valid: false, message: "Not authenticated" }
    }
    jwt.verify(token, process.env.JWT_SECRET!)
    return { valid: true }
  } catch {
    return { valid: false, message: "Invalid or expired token" }
  }
}
