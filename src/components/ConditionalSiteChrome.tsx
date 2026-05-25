"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"
import CursorFollower from "@/components/ui/cursor-follower"

export function ConditionalSiteChrome() {
  const pathname = usePathname()
  const hideChrome = pathname?.startsWith("/admin") || pathname === "/login"

  if (hideChrome) return null

  return (
    <>
      <Navbar />
      <CursorFollower />
    </>
  )
}
