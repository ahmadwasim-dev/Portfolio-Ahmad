"use client"
import type React from "react"
import { useState } from "react"
import type { HackathonsTypes } from "@/types"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import ImageUpload from "./ImageUpload"

interface HackathonsProps {
  hackathons: HackathonsTypes
  setHackathons: React.Dispatch<React.SetStateAction<HackathonsTypes>>
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
}

const Hackathons: React.FC<HackathonsProps> = ({ hackathons, setHackathons, active, setActive }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const updateHackathon = (index: number, field: string, value: any) => {
    setHackathons(hackathons.map((hack, i) => (i === index ? { ...hack, [field]: value } : hack)))
  }

  const addHackathon = () => {
    const last = hackathons[hackathons.length - 1]
    if (!last.title || !last.link || !last.dates || !last.location || !last.description || !last.image.url) {
      alert("Please complete the previous hackathon entry first.")
      return
    }
    setHackathons([
      ...hackathons,
      {
        title: "",
        link: "",
        dates: "",
        location: "",
        description: "",
        image: { public_id: "", url: "" },
      },
    ])
    setOpenIndex(hackathons.length)
  }

  const removeHackathon = (index: number) => {
    if (hackathons.length > 1) {
      setHackathons(hackathons.filter((_, i) => i !== index))
      setOpenIndex(null)
    } else {
      alert("At least one hackathon entry is required.")
    }
  }

  const handleBack = () => setActive(active - 1)

  const isDisabled =
    hackathons.length === 0 ||
    hackathons.some((h) => !h.title || !h.link || !h.dates || !h.location || !h.description || !h.image.url)

  const handleNext = () => {
    if (isDisabled) {
      alert("Please complete all fields.")
      return
    }
    localStorage.setItem("hackathons", JSON.stringify(hackathons))
    setActive(active + 1)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground">Hackathon Participation</h1>
      {hackathons.map((hack, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            className="admin-section-card"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-foreground">Hackathon {index + 1}</div>
              <div
                className="text-sm text-blue-600 cursor-pointer hover:underline"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {isOpen ? "Hide ▲" : "Show ▼"}
              </div>
            </div>
            {isOpen && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-foreground">Hackathon Title</label>
                  <input
                    type="text"
                    value={hack.title}
                    onChange={(e) => updateHackathon(index, "title", e.target.value)}
                    className="admin-input"
                    placeholder="Enter hackathon name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Hackathon Website</label>
                  <input
                    type="url"
                    value={hack.link}
                    onChange={(e) => updateHackathon(index, "link", e.target.value)}
                    className="admin-input"
                    placeholder="https://hackathon.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Date</label>
                  <DatePicker
                    views={["month", "year"]}
                    value={hack.dates ? dayjs(hack.dates, "MMMM YYYY") : null}
                    onChange={(date: any) => {
                      if (date?.isValid()) {
                        updateHackathon(index, "dates", date.format("MMMM YYYY"))
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
                <div>
                  <label className="block text-sm font-medium text-foreground">Location</label>
                  <input
                    type="text"
                    value={hack.location}
                    onChange={(e) => updateHackathon(index, "location", e.target.value)}
                    className="admin-input"
                    placeholder="City, Country or Online"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Description</label>
                  <textarea
                    value={hack.description}
                    onChange={(e) => updateHackathon(index, "description", e.target.value)}
                    className="admin-input"
                    placeholder="Describe your project or achievement"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Hackathon Image</label>
                  <ImageUpload
                    currentImage={hack.image}
                    onImageChange={(image) => updateHackathon(index, "image", image)}
                  />
                </div>
                <div className="pt-2 text-right">
                  <button
                    onClick={() => removeHackathon(index)}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    ✕ Remove Hackathon
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      })}
      <button
        onClick={addHackathon}
        className="w-full bg-primary text-primary-foreground py-2 rounded-full hover:bg-primary/90 transition duration-200 font-medium"
      >
        + Add More Hackathon
      </button>
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

export default Hackathons
