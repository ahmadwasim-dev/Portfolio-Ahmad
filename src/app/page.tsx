"use client"

import { HackathonCard } from "@/components/hackathon-card"
import BlurFade from "@/components/magicui/blur-fade"
import BlurFadeText from "@/components/magicui/blur-fade-text"
import { ProjectCard } from "@/components/project-card"
import { ResumeCard } from "@/components/resume-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { cva } from "class-variance-authority"
import Markdown from "react-markdown"
import { useEffect, useState, Suspense, lazy } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadData } from "@/redux/actions/data"
import type { IData } from "@/models/DataModel"
import dynamic from "next/dynamic"
import { FileJson, Globe, BrainCircuit, Terminal, Cpu } from "lucide-react"
import Meteors from "@/components/ui/meteors"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { LampContainer } from "@/components/ui/lamp"
import { motion } from "framer-motion"
import { ParticleLoader } from "@/components/ParticleLoader"

// Lazy load below-the-fold sections
const ProjectsSection = dynamic(() => import("@/components/ProjectsSection"), {
  loading: () => <div className="h-96 animate-pulse bg-foreground/5 rounded-lg" />,
  ssr: false,
})

const HackathonsSection = dynamic(() => import("@/components/HackathonsSection"), {
  loading: () => <div className="h-96 animate-pulse bg-foreground/5 rounded-lg" />,
  ssr: false,
})

const EducationSection = dynamic(() => import("@/components/EducationSection"), {
  loading: () => <div className="h-96 animate-pulse bg-foreground/5 rounded-lg" />,
  ssr: false,
})

const BLUR_FADE_DELAY = 0.04
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-sm",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "text-foreground border-border hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

// Work Experience Item Component
function WorkExperienceItem({ work, id }: { work: any; id: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 11 + id * 0.1}>
      <div className="space-y-2 sm:space-y-3">
        <div
          className="flex items-start gap-3 sm:gap-4 cursor-pointer group"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Avatar className="size-10 sm:size-12 border flex-shrink-0">
            <AvatarImage
              alt={work.company}
              src={work.logoUrl?.url || work.logoUrl}
            />
            <AvatarFallback>{work.company[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div className="inline-flex items-center gap-2">
                <span className="text-base sm:text-lg font-semibold">{work.company}</span>
                <svg
                  className={`size-3.5 sm:size-4 flex-shrink-0 transition-transform duration-300 ease-in-out ${isExpanded ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground">{work.start} - {work.end ?? "Present"}</span>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">{work.location}</p>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="ml-12 sm:ml-16 text-sm sm:text-base text-muted-foreground space-y-2 sm:space-y-3 pt-2 leading-relaxed">
            {Array.isArray(work.description) ? (
              work.description.map((desc: string, i: number) => (
                <p key={i}>• {desc}</p>
              ))
            ) : (
              <p>{work.description}</p>
            )}
          </div>
        </div>
      </div>
    </BlurFade>
  );
}

// Work Experience List Component
function WorkExperienceList({ work }: { work: any[] }) {
  return (
    <div className="space-y-8">
      {work.map((workItem, id) => (
        <WorkExperienceItem key={workItem.company} work={workItem} id={id} />
      ))}
    </div>
  );
}

const getSkillLogo = (name: string) => {
  const normName = name.toLowerCase();

  if (normName.includes("flutter")) {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.314 0L2.3 12 6 15.7l15.686-15.7h-7.372zm.012 11.836l-5.962 5.962 5.962 5.962h7.372l-5.962-5.962 5.962-5.962z" fill="#02569B" />
      </svg>
    );
  }
  if (normName.includes("dart")) {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 12l2.671-5.329L8 1.343l5.329 1.343L20 8l-2.671 5.329L12 22.657l-5.329-1.343z" fill="#00B4AB" />
      </svg>
    );
  }
  if (normName.includes("mongodb")) {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-.22 0-.44.01-.65.03v23.87c.21.02.43.03.65.03 6.08 0 11.02-4.94 11.02-11.02S18.08 0 12 0z" fill="#47A248" />
      </svg>
    );
  }
  if (normName.includes("express")) {
    return <Terminal className="size-5 text-gray-500" />;
  }
  if (normName.includes("react")) {
    return (
      <svg className="size-5" viewBox="-11.5 -10.23 23 20.46" fill="none" stroke="#61DAFB" strokeWidth="1.2">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g>
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }
  if (normName.includes("node")) {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7.8v11.6L12 22l10-5.8V7.8L12 2z" fill="#339933" />
      </svg>
    );
  }
  if (normName.includes("python")) {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.25.18c-.98.08-1.9.77-1.9 1.76v1.63h3.75c1.03 0 1.87.84 1.87 1.87v3.75h1.63c.99 0 1.68-.92 1.76-1.9a3.75 3.75 0 0 0-3.35-3.35h-3.75zm-8.25 3.75a3.75 3.75 0 0 0-3.75 3.75v3.75h3.75c1.03 0 1.87-.84 1.87-1.87v-3.75H6zm7.5 4.5v1.5h-1.5v-1.5h1.5zm.75 3.75c.98-.08 1.9-.77 1.9-1.76V8.79h-3.75a1.87 1.87 0 0 1-1.87-1.87v-3.75h-1.63c-.99 0-1.68.92-1.76 1.9a3.75 3.75 0 0 0 3.35 3.35h3.75zm-3.75.75v1.5h-1.5v-1.5h1.5z" fill="#3776AB" />
      </svg>
    );
  }
  if (normName.includes("api") || normName.includes("rest")) {
    return <FileJson className="size-5 text-amber-500" />;
  }
  if (normName.includes("firebase")) {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.89 15.75L2 14.86l8.84-8.84 3.89 3.89-10.84 5.84zm16.22-3.89L12 3.02l-3.89 3.89 8.84 8.84 3.16-3.89z" fill="#FFCA28" />
      </svg>
    );
  }
  if (normName === "c") {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.8 14.3c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3c1.3 0 2.5.6 3.3 1.6l-1.5 1c-.5-.6-1.1-.9-1.8-.9-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5c.7 0 1.3-.3 1.8-.9l1.5 1c-.8 1-2 1.6-3.3 1.6z" fill="#00599C" />
      </svg>
    );
  }
  if (normName === "c++") {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.8 14.3c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3c1.3 0 2.5.6 3.3 1.6l-1.5 1c-.5-.6-1.1-.9-1.8-.9-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5c.7 0 1.3-.3 1.8-.9l1.5 1c-.8 1-2 1.6-3.3 1.6zM18 11h-2V9h-1v2h-2v1h2v2h1v-2h2v-1z" fill="#00599C" />
      </svg>
    );
  }
  if (normName.includes("solving")) {
    return <BrainCircuit className="size-5 text-indigo-500" />;
  }
  if (normName.includes("web development")) {
    return <Globe className="size-5 text-emerald-500" />;
  }
  if (normName === "html") {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm15.6 5.8H7.3l.2 2.2h8.3l-.3 3.6-3.5 1.2-3.5-1.2-.2-2.4H6l.4 5 5.6 1.9 5.6-1.9.9-10.6.1-2.2z" fill="#E34F26" />
      </svg>
    );
  }
  if (normName === "css") {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm15.8 5.8H6.8l.4 4.5h9.1l-.3 3.6-4 1.3-4-1.3-.2-2.4H6l.3 5.1 5.7 1.9 5.7-1.9 1.1-12.8z" fill="#1572B6" />
      </svg>
    );
  }
  if (normName.includes("javascript")) {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm20.2 17.6c0-1.8-1.1-2.8-3.1-3.6-1-.4-1.6-.7-1.6-1.3 0-.5.4-.8 1-.8.7 0 1.2.3 1.5.8l2.2-1.4c-.6-1.2-1.9-1.9-3.7-1.9-2.3 0-3.9 1.3-3.9 3.2 0 1.9 1.2 2.7 3.3 3.5 1.2.5 1.6.8 1.6 1.4 0 .6-.5.9-1.2.9-.9 0-1.6-.5-1.9-1.2l-2.2 1.3c.6 1.5 2.1 2.3 4.1 2.3 2.5 0 4.2-1.3 4.2-3.5z" fill="#F7DF1E" />
      </svg>
    );
  }
  if (normName.includes("typescript")) {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm22 17.5c0-1.7-1-2.7-3-3.5-1-.4-1.5-.7-1.5-1.2s.4-.8 1-.8c.7 0 1.2.3 1.5.8l2-1.3c-.6-1.2-1.8-1.9-3.5-1.9-2.2 0-3.8 1.3-3.8 3.1 0 1.8 1.2 2.6 3.2 3.4 1.1.4 1.5.8 1.5 1.3s-.5.9-1.2.9c-.9 0-1.5-.5-1.8-1.1l-2 1.2c.6 1.4 2 2.2 3.8 2.2 2.5 0 4.1-1.3 4.1-3.4zM10.8 10h-8v2h3v10h2V12h3V10z" fill="#3178C6" />
      </svg>
    );
  }
  if (normName === "git") {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.3 10.9L13.1.7C12.7.3 12 .3 11.6.7L9.5 2.8l2.9 2.9c.7-.2 1.5.1 2.1.7.6.6.8 1.4.7 2.1l2.9 2.9c.7-.1 1.5.1 2.1.7.8.8.8 2.1 0 2.9-.8.8-2.1.8-2.9 0-.6-.6-.8-1.4-.7-2.1L13.8 9.9c-.1.7-.4 1.3-.9 1.8-.7.7-1.7.9-2.6.5l-2.6 2.6c.3.9.1 1.9-.5 2.6-.8.8-2.1.8-2.9 0-.8-.8-.8-2.1 0-2.9.7-.7 1.7-.9 2.6-.5l2.6-2.6c-.3-.9-.1-1.9.5-2.6.5-.5 1.1-.8 1.8-.9L8.9 5 1.1 12.8c-.4.4-.4 1.1 0 1.5l10.2 10.2c.4.4 1.1.4 1.5 0l10.5-10.5c.4-.4.4-1.2 0-1.6z" fill="#F05032" />
      </svg>
    );
  }
  if (normName === "github") {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.6 21.8 24 17.3 24 12c0-6.6-5.4-12-12-12z" />
      </svg>
    );
  }

  return <Cpu className="size-5 text-indigo-500" />;
};

export default function Page() {
  const dispatch: any = useDispatch()
  const { DATA, loading: reduxLoading, error } = useSelector((state: any) => state.PortfolioData)
  
  // Custom loading state that guarantees the 4.5s animation plays fully
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Start fetching data
    dispatch(loadData())
    
    // Ensure the loader stays visible for exactly 4.5s
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, [dispatch])

  useEffect(() => {
    if (loading) {
      document.body.classList.add("no-scroll")
    } else {
      document.body.classList.remove("no-scroll")
    }
    // Clean up the class when the component unmounts or loading state changes
    return () => {
      document.body.classList.remove("no-scroll")
    }
  }, [loading])

  if (loading || (reduxLoading && !error)) {
    return <ParticleLoader />
  }
  if (!DATA) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 p-8 rounded-2xl border border-destructive/20 bg-destructive/5">
          <div className="text-6xl font-black mb-4">ah</div>
          <div className="text-2xl font-bold text-destructive">⚠️ Error</div>
          <p className="text-muted-foreground">Failed to load portfolio data. Please try refreshing the page.</p>
        </div>
      </div>
    )
  }

  const portfolio: IData = DATA

  // Find the 'X' and 'LinkedIn' social links dynamically
  const xSocialLink = portfolio.contact.social.find((s) => s.name === "X")?.url || "#"
  const linkedInSocialLink = portfolio.contact.social.find((s) => s.name === "LinkedIn")?.url || "#"

  return (
    <main className="relative flex flex-col min-h-[100dvh] overflow-hidden bg-background text-foreground transition-colors duration-500">
      {/* Premium Aceternity-style Mesh Gradient & Grid Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
        {/* Animated Aurora Glows */}
        <div className="absolute -top-40 left-[-10%] w-[60%] h-[60%] bg-indigo-500/15 dark:bg-indigo-600/25 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute -bottom-40 right-[-10%] w-[60%] h-[60%] bg-fuchsia-500/15 dark:bg-purple-600/25 rounded-full blur-[160px] animate-pulse delay-1000"></div>
        <div className="absolute top-[30%] left-[25%] w-[40%] h-[40%] bg-cyan-400/5 dark:bg-cyan-500/10 rounded-full blur-[130px] animate-bounce-slow"></div>

        {/* Animated Grid & Dot Overlays */}
        <div className="absolute inset-0 bg-grid-lines"></div>
        <div className="absolute inset-0 bg-dot-grid"></div>

        {/* Spotlight Beam effect overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,var(--background)_80%)] opacity-85"></div>

        {/* Aceternity Meteors background animation */}
        <Meteors number={18} />

        {/* Animated Background Beams globally visible */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50 dark:opacity-100">
          <BackgroundBeams />
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto w-full space-y-16 sm:space-y-24 md:space-y-32 py-8 sm:py-12">
        {/* Hero Section - New Design */}
        <section id="hero" className="min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-16 sm:pt-20">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-4 sm:space-y-6 md:space-y-8 order-2 lg:order-1">
                <BlurFade delay={BLUR_FADE_DELAY}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs sm:text-sm font-medium">Available for work</span>
                  </div>
                </BlurFade>

                <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Hi, I'm <span className="whitespace-nowrap">{portfolio.name.split(" ")[0]} 👋</span>
                  </h1>
                </BlurFade>

                <BlurFade delay={BLUR_FADE_DELAY * 2}>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-xl">
                    {portfolio.description}
                  </p>
                </BlurFade>

                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                    <Link
                      href="#contact"
                      className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-foreground text-background rounded-xl sm:rounded-2xl font-semibold overflow-hidden transition-all hover:shadow-2xl hover:scale-105 text-center text-sm sm:text-base"
                    >
                      <span className="relative z-10">Get in touch</span>
                    </Link>
                    <a
                      href={portfolio.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-foreground/20 rounded-xl sm:rounded-2xl font-semibold hover:bg-foreground/5 hover:border-foreground/40 transition-all hover:scale-105 text-center text-sm sm:text-base"
                    >
                      View Resume
                    </a>
                  </div>
                </BlurFade>
              </div>

              {/* Right Content - Avatar */}
              <BlurFade delay={BLUR_FADE_DELAY} className="order-1 lg:order-2 flex justify-center lg:justify-end w-full">
                <div className="relative w-full flex justify-center">
                  <LampContainer className="bg-transparent h-[380px] sm:h-[480px] md:h-[520px] lg:h-[580px] w-full max-w-md">
                    <Avatar className="size-48 sm:size-64 md:size-72 lg:size-80 border-2 sm:border-4 border-white shadow-2xl ring-1 sm:ring-2 ring-indigo-500/30">
                      <img alt={portfolio.name} src={portfolio.avatarUrl.url || "/placeholder.svg"} className="aspect-square h-full w-full object-cover object-[center_8%] transition-all duration-300" style={{ transform: "scale(2.5)", transformOrigin: "top center" }} />
                      <AvatarFallback className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gray-100 text-gray-700">
                        {portfolio.initials}
                      </AvatarFallback>
                    </Avatar>
                  </LampContainer>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>
        {/* About Section - New Design */}
        <section id="about" className="scroll-mt-16 sm:scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <BlurFade delay={BLUR_FADE_DELAY * 6}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
                About Me
              </h2>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-6xl">
                <Markdown className="prose prose-sm sm:prose-base max-w-full text-muted-foreground prose-p:leading-relaxed prose-headings:text-foreground">
                  {portfolio.summary}
                </Markdown>
              </div>
            </BlurFade>
          </div>
        </section>
        {/* Skills Section - Aceternity Hover Grid style */}
        <section id="skills" className="scroll-mt-16 sm:scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <BlurFade delay={BLUR_FADE_DELAY * 8}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
                Skills & Technologies
              </h2>
            </BlurFade>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {portfolio.skills.map((skill, id) => (
                <BlurFade key={skill} delay={BLUR_FADE_DELAY * 9 + id * 0.02}>
                  <div className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-border/40 bg-background/50 backdrop-blur-md px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(99,102,241,0.12)] hover:border-indigo-500/50 cursor-pointer">
                    {/* Glow Background Effect */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Logo Container */}
                    <div className="flex-shrink-0 flex items-center justify-center size-8 rounded-lg bg-muted/40 group-hover:bg-muted transition-colors duration-300">
                      {getSkillLogo(skill)}
                    </div>

                    <span className="text-xs sm:text-sm font-semibold tracking-wide text-muted-foreground group-hover:text-foreground transition-colors duration-200 truncate">
                      {skill}
                    </span>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* Work Experience - Expandable */}
        <section id="work" className="scroll-mt-16 sm:scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <BlurFade delay={BLUR_FADE_DELAY * 10}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
                Work Experience
              </h2>
            </BlurFade>

            <WorkExperienceList work={portfolio.work} />
          </div>
        </section>

        {/* Education - Lazy Loaded */}
        <EducationSection data={portfolio} delay={BLUR_FADE_DELAY} />
        {/* Projects Section - Lazy Loaded */}
        <ProjectsSection data={portfolio} delay={BLUR_FADE_DELAY} />

        {/* Hackathons Section - Lazy Loaded */}
        <HackathonsSection data={portfolio} delay={BLUR_FADE_DELAY} />

        {/* Contact Section - Simplified */}
        <section id="contact" className="scroll-mt-16 sm:scroll-mt-20 pb-16 sm:pb-24 md:pb-32">
          <div className="max-w-6xl mx-auto">
            <BlurFade delay={BLUR_FADE_DELAY * 18}>
              <div className="text-center space-y-4 sm:space-y-6 md:space-y-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Get in Touch
                </h2>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto px-4">
                  I'm always open to discussing new opportunities, creative ideas, or collaborations. Feel free to reach out via{" "}
                  <Link
                    href={linkedInSocialLink}
                    className="text-foreground font-semibold hover:underline"
                  >
                    LinkedIn
                  </Link>
                  {" "}and I'll get back to you as soon as possible!
                </p>

                <Link
                  href={linkedInSocialLink}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-[0_8px_25px_rgba(99,102,241,0.3)] hover:scale-[1.02] transition-all duration-300 text-sm sm:text-base cursor-pointer"
                >
                  Connect on LinkedIn
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </BlurFade>
          </div>
        </section>
      </div>
    </main>
  )
}
