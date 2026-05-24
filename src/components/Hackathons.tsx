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
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-black shadow-md rounded-xl space-y-6">
      <h1 className="text-2xl font-bold text-center text-black dark:text-white">Hackathon Participation</h1>
      {hackathons.map((hack, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            className="border border-gray-300 dark:border-gray-700 rounded-md p-4 bg-gray-50 dark:bg-gray-900 space-y-3"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-black dark:text-white">Hackathon {index + 1}</div>
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
                  <label className="block text-sm font-medium text-black dark:text-white">Hackathon Title</label>
                  <input
                    type="text"
                    value={hack.title}
                    onChange={(e) => updateHackathon(index, "title", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="Enter hackathon name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">Hackathon Website</label>
                  <input
                    type="url"
                    value={hack.link}
                    onChange={(e) => updateHackathon(index, "link", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="https://hackathon.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">Date</label>
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
                          "w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white",
                      },
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">Location</label>
                  <input
                    type="text"
                    value={hack.location}
                    onChange={(e) => updateHackathon(index, "location", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="City, Country or Online"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">Description</label>
                  <textarea
                    value={hack.description}
                    onChange={(e) => updateHackathon(index, "description", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="Describe your project or achievement"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">Hackathon Image</label>
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
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
      >
        + Add More Hackathon
      </button>
      <div className="pt-6 flex justify-between">
        <button
          onClick={handleBack}
          className="bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded-md hover:opacity-90 transition duration-200 font-semibold"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          disabled={isDisabled}
          className={`py-2 px-4 rounded-md font-semibold transition duration-200 ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-black dark:bg-white text-white dark:text-black hover:opacity-90"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default Hackathons
