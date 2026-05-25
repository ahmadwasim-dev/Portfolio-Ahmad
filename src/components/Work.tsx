"use client"
import type React from "react"
import { useState } from "react"
import type { WorkTypes } from "@/types"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import ImageUpload from "./ImageUpload"

interface WorkProps {
  work: WorkTypes
  setWork: React.Dispatch<React.SetStateAction<WorkTypes>>
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
}

const Work: React.FC<WorkProps> = ({ work, setWork, active, setActive }) => {
  const [openExperience, setOpenExperience] = useState<number | null>(0)

  const handleWork = (index: number, field: keyof WorkTypes[number], value: any) => {
    const updated = [...work]
    updated[index] = { ...updated[index], [field]: value }
    setWork(updated)
  }

  const handleImageChange = (index: number, image: { public_id: string; url: string }) => {
    handleWork(index, "logoUrl", image)
  }

  const addNewWork = () => {
    const last = work[work.length - 1]
    if (
      !last.company ||
      !last.link ||
      !last.location ||
      !last.logoUrl.url ||
      !last.start ||
      !last.end ||
      !last.description
    ) {
      alert("Please fill all fields of the last entry.")
      return
    }
    setWork([
      ...work,
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
    setOpenExperience(work.length)
  }

  const handleBack = () => setActive(active - 1)

  const handleNext = () => {
    const isIncomplete = work.some(
      (w) => !w.company || !w.link || !w.location || !w.logoUrl.url || !w.start || !w.end || !w.description,
    )
    if (isIncomplete) {
      alert("Please complete all fields before proceeding.")
      return
    }
    localStorage.setItem("work", JSON.stringify(work))
    setActive(active + 1)
  }

  const isDisabled = work.some(
    (w) => !w.company || !w.link || !w.location || !w.start || !w.end || !w.description || !w.logoUrl.url,
  )

  const handleremove = (index: number) => {
    if (work.length === 1) {
      alert("At least one experience is required.")
      return
    }
    const updated = work.filter((_, i) => i !== index)
    setWork(updated)
    setOpenExperience(null)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground">Work Experience</h1>
      <div className="space-y-4">
        {work.map((w, index) => {
          const isOpen = openExperience === index
          return (
            <div
              key={index}
              className="admin-section-card"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-foreground">Experience {index + 1}</div>
                <div
                  className="text-sm text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setOpenExperience(isOpen ? null : index)}
                >
                  {isOpen ? "Hide ▲" : "Show ▼"}
                </div>
              </div>
              {isOpen && (
                <div className="space-y-3">
                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-foreground">Company Name</label>
                    <input
                      type="text"
                      value={w.company}
                      onChange={(e) => handleWork(index, "company", e.target.value)}
                      className="admin-input"
                      placeholder="Company name"
                    />
                  </div>
                  {/* Website */}
                  <div>
                    <label className="block text-sm font-medium text-foreground">Company Website</label>
                    <input
                      type="url"
                      value={w.link}
                      onChange={(e) => handleWork(index, "link", e.target.value)}
                      className="admin-input"
                      placeholder="https://company.com"
                    />
                  </div>
                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-foreground">Location</label>
                    <input
                      type="text"
                      value={w.location}
                      onChange={(e) => handleWork(index, "location", e.target.value)}
                      className="admin-input"
                      placeholder="City, Country"
                    />
                  </div>
                  {/* Dates */}
                  <div className="flex gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-foreground">Start Date</label>
                      <DatePicker
                        views={["month", "year"]}
                        value={w.start ? dayjs(w.start, "MMMM YYYY") : null}
                        onChange={(date) => {
                          if (date && date.isValid()) {
                            const formatted = date.format("MMMM YYYY")
                            handleWork(index, "start", formatted)
                          }
                        }}
                        slotProps={{
                          textField: {
                            className:
                              "admin-input",
                          },
                        }}
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-foreground">End Date</label>
                      <DatePicker
                        views={["month", "year"]}
                        value={w.end ? dayjs(w.end, "MMMM YYYY") : null}
                        onChange={(date) => {
                          if (date && date.isValid()) {
                            const formatted = date.format("MMMM YYYY")
                            handleWork(index, "end", formatted)
                          }
                        }}
                        slotProps={{
                          textField: {
                            className:
                              "admin-input",
                          },
                        }}
                      />
                    </div>
                  </div>
                  {/* Logo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company Logo</label>
                    <ImageUpload currentImage={w.logoUrl} onImageChange={(image) => handleImageChange(index, image)} />
                  </div>
                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-foreground">Job Description</label>
                    <textarea
                      value={w.description}
                      onChange={(e) => handleWork(index, "description", e.target.value)}
                      className="admin-input"
                      placeholder="Describe your role and responsibilities"
                      rows={4}
                    />
                  </div>
                  {/* Remove Button */}
                  <div className="text-right pt-2">
                    <button
                      onClick={() => handleremove(index)}
                      className="text-sm text-red-600 hover:text-red-800 font-medium"
                    >
                      ✕ Remove Experience
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
        {/* Add More */}
        <button
          onClick={addNewWork}
          className="w-full bg-primary text-primary-foreground py-2 rounded-full hover:bg-primary/90 transition duration-200 font-medium"
        >
          + Add More Experience
        </button>
      </div>
      {/* Navigation */}
      <div className="pt-6 flex justify-between">
        <button
          onClick={handleBack}
          className="bg-secondary text-secondary-foreground py-2 px-4 rounded-full hover:bg-secondary/80 transition duration-200 font-semibold"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          disabled={isDisabled}
          className={`py-2 px-4 rounded-md font-semibold transition duration-200 ${
            isDisabled
              ? "bg-muted cursor-not-allowed text-muted-foreground"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default Work
