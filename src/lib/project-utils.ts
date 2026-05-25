import type { ProjectType } from "@/types"

export function createEmptyProject(): ProjectType {
  return {
    title: "",
    link: "#",
    dates: "",
    description: "",
    technologies: [],
    links: [{ type: "Source", link: "" }],
    video: {
      public_id: "",
      url: "",
      duration: 0,
      width: 0,
      height: 0,
      format: "",
      bytes: 0,
    },
  }
}

export function normalizeProject(project: any): ProjectType {
  const githubLink =
    project.links?.find((l: any) => l.type === "Source")?.link ||
    project.links?.[0]?.link ||
    ""

  return {
    title: project.title || "",
    link: project.link || githubLink || "#",
    dates: project.dates || "",
    description: project.description || "",
    technologies: project.technologies || [],
    links: project.links?.length
      ? project.links.map((l: any) => ({
          type: l.type || "Source",
          link: l.link || l.href || "",
        }))
      : [{ type: "Source", link: githubLink }],
    video: project.video?.url
      ? project.video
      : {
          public_id: "",
          url: "",
          duration: 0,
          width: 0,
          height: 0,
          format: "",
          bytes: 0,
        },
    caseStudy: project.caseStudy,
  }
}

export function validateProject(project: ProjectType, index: number): string | null {
  if (!project.title.trim()) return `Project ${index + 1}: title is required`
  if (!project.dates.trim()) return `Project ${index + 1}: date is required`
  if (!project.description.trim()) return `Project ${index + 1}: description is required`
  if (project.technologies.length === 0) return `Project ${index + 1}: add at least one technology`
  if (!project.video?.url) return `Project ${index + 1}: upload a video`
  const sourceLink = project.links.find((l) => l.type === "Source")
  if (!sourceLink?.link?.trim()) return `Project ${index + 1}: GitHub source URL is required`
  return null
}
