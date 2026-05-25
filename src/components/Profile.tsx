"use client"
import type React from "react"
import { useState } from "react"
import type { ProfileTypes } from "@/types"
import ImageUpload from "./ImageUpload"

interface ProfileProps {
  profile: ProfileTypes
  setProfile: React.Dispatch<React.SetStateAction<ProfileTypes>>
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
}

const Profile: React.FC<ProfileProps> = ({ profile, setProfile, setActive, active }) => {
  const [skillValue, setSkillValue] = useState("")

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillValue.trim() !== "") {
      e.preventDefault()
      if (!profile.skills.includes(skillValue.trim())) {
        setProfile({
          ...profile,
          skills: [...profile.skills, skillValue.trim()],
        })
      }
      setSkillValue("")
    }
  }

  const handleSkillRemove = (index: number) => {
    const updatedSkills = profile.skills.filter((_, i) => i !== index)
    setProfile({
      ...profile,
      skills: updatedSkills,
    })
  }

  const handlenext = () => {
    if (
      profile.name === "" ||
      profile.location === "" ||
      profile.locationLink === "" ||
      profile.description === "" ||
      profile.summary === "" ||
      profile.skills.length === 0 ||
      profile.avatarUrl.url === "" ||
      profile.resumeUrl === ""
    ) {
      alert("Please fill all the fields")
      return
    }

    localStorage.setItem("profile", JSON.stringify(profile))
    setActive(active + 1)
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground">Profile Details</h1>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Name</label>
        <input
          className="admin-input"
          placeholder="Enter your name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Location</label>
        <input
          className="admin-input"
          placeholder="Enter your location"
          value={profile.location}
          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
        />
      </div>

      {/* Location Link */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Location Link</label>
        <input
          className="admin-input"
          placeholder="Google Maps link"
          value={profile.locationLink}
          onChange={(e) => setProfile({ ...profile, locationLink: e.target.value })}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Description</label>
        <input
          className="admin-input"
          placeholder="Brief description"
          value={profile.description}
          onChange={(e) => setProfile({ ...profile, description: e.target.value })}
        />
      </div>

      {/* Summary */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Summary</label>
        <textarea
          className="admin-input"
          placeholder="Short summary"
          rows={4}
          value={profile.summary}
          onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
        />
      </div>

      {/* Resume URL */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Resume URL (PDF)</label>
        <input
          className="admin-input"
          placeholder="Link to your resume PDF"
          value={profile.resumeUrl || ""}
          onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
        />
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Skills (Press Enter to add)</label>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, index) => (
            <span
              key={index}
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
            >
              {skill}
              <button className="hover:text-red-500" onClick={() => handleSkillRemove(index)}>
                ×
              </button>
            </span>
          ))}
        </div>
        <input
          className="admin-input"
          placeholder="Enter a skill"
          value={skillValue}
          onChange={(e) => setSkillValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Profile Image */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Profile Image</label>
        <ImageUpload
          currentImage={profile.avatarUrl}
          onImageChange={(image) => setProfile({ ...profile, avatarUrl: image })}
        />
      </div>

      {/* Next Button */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={handlenext}
          className="bg-primary text-primary-foreground py-2 px-4 rounded-full hover:bg-primary/90 transition duration-200 font-semibold"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default Profile
