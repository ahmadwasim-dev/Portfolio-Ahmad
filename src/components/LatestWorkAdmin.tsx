"use client"

import { useEffect, useState } from "react"
import type React from "react"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import { Loader2, Plus, Trash2, Save, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import VideoUpload from "@/components/video-upload"
import type { ProjectType, ProjectTypes } from "@/types"
import { createEmptyProject, validateProject } from "@/lib/project-utils"

export default function LatestWorkAdmin() {
  const [projects, setProjects] = useState<ProjectTypes>([createEmptyProject()])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [techInput, setTechInput] = useState("")

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const res = await fetch("/api/portfolio/projects")
      const json = await res.json()
      if (json.success && json.data?.length) {
        setProjects(json.data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const updateProject = (index: number, field: keyof ProjectType, value: unknown) => {
    const next = [...projects]
    next[index] = { ...next[index], [field]: value }
    setProjects(next)
  }

  const updateGithub = (index: number, url: string) => {
    const next = [...projects]
    next[index] = {
      ...next[index],
      link: url || "#",
      links: [{ type: "Source", link: url }],
    }
    setProjects(next)
  }

  const addTechnology = (index: number, value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return
    const next = [...projects]
    if (!next[index].technologies.includes(trimmed)) {
      next[index].technologies = [...next[index].technologies, trimmed]
      setProjects(next)
    }
    setTechInput("")
  }

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const next = [...projects]
    next[projectIndex].technologies = next[projectIndex].technologies.filter((_, i) => i !== techIndex)
    setProjects(next)
  }

  const updateProjectVideo = (index: number, video: ProjectType["video"]) => {
    const next = [...projects]
    next[index].video = video
    setProjects(next)
  }

  const clearProjectVideo = (index: number) => {
    updateProjectVideo(index, createEmptyProject().video)
  }

  const addProject = () => {
    const last = projects[projects.length - 1]
    const err = validateProject(last, projects.length - 1)
    if (err) {
      alert(`Finish the current project first.\n${err}`)
      return
    }
    setProjects([...projects, createEmptyProject()])
  }

  const deleteProject = (index: number) => {
    if (!confirm(`Delete "${projects[index].title || `Project ${index + 1}`}"?`)) return
    if (projects.length === 1) {
      setProjects([createEmptyProject()])
      return
    }
    setProjects(projects.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    for (let i = 0; i < projects.length; i++) {
      const err = validateProject(projects[i], i)
      if (err) {
        alert(err)
        return
      }
    }

    setSaving(true)
    try {
      const res = await fetch("/api/portfolio/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projects }),
      })
      const json = await res.json()
      if (json.success) {
        alert(json.message)
      } else {
        alert("Save failed: " + json.message)
      }
    } catch {
      alert("Error saving to database. Check MongoDB URI in .env.local")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Videos upload to Cloudinary. Project data saves to MongoDB and appears in your homepage Latest Work section.
      </p>

      {projects.map((project, i) => (
        <div key={i} className="admin-section-card">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg text-foreground">
              {project.title || `Project ${i + 1}`}
            </h2>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => deleteProject(i)}
              className="gap-1"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1 text-foreground">Project title</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => updateProject(i, "title", e.target.value)}
                placeholder="e.g. AquaSense - Smart IoT Water Management"
                className="admin-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date (month & year)</label>
              <DatePicker
                views={["month", "year"]}
                value={project.dates ? dayjs(project.dates, "MMMM YYYY") : null}
                onChange={(date) => {
                  if (date?.isValid()) updateProject(i, "dates", date.format("MMMM YYYY"))
                }}
                slotProps={{
                  textField: { className: "w-full", size: "small" },
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">GitHub source URL</label>
              <input
                type="url"
                value={project.links[0]?.link || ""}
                onChange={(e) => updateGithub(i, e.target.value)}
                placeholder="https://github.com/username/repo"
                className="admin-input"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1 text-foreground">Description</label>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(i, "description", e.target.value)}
                rows={4}
                placeholder="What the project does, tech stack highlights..."
                className="admin-input min-h-[100px]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Technologies (press Enter)</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.technologies.map((tech, ti) => (
                  <span
                    key={ti}
                    className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm border border-border/50"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(i, ti)}
                      className="text-red-600 font-bold ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addTechnology(i, e.currentTarget.value)
                  }
                }}
                placeholder="Python, MongoDB, React..."
                className="admin-input"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-2">Project video</label>
              <VideoUpload
                videoInfo={project.video}
                projectIndex={i}
                updateProjectVide={updateProjectVideo}
                deleteProjectVide={clearProjectVideo}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={addProject} variant="outline" className="gap-2">
          <Plus className="w-4 h-4" /> Add project
        </Button>
        <Button type="button" onClick={handleSave} disabled={saving} className="gap-2">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save to database"}
        </Button>
      </div>
    </div>
  )
}
