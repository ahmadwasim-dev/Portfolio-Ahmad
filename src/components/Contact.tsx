"use client"
import type React from "react"
import { useState } from "react"
import type { ContactTypes } from "@/types"
import ImageUpload from "./ImageUpload"

interface ContactProps {
  contact: ContactTypes
  setContact: React.Dispatch<React.SetStateAction<ContactTypes>>
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
}

const Contact: React.FC<ContactProps> = ({ contact, setContact, active, setActive }) => {
  const [openSocial, setOpenSocial] = useState<number | null>(0)

  const updateSocial = (index: number, field: string, value: any) => {
    setContact({
      ...contact,
      social: contact.social.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    })
  }

  const addSocial = () => {
    const lastSocial = contact.social[contact.social.length - 1]
    if (lastSocial && (!lastSocial.name || !lastSocial.url || !lastSocial.icon.url)) {
      alert("Please complete the previous social link before adding a new one.")
      return
    }
    const newSocial = { name: "", url: "", icon: { public_id: "", url: "" }, navbar: false }
    setContact((prev) => ({
      ...prev,
      social: [...prev.social, newSocial],
    }))
    setOpenSocial(contact.social.length)
  }

  const removeSocial = (index: number) => {
    if (contact.social.length > 1) {
      setContact({
        ...contact,
        social: contact.social.filter((_, i) => i !== index),
      })
      setOpenSocial(null)
    } else {
      alert("You must have at least one social link.")
    }
  }

  const handlenext = () => {
    const isIncomplete =
      contact.email.trim() === "" ||
      contact.tel.trim() === "" ||
      contact.social.length === 0 ||
      contact.social.some((s) => s.name.trim() === "" || s.url.trim() === "" || s.icon.url.trim() === "")

    if (isIncomplete) {
      alert("Please fill in all fields before proceeding.")
      return
    }

    localStorage.setItem("contact", JSON.stringify(contact))
    setActive(active + 1)
  }

  const handleback = () => {
    setActive(active - 1)
  }

  const isDisabled =
    contact.email.trim() === "" ||
    contact.tel.trim() === "" ||
    contact.social.length === 0 ||
    contact.social.some((s) => s.name.trim() === "" || s.url.trim() === "" || s.icon.url === "")

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-black shadow-md rounded-xl space-y-6">
      <h1 className="text-2xl font-bold text-center text-black dark:text-white">Contact Details</h1>

      {/* Email */}
      <div>
        <label className="block mb-2 text-sm font-medium text-black dark:text-white">Email</label>
        <input
          type="email"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white"
          placeholder="Enter your email"
        />
      </div>

      {/* Telephone */}
      <div>
        <label className="block mb-2 text-sm font-medium text-black dark:text-white">Telephone</label>
        <input
          type="tel"
          value={contact.tel}
          onChange={(e) => setContact({ ...contact, tel: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white"
          placeholder="Enter your telephone number"
        />
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-black dark:text-white">Social Links</label>
        {contact.social.map((social, index) => {
          const isOpen = openSocial === index
          return (
            <div
              key={index}
              className="border border-gray-300 dark:border-gray-700 rounded-md p-4 bg-gray-50 dark:bg-gray-900 space-y-3"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-black dark:text-white">Social {index + 1}</div>
                <div
                  className="text-sm text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setOpenSocial(isOpen ? null : index)}
                >
                  {isOpen ? "Hide ▲" : "Show ▼"}
                </div>
              </div>
              {isOpen && (
                <div className="space-y-3">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white">Social Name</label>
                    <input
                      type="text"
                      value={social.name}
                      onChange={(e) => updateSocial(index, "name", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                      placeholder="e.g. LinkedIn"
                    />
                  </div>
                  {/* URL */}
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white">Social URL</label>
                    <input
                      type="url"
                      value={social.url}
                      onChange={(e) => updateSocial(index, "url", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                      placeholder="https://..."
                    />
                  </div>
                  {/* Icon Upload */}
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">Social Icon</label>
                    <ImageUpload
                      currentImage={social.icon}
                      onImageChange={(image) => updateSocial(index, "icon", image)}
                    />
                  </div>
                  {/* Navbar Toggle */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`navbar-${index}`}
                      checked={social.navbar}
                      onChange={(e) => updateSocial(index, "navbar", e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor={`navbar-${index}`} className="text-sm text-black dark:text-white">
                      Show in navigation bar
                    </label>
                  </div>
                  {/* Remove */}
                  <div className="pt-2 text-right">
                    <button
                      onClick={() => removeSocial(index)}
                      className="text-sm text-red-600 hover:text-red-800 font-medium"
                    >
                      ✕ Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
        {/* Add Social */}
        <button
          onClick={addSocial}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          + Add More Social Link
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-6 flex justify-between">
        <button
          onClick={handleback}
          className="bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded-md hover:opacity-90 transition duration-200 font-semibold"
        >
          ← Back
        </button>
        <button
          onClick={handlenext}
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

export default Contact
