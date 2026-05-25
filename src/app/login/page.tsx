"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { DATA } from "@/data/resume"
import Meteors from "@/components/ui/meteors"
import { BackgroundBeams } from "@/components/ui/background-beams"
import BlurFade from "@/components/magicui/blur-fade"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (data.success) {
        router.push("/admin/latest-work")
      } else {
        setError(data.message || "Login failed")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-panel-page relative min-h-screen w-full overflow-hidden bg-background">
      {/* Aceternity-style layered background */}
      <div className="pointer-events-none fixed inset-0 bg-grid-lines opacity-50 dark:opacity-25" aria-hidden />
      <div className="pointer-events-none fixed inset-0 bg-dot-grid opacity-40 dark:opacity-20" aria-hidden />
      <BackgroundBeams className="fixed inset-0 opacity-60 dark:opacity-30" />
      <Meteors number={14} />

      {/* Ambient glow orbs — softer in dark mode */}
      <div className="pointer-events-none fixed -top-32 left-1/4 h-72 w-72 rounded-full bg-primary/15 dark:bg-primary/10 blur-[100px]" aria-hidden />
      <div className="pointer-events-none fixed bottom-0 right-1/4 h-80 w-80 rounded-full bg-indigo-400/10 dark:bg-indigo-500/8 blur-[120px]" aria-hidden />
      <div className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-violet-500/8 dark:bg-violet-600/5 blur-[140px]" aria-hidden />

      <div className="absolute top-5 right-5 z-50">
        <div className="rounded-full border border-border/50 bg-card/80 dark:bg-card/90 backdrop-blur-xl p-1 shadow-lg">
          <ModeToggle />
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16">
        <BlurFade delay={0.05} inView className="w-full max-w-[420px]">
          {/* Logo + title */}
          <div className="mb-8 flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative mb-5"
            >
              <div className="absolute inset-0 scale-150 rounded-full bg-primary/25 dark:bg-primary/15 blur-2xl" />
              <Link
                href="/"
                className="relative block size-14 sm:size-16 rounded-full overflow-hidden border-2 border-primary/30 dark:border-primary/50 bg-card shadow-[0_0_24px_-8px_hsl(var(--primary)/0.45)] dark:shadow-[0_0_32px_-8px_hsl(var(--primary)/0.35)] hover:scale-105 transition-transform duration-300"
              >
                {/* Same face-only crop as homepage profile photo */}
                <img
                  src={DATA.avatarUrl}
                  alt={DATA.name}
                  className="aspect-square h-full w-full object-cover object-[center_8%]"
                  style={{ transform: "scale(2.5)", transformOrigin: "top center" }}
                />
              </Link>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-muted-foreground dark:text-slate-400 max-w-xs">
              Sign in to manage your portfolio, projects, and latest work
            </p>
          </div>

          {/* Glowing card */}
          <div className="relative group">
            <div
              className={cn(
                "absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-violet-500 via-primary to-indigo-500 opacity-50 blur-md",
                "dark:from-violet-600/40 dark:via-primary/50 dark:to-indigo-600/40 dark:opacity-70",
                "group-hover:opacity-70 dark:group-hover:opacity-90 transition duration-500",
              )}
              aria-hidden
            />
            <div className="relative rounded-2xl border border-border/60 bg-card/90 dark:bg-card/95 dark:border-border p-6 sm:p-8 shadow-xl dark:shadow-2xl dark:shadow-black/40 backdrop-blur-xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium text-foreground">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Enter your username"
                      className="h-12 pl-10 rounded-xl border-input bg-secondary/50 dark:bg-secondary dark:border-border dark:text-foreground dark:placeholder:text-slate-500 focus-visible:ring-primary/40 dark:focus-visible:ring-primary/60"
                      autoComplete="username"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
                      className="h-12 pl-10 pr-11 rounded-xl border-input bg-secondary/50 dark:bg-secondary dark:border-border dark:text-foreground dark:placeholder:text-slate-500 focus-visible:ring-primary/40 dark:focus-visible:ring-primary/60"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                  >
                    {error}
                  </motion.p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "relative h-12 w-full rounded-xl text-base font-semibold overflow-hidden",
                    "bg-gradient-to-r from-violet-600 via-primary to-indigo-600",
                    "dark:from-violet-500 dark:via-[hsl(262,85%,65%)] dark:to-indigo-500",
                    "text-white dark:text-white",
                    "hover:opacity-95 dark:hover:brightness-110",
                    "shadow-lg shadow-primary/20 dark:shadow-primary/30",
                    "transition-all duration-300",
                  )}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <Loader2 className="size-5 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in to admin"
                    )}
                  </span>
                </Button>
              </form>
            </div>
          </div>

          <BlurFade delay={0.2} inView>
            <p className="mt-8 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors group"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
                Back to portfolio
              </Link>
            </p>
          </BlurFade>
        </BlurFade>
      </div>
    </div>
  )
}
