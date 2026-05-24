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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // This case should ideally be handled by the router.push("/login") above,
    // but as a fallback or if there's a slight delay in redirection.
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white">Portfolio Admin Panel</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your portfolio content</p>
          <Button onClick={handleLogout} variant="outline" className="mt-4 bg-transparent">
            Logout
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white dark:bg-black rounded-lg p-2 shadow-md">
            {["Profile", "Contact", "Work", "Education", "Hackathons", "Projects"].map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActive(index)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  active === index
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto">
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

        {/* Save Button - Show on all sections */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSavePortfolio}
            disabled={saving}
            className="px-8 py-3 text-lg bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center gap-2 font-semibold"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing Images & Saving...
              </>
            ) : (
              "💾 Save Complete Portfolio"
            )}
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${step <= active ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`}
              />
            ))}
          </div>
          <p className="ml-4 text-sm text-gray-600 dark:text-gray-400">
            Step {active + 1} of 6 - {["Profile", "Contact", "Work", "Education", "Hackathons", "Projects"][active]}
          </p>
        </div>

        {/* Instructions */}
        <div className="max-w-2xl mx-auto mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Instructions:</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Fill out each section completely</li>
            <li>• All images will be automatically uploaded to Cloudinary when you save</li>
            <li>• You can save at any time - the system will process all base64 images</li>
            <li>• If you have existing data, it will be loaded automatically</li>
            <li>• The save will update your portfolio in the database</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Page
