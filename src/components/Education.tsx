"use client"
import type React from "react"
import { useState } from "react"
import type { EducationTypes } from "@/types"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import ImageUpload from "./ImageUpload"

interface EducationProps {
  education: EducationTypes
  setEducation: React.Dispatch<React.SetStateAction<EducationTypes>>
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
}

const Education: React.FC<EducationProps> = ({ education, setEducation, active, setActive }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const updateEducation = (index: number, field: string, value: any) => {
    setEducation(education.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu)))
  }

  const addEducation = () => {
    const last = education[education.length - 1]
    if (last && (!last.school || !last.degree || !last.link || !last.start || !last.end || !last.logoUrl.url)) {
      alert("Please complete the previous education entry first.")
      return
    }
    setEducation([
      ...education,
      {
        school: "",
        link: "",
        degree: "",
        logoUrl: { public_id: "", url: "" },
        start: "",
        end: "",
      },
    ])
    setOpenIndex(education.length)
  }

  const removeEducation = (index: number) => {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index))
      setOpenIndex(null)
    } else {
      alert("At least one education entry is required.")
    }
  }

  const handleBack = () => setActive(active - 1)

  const isDisabled = education.some((e) => !e.school || !e.degree || !e.link || !e.start || !e.end || !e.logoUrl.url)

  const handleNext = () => {
    if (isDisabled) {
      alert("Please complete all fields.")
      return
    }
    localStorage.setItem("education", JSON.stringify(education))
    setActive(active + 1)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-black shadow-md rounded-xl space-y-6">
      <h1 className="text-2xl font-bold text-center text-black dark:text-white">Education Details</h1>
      {education.map((edu, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            className="border border-gray-300 dark:border-gray-700 rounded-md p-4 bg-gray-50 dark:bg-gray-900 space-y-3"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-black dark:text-white">Education {index + 1}</div>
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
                  <label className="block text-sm font-medium text-black dark:text-white">School/University</label>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => updateEducation(index, "school", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="Enter school name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">School Website</label>
                  <input
                    type="url"
                    value={edu.link}
                    onChange={(e) => updateEducation(index, "link", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="https://school.edu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="e.g. Bachelor of Computer Science"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-black dark:text-white">Start Date</label>
                    <DatePicker
                      views={["month", "year"]}
                      value={edu.start ? dayjs(edu.start, "MMMM YYYY") : null}
                      onChange={(date: any) => {
                        if (date?.isValid()) {
                          updateEducation(index, "start", date.format("MMMM YYYY"))
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
                  <div className="w-full">
                    <label className="block text-sm font-medium text-black dark:text-white">End Date</label>
                    <DatePicker
                      views={["month", "year"]}
                      value={edu.end ? dayjs(edu.end, "MMMM YYYY") : null}
                      onChange={(date: any) => {
                        if (date?.isValid()) {
                          updateEducation(index, "end", date.format("MMMM YYYY"))
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
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">School Logo</label>
                  <ImageUpload
                    currentImage={edu.logoUrl}
                    onImageChange={(image) => updateEducation(index, "logoUrl", image)}
                  />
                </div>
                <div className="pt-2 text-right">
                  <button
                    onClick={() => removeEducation(index)}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    ✕ Remove Education
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      })}
      <button
        onClick={addEducation}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
      >
        + Add More Education
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

export default Education
