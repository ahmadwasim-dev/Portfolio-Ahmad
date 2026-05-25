"use client"
import { useState, useEffect } from "react"
import type { ContactTypes } from "@/types"
import Profile from "@/components/Profile"
import type { ProfileTypes } from "@/types"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import type { HackathonsTypes } from "@/types"
import Hackathons from "@/components/Hackathons"
import type { WorkTypes } from "@/types"
import Education from "@/components/Education"
import type { EducationTypes } from "@/types"
import type { ProjectTypes } from "@/types"
import Work from "@/components/Work"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import AdminShell from "@/components/admin/AdminShell"
import BlurFade from "@/components/magicui/blur-fade"
import { cn } from "@/lib/utils"

const Page = () => {
  const [active, setActive] = useState(0)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  const [projects, setProjects] = useState<ProjectTypes>([
    {
      title: "",
      link: "",
      dates: "",
      description: "",
      technologies: [],
      links: [
        {
          type: "", // Reverted to 'type'
          link: "", // Reverted to 'link'
        },
      ],
      video: {
        public_id: "",
        url: "",
        duration: 0,
        width: 0,
        height: 0,
        format: "",
        bytes: 0,
      },
      caseStudy: {
        // Initialize caseStudy
        youtubeVideoUrl: "",
        projectOverview: "",
        keyFeatures: [],
        databaseArchitectureImage: { public_id: "", url: "" },
        systemArchitectureImage: { public_id: "", url: "" },
        systemArchitecture: [{ title: "", description: "" }],
        challengesAndSolutions: [{ title: "", challenge: "", solution: "" }],
      },
    },
  ])

  const [hackathons, setHackathons] = useState<HackathonsTypes>([
    {
      title: "",
      link: "",
      dates: "",
      location: "",
      description: "",
      image: {
        public_id: "",
        url: "",
      },
      // Removed links initialization for hackathons
    },
  ])

  const [education, setEducation] = useState<EducationTypes>([
    {
      school: "",
      link: "",
      degree: "",
      logoUrl: {
        public_id: "",
        url: "",
      },
      start: "",
      end: "",
    },
  ])

  const [profile, setProfile] = useState<ProfileTypes>({
    name: "",
    location: "",
    locationLink: "",
    description: "",
    summary: "",
    avatarUrl: {
      public_id: "",
      url: "",
    },
    skills: [],
    resumeUrl: "",

  })

  const [contact, setContact] = useState<ContactTypes>({
    email: "",
    tel: "",
    social: [
      {
        name: "",
        url: "",
        icon: {
          public_id: "",
          url: "",
        },
        navbar: false,
      },
    ],
  })

  const [work, setWork] = useState<WorkTypes>([
    {
      company: "",
      link: "",
      location: "",
      logoUrl: { public_id: "", url: "" },
      start: "",
      end: "",
      description: "",
    },
  ])

  // Authentication check on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          setIsAuthenticated(true)
          // Load existing data only if authenticated
          await loadExistingData()
        } else {
          router.push("/login") // Redirect to login if not authenticated
        }
      } catch (error) {
        console.error("Authentication check failed:", error)
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [router])

  // Load existing data function
  const loadExistingData = async () => {
    try {
      const response = await fetch("/api/portfolio")
      const data = await response.json()

      if (data.success && data.data) {
        const portfolioData = data.data

        setProfile({
          name: portfolioData.name || "",
          location: portfolioData.location || "",
          locationLink: portfolioData.locationLink || "",
          description: portfolioData.description || "",
          summary: portfolioData.summary || "",
          avatarUrl: portfolioData.avatarUrl || { public_id: "", url: "" },
          skills: portfolioData.skills || [],
          resumeUrl: portfolioData.resumeUrl || "",
        
        })

        setContact(
          portfolioData.contact || {
            email: "",
            tel: "",
            social: [{ name: "", url: "", icon: { public_id: "", url: "" }, navbar: false }],
          },
        )

        setWork(
          portfolioData.work || [
            {
              company: "",
              link: "",
              location: "",
              logoUrl: { public_id: "", url: "" },
              start: "",
              end: "",
              description: "",
            },
          ],
        )

        setEducation(
          portfolioData.education || [
            {
              school: "",
              link: "",
              degree: "",
              logoUrl: { public_id: "", url: "" },
              start: "",
              end: "",
            },
          ],
        )

        setHackathons(
          portfolioData.hackathons.map((hackathon: any) => ({
            ...hackathon,
            image: hackathon.image || { public_id: "", url: "" },
            // Removed links mapping for hackathons
          })) || [
            {
              title: "",
              link: "",
              dates: "",
              location: "",
              description: "",
              image: { public_id: "", url: "" },
            },
          ],
        )

        setProjects(
          portfolioData.projects.map((project: any) => ({
            ...project,
            video: project.video || {
              public_id: "",
              url: "",
              duration: 0,
              width: 0,
              height: 0,
              format: "",
              bytes: 0,
            },
            links: project.links?.map((link: any) => ({
              type: link.type || "", // Reverted to 'type'
              link: link.link || "", // Reverted to 'link'
            })) || [{ type: "", link: "" }], // Reverted initialization
            caseStudy: project.caseStudy || {
              // Load caseStudy
              youtubeVideoUrl: "",
              projectOverview: "",
              keyFeatures: [],
              databaseArchitectureImage: { public_id: "", url: "" },
              systemArchitectureImage: { public_id: "", url: "" },
              systemArchitecture: [{ title: "", description: "" }],
              challengesAndSolutions: [{ title: "", challenge: "", solution: "" }],
            },
          })) || [
            {
              title: "",
              link: "",
              dates: "",
              description: "",
              technologies: [],
              links: [{ type: "", link: "" }], // Reverted initialization
              video: {
                public_id: "",
                url: "",
                duration: 0,
                width: 0,
                height: 0,
                format: "",
                bytes: 0,
              },
              caseStudy: {
                // Initialize caseStudy
                youtubeVideoUrl: "",
                projectOverview: "",
                keyFeatures: [],
                databaseArchitectureImage: { public_id: "", url: "" },
                systemArchitectureImage: { public_id: "", url: "" },
                systemArchitecture: [{ title: "", description: "" }],
                challengesAndSolutions: [{ title: "", challenge: "", solution: "" }],
              },
            },
          ],
        )
      }
    } catch (error) {
      console.error("Error loading existing data:", error)
    }
  }

  const handleSavePortfolio = async () => {
    setSaving(true)

    try {
      const portfolioData = {
        name: profile.name,
        location: profile.location,
        locationLink: profile.locationLink,
        description: profile.description,
        summary: profile.summary,
        avatarUrl: profile.avatarUrl,
        skills: profile.skills,
        resumeUrl: profile.resumeUrl,
        initials: profile.name
          ? profile.name
              .split(" ")
              .map((n) => n[0])
              .join("")
          : "", // Derive initials for saving
        contact: contact,
        work: work,
        education: education,
        projects: projects,
        hackathons: hackathons,
      }

      console.log("Saving portfolio data:", portfolioData)

      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolioData),
      })

      const data = await response.json()

      if (data.success) {
        alert(data.message)
        localStorage.clear()
      } else {
        alert("Failed to save portfolio: " + data.message)
      }
    } catch (error) {
      console.error("Error saving portfolio:", error)
      alert("Error saving portfolio")
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })
      if (response.ok) {
        router.push("/login")
      } else {
        alert("Failed to log out.")
      }
    } catch (error) {
      console.error("Logout error:", error)
      alert("Error logging out.")
    }
  }

  if (loading) {
    return (
      <div className="admin-panel-page min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const tabs = ["Profile", "Contact", "Work", "Education", "Hackathons", "Projects"]

  return (
    <AdminShell
      title="Portfolio Admin"
      subtitle="Manage your full portfolio content"
      onLogout={handleLogout}
    >
      <BlurFade delay={0.05} inView>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 overflow-hidden",
                active === index
                  ? "text-white shadow-lg shadow-primary/25"
                  : "bg-card/50 text-muted-foreground border border-border/50 hover:text-foreground hover:bg-card/80 backdrop-blur-sm",
              )}
            >
              {active === index && (
                <div
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 via-primary to-indigo-600 dark:from-violet-500 dark:via-primary dark:to-indigo-500"
                  aria-hidden
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>
      </BlurFade>

      <BlurFade delay={0.15} inView key={active}>
        <div className="admin-surface relative p-6 sm:p-8">
          {/* Subtle inner glow */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl border border-primary/20 bg-primary/[0.02]" aria-hidden />
          
          {active === 0 && <Profile profile={profile} setProfile={setProfile} setActive={setActive} active={active} />}
          {active === 1 && <Contact contact={contact} setContact={setContact} active={active} setActive={setActive} />}
          {active === 2 && <Work work={work} setWork={setWork} active={active} setActive={setActive} />}
          {active === 3 && (
            <Education education={education} setEducation={setEducation} active={active} setActive={setActive} />
          )}
          {active === 4 && (
            <Hackathons hackathons={hackathons} setHackathons={setHackathons} active={active} setActive={setActive} />
          )}
          {active === 5 && (
            <Projects projects={projects} active={active} setActive={setActive} setProjects={setProjects} />
          )}
        </div>
      </BlurFade>

      <BlurFade delay={0.25} inView>
        <div className="flex flex-col items-center gap-4 mt-10">
          <Button
            onClick={handleSavePortfolio}
            disabled={saving}
            className={cn(
              "relative h-12 px-8 rounded-xl text-base font-semibold overflow-hidden",
              "bg-gradient-to-r from-violet-600 via-primary to-indigo-600",
              "dark:from-violet-500 dark:via-[hsl(262,85%,65%)] dark:to-indigo-500",
              "text-white dark:text-white",
              "hover:opacity-95 dark:hover:brightness-110",
              "shadow-lg shadow-primary/20 dark:shadow-primary/30",
              "transition-all duration-300",
            )}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save complete portfolio"
              )}
            </span>
          </Button>

        <div className="flex items-center gap-2">
          {tabs.map((step, i) => (
            <div
              key={step}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-colors",
                i <= active ? "bg-primary" : "bg-muted",
              )}
            />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">
            Step {active + 1} of 6 — {tabs[active]}
          </span>
        </div>

          <div className="w-full max-w-2xl rounded-xl border border-primary/20 bg-primary/5 dark:bg-primary/10 backdrop-blur-md p-5 text-sm text-foreground/80 space-y-2 mt-4 shadow-sm">
            <p className="font-semibold text-foreground flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary text-xs">💡</span>
              Tips
            </p>
            <p className="pl-7">• Fill each section, then save to update MongoDB.</p>
            <p className="pl-7">• Images and videos upload to Cloudinary automatically.</p>
            <p className="pl-7">• For projects only, use the Latest Work tab in the header.</p>
          </div>
        </div>
      </BlurFade>
    </AdminShell>
  )
}

export default Page
