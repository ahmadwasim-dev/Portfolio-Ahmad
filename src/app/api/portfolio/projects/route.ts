export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import { DataModel } from "@/models/DataModel"
import { connectDB } from "@/lib/db"
import { verifyAuthToken } from "@/lib/auth"
import { normalizeProject } from "@/lib/project-utils"

async function getProjectsFromDb() {
  await connectDB()
  const portfolio = await DataModel.findOne()
  if (portfolio) {
    return (portfolio.projects || []).map(normalizeProject)
  }
  return null
}

async function getFallbackProjects() {
  const { DATA } = await import("@/data/resume")
  return DATA.projects.map((project: any) =>
    normalizeProject({
      ...project,
      links: (project.links || []).map((lnk: any) => ({
        type: lnk.type,
        link: lnk.href || lnk.link || "",
      })),
      video: {
        public_id: "sample",
        url: project.video || "",
        duration: 0,
        width: 1920,
        height: 1080,
        format: "mp4",
        bytes: 0,
      },
    }),
  )
}

export async function GET() {
  try {
    const projects = (await getProjectsFromDb()) ?? (await getFallbackProjects())
    return NextResponse.json({ success: true, data: projects })
  } catch (error: any) {
    console.error("Projects fetch error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const auth = verifyAuthToken()
  if (!auth.valid) {
    return NextResponse.json({ success: false, message: auth.message }, { status: 401 })
  }

  try {
    const { projects } = await request.json()
    if (!Array.isArray(projects)) {
      return NextResponse.json({ success: false, message: "Projects must be an array" }, { status: 400 })
    }

    const normalized = projects.map((p: any, i: number) => {
      const project = normalizeProject({ ...p, active: true })
      project.link = project.links.find((l) => l.type === "Source")?.link || project.link || "#"
      return project
    })

    await connectDB()
    let portfolio = await DataModel.findOne()

    if (!portfolio) {
      const { DATA } = await import("@/data/resume")
      const baseDoc = {
        name: DATA.name,
        location: DATA.location,
        locationLink: DATA.locationLink,
        description: DATA.description,
        summary: DATA.summary,
        avatarUrl: { public_id: "sample", url: DATA.avatarUrl },
        skills: [...DATA.skills],
        resumeUrl: DATA.resumeUrl,
        initials: DATA.initials,
        contact: {
          email: DATA.contact.email,
          tel: DATA.contact.tel || "",
          social: Object.entries(DATA.contact.social)
            .filter(([_, s]: any) => s.url && s.url !== "#")
            .map(([name, s]: any) => ({
              name: s.name || name,
              url: s.url,
              icon: { public_id: "sample", url: "sample-icon" },
              navbar: s.navbar ?? false,
            })),
        },
        work: DATA.work.map((w: any) => ({
          ...w,
          logoUrl: { public_id: "sample", url: w.logoUrl },
        })),
        education: DATA.education.map((e: any) => ({
          ...e,
          logoUrl: { public_id: "sample", url: e.logoUrl },
        })),
        hackathons: (DATA.hackathons || []).map((h: any) => ({
          ...h,
          image: { public_id: "sample", url: h.image },
        })),
        projects: normalized,
      }
      portfolio = await DataModel.create(baseDoc)
    } else {
      portfolio.projects = normalized
      await portfolio.save()
    }

    return NextResponse.json({
      success: true,
      message: "Latest work saved! Refresh your homepage to see changes.",
      data: portfolio.projects,
    })
  } catch (error: any) {
    console.error("Projects save error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
