"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { AdminLogo } from "@/components/admin/AdminLogo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LogOut, LayoutDashboard, FolderKanban } from "lucide-react"

interface AdminShellProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  onLogout?: () => void
}

const navItems = [
  { href: "/admin/latest-work", label: "Latest Work", icon: FolderKanban },
  { href: "/admin", label: "Full Portfolio", icon: LayoutDashboard },
]

import Meteors from "@/components/ui/meteors"
import { BackgroundBeams } from "@/components/ui/background-beams"

export default function AdminShell({
  children,
  title = "Admin",
  subtitle = "Manage your portfolio content",
  onLogout,
}: AdminShellProps) {
  const pathname = usePathname()

  return (
    <div className="admin-panel-page min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Aceternity-style layered background */}
      <div className="pointer-events-none fixed inset-0 bg-grid-lines opacity-50 dark:opacity-25" aria-hidden />
      <div className="pointer-events-none fixed inset-0 bg-dot-grid opacity-40 dark:opacity-20" aria-hidden />
      <BackgroundBeams className="fixed inset-0 opacity-60 dark:opacity-30" />
      <Meteors number={14} />

      {/* Ambient glow orbs */}
      <div className="pointer-events-none fixed -top-32 left-1/4 h-72 w-72 rounded-full bg-primary/15 dark:bg-primary/10 blur-[100px]" aria-hidden />
      <div className="pointer-events-none fixed bottom-0 right-1/4 h-80 w-80 rounded-full bg-indigo-400/10 dark:bg-indigo-500/8 blur-[120px]" aria-hidden />
      <div className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-violet-500/8 dark:bg-violet-600/5 blur-[140px]" aria-hidden />

      <header className="relative z-10 border-b border-border/40 bg-card/60 backdrop-blur-xl">
        <div className="container max-w-5xl mx-auto px-4 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <AdminLogo />
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <ModeToggle />
            {onLogout && (
              <Button type="button" variant="outline" size="sm" onClick={onLogout} className="gap-1.5">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            )}
          </div>
        </div>

        <nav className="container max-w-5xl mx-auto px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border",
                  active
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-background/80 text-muted-foreground border-border/50 hover:text-foreground hover:border-border",
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground border border-border/50 hover:text-foreground ml-auto"
          >
            View site
          </Link>
        </nav>
      </header>

      <main className="relative z-10 container max-w-5xl mx-auto px-4 py-8 pb-16">{children}</main>
    </div>
  )
}
