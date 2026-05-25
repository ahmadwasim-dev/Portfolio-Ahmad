import Link from "next/link"
import { cn } from "@/lib/utils"

interface AdminLogoProps {
  size?: "sm" | "md"
  className?: string
}

export function AdminLogo({ size = "md", className }: AdminLogoProps) {
  const sizeClass = size === "sm" ? "size-9 text-xs" : "size-10 text-sm"
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center justify-center rounded-full bg-foreground text-background font-bold hover:scale-110 transition-transform shrink-0",
        sizeClass,
        className,
      )}
    >
      ah
    </Link>
  )
}
