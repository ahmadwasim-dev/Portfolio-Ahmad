"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import LatestWorkAdmin from "@/components/LatestWorkAdmin"
import AdminShell from "@/components/admin/AdminShell"

export default function LatestWorkAdminPage() {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me")
        if (res.ok) {
          setIsAuthenticated(true)
        } else {
          router.push("/login")
        }
      } catch {
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="admin-panel-page min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <AdminShell
      title="Latest Work"
      subtitle="Add, edit, or delete projects shown on your homepage"
      onLogout={handleLogout}
    >
      <div className="admin-surface p-6 sm:p-8">
        <LatestWorkAdmin />
      </div>
    </AdminShell>
  )
}
