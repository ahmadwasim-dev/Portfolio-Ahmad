export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import { DataModel } from "@/models/DataModel"
import { connectDB } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const portfolioData = await request.json()

    console.log("Saving portfolio data to database...")

    // Check if portfolio already exists
    const existingPortfolio = await DataModel.findOne()

    if (existingPortfolio) {
      // Update existing portfolio
      const updatedPortfolio = await DataModel.findByIdAndUpdate(existingPortfolio._id, portfolioData, {
        new: true,
      })
      // Convert to plain object before sending
      return NextResponse.json({
        success: true,
        data: updatedPortfolio,
        message: "Portfolio updated successfully",
      })
    } else {
      // Create new portfolio
      const newPortfolio = new DataModel(portfolioData)
      const savedPortfolio = await newPortfolio.save()
      // Convert to plain object before sending
      return NextResponse.json({
        success: true,
        data: savedPortfolio,
        message: "Portfolio created successfully",
      })
    }
  } catch (error: any) {
    console.error("Portfolio save error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    let portfolio = null
    let isFromDB = false

    // Try to connect to database
    try {
      await connectDB()
      portfolio = await DataModel.findOne()
      isFromDB = true
    } catch (dbError) {
      console.warn("Database connection failed, using fallback data:", dbError)
      // Continue to fallback logic below
    }

    if (!portfolio) {
      // If no data in database or DB connection failed, return sample data from resume.tsx
      try {
        const { DATA } = await import("@/data/resume")
        
        // Transform the data to match the expected format
        const transformedData = {
          ...DATA,
          avatarUrl: {
            public_id: "sample",
            url: DATA.avatarUrl
          },
          contact: {
            ...DATA.contact,
            social: Object.entries(DATA.contact.social)
              .filter(([_, social]: any) => social.url && social.url !== "#")
              .map(([name, social]: any) => ({
                name: social.name || name,
                url: social.url,
                icon: {
                  public_id: "sample",
                  url: typeof social.icon === 'string' ? social.icon : 'sample-icon'
                },
                navbar: social.navbar
              }))
          },
          work: DATA.work.map((work: any) => ({
            ...work,
            logoUrl: {
              public_id: "sample",
              url: work.logoUrl
            }
          })),
          education: DATA.education.map((edu: any) => ({
            ...edu,
            logoUrl: {
              public_id: "sample",
              url: edu.logoUrl
            }
          })),
          projects: DATA.projects.map((project: any) => ({
            ...project,
            links: (project.links || []).map((lnk: any) => ({
              type: lnk.type,
              link: lnk.href || lnk.link || "#"
            })),
            video: {
              public_id: "sample",
              url: project.video || "",
              duration: 0,
              width: 1920,
              height: 1080,
              format: "mp4",
              bytes: 0
            }
          })),
          hackathons: DATA.hackathons ? DATA.hackathons.map((hackathon: any) => ({
            ...hackathon,
            image: {
              public_id: "sample",
              url: hackathon.image || "/placeholder.svg"
            }
          })) : []
        }
        
        return NextResponse.json({ success: true, data: transformedData })
      } catch (importError) {
        console.error("Failed to import resume data:", importError)
        return NextResponse.json({ 
          success: false, 
          message: "Failed to load portfolio data" 
        }, { status: 500 })
      }
    }

    // Convert to plain object before sending
    return NextResponse.json({ success: true, data: portfolio.toObject() })
  } catch (error: any) {
    console.error("Portfolio fetch error:", error)
    return NextResponse.json({ 
      success: false, 
      message: error.message || "Failed to load portfolio data" 
    }, { status: 500 })
  }
}
