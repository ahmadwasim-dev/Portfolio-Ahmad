"use client"
import type React from "react"
import { useState } from "react"
import type { ProjectTypes } from "@/types" // Removed LinkItemType
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import VideoUpload from "./video-upload"
import ImageUpload from "./ImageUpload" // Import ImageUpload

interface ProjectsProps {
  projects: ProjectTypes
  active: number
  setActive: (active: number) => void
  setProjects: (projects: ProjectTypes) => void
}

const Projects: React.FC<ProjectsProps> = ({ projects, active, setActive, setProjects }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [openlinkindex, setOpenlinkindex] = useState<number | null>(0)
  const [technologievalue, setTechnologievalue] = useState("")
  const [keyFeatureValue, setKeyFeatureValue] = useState("") // New state for key features
  const [systemArchitectureTitle, setSystemArchitectureTitle] = useState("") // New state for system architecture title
  const [systemArchitectureDescription, setSystemArchitectureDescription] = useState("") // New state for system architecture description
  const [challengeTitle, setChallengeTitle] = useState("") // New state for challenge title
  const [challengeDescription, setChallengeDescription] = useState("") // New state for challenge description
  const [solutionDescription, setSolutionDescription] = useState("") // New state for solution description

  const handleProjects = (index: number, field: string, value: any) => {
    const updatedProjects = [...projects]
    updatedProjects[index] = { ...updatedProjects[index], [field]: value }
    setProjects(updatedProjects)
  }

  const handleCaseStudy = (projectIndex: number, field: string, value: any) => {
    const updatedProjects = [...projects]
    updatedProjects[projectIndex].caseStudy = {
      ...updatedProjects[projectIndex].caseStudy,
      [field]: value,
    }
    setProjects(updatedProjects)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number, value: string) => {
    if (e.key === "Enter" && value.trim() !== "") {
      e.preventDefault()
      const updatedProjects = [...projects]
      updatedProjects[index].technologies.push(value)
      setProjects(updatedProjects)
      setTechnologievalue("")
    }
  }

  const DeleteTechnology = (tehnologyIndex: number, projectIndex: number) => {
    const updatedProjects = [...projects]
    const newtechnologies = updatedProjects[projectIndex].technologies.filter((_, i) => i !== tehnologyIndex)
    updatedProjects[projectIndex].technologies = newtechnologies
    setProjects(updatedProjects)
  }

  const handleProjectslinks = (projectindex: number, linksindex: number, field: string, value: string) => {
    const updatedProjects = [...projects]
    updatedProjects[projectindex].links[linksindex] = {
      ...updatedProjects[projectindex].links[linksindex],
      [field]: value,
    }
    setProjects(updatedProjects)
  }

  const addProject = () => {
    const last = projects[projects.length - 1]
    if (
      last &&
      (!last.title ||
        !last.link ||
        !last.description ||
        last.technologies.length === 0 ||
        !last.dates ||
        last.links.some((e) => !e.type || !e.link) || // Reverted validation
        !last.video?.url)
    ) {
      alert("Please complete the previous project entry first, including a video.")
      return
    }
    setProjects([
      ...projects,
      {
        title: "",
        link: "",
        dates: "",
        description: "",
        technologies: [],
        links: [{ type: "", link: "" }], // Reverted initialization
        video: {
          public_id: "",
          url: "",
          duration: 0,
          width: 0,
          height: 0,
          format: "",
          bytes: 0,
        },
        caseStudy: {
          // Initialize caseStudy for new project
          youtubeVideoUrl: "",
          projectOverview: "",
          keyFeatures: [],
          databaseArchitectureImage: { public_id: "", url: "" },
          systemArchitectureImage: { public_id: "", url: "" }, // Initialize new image field
          systemArchitecture: [{ title: "", description: "" }],
          challengesAndSolutions: [{ title: "", challenge: "", solution: "" }],
        },
      },
    ])
    setOpenIndex(projects.length)
  }

  const addNewLink = (index: number) => {
    const updatedProjects = [...projects]
    const lastLink = updatedProjects[index].links.at(-1)
    if (!lastLink || lastLink.link === "" || lastLink.type === "") {
      alert("Please fill the previous links first")
      return
    }
    updatedProjects[index].links.push({ type: "", link: "" }) // Reverted initialization
    setProjects(updatedProjects)
    setOpenlinkindex(updatedProjects[index].links.length - 1)
  }

  const updateProjectVideo = (index: number, data: any) => {
    const updatedProjects = [...projects]
    updatedProjects[index].video = data
    setProjects(updatedProjects)
  }

  const deleteProjectVideo = (index: number) => {
    const updatedProjects = [...projects]
    updatedProjects[index].video = {
      public_id: "",
      url: "",
      duration: 0,
      width: 0,
      height: 0,
      format: "",
      bytes: 0,
    }
    setProjects(updatedProjects)
  }

  // Case Study specific handlers
  const handleAddKeyFeature = (projectIndex: number) => {
    if (keyFeatureValue.trim() !== "") {
      const updatedProjects = [...projects]
      updatedProjects[projectIndex].caseStudy?.keyFeatures?.push(keyFeatureValue.trim())
      setProjects(updatedProjects)
      setKeyFeatureValue("")
    }
  }

  const handleDeleteKeyFeature = (projectIndex: number, featureIndex: number) => {
    const updatedProjects = [...projects]
    if (updatedProjects[projectIndex].caseStudy?.keyFeatures) {
      updatedProjects[projectIndex].caseStudy!.keyFeatures = updatedProjects[
        projectIndex
      ].caseStudy!.keyFeatures!.filter((_, i) => i !== featureIndex)
      setProjects(updatedProjects)
    }
  }

  const handleAddSystemArchitecture = (projectIndex: number) => {
    if (systemArchitectureTitle.trim() !== "" && systemArchitectureDescription.trim() !== "") {
      const updatedProjects = [...projects]
      if (!updatedProjects[projectIndex].caseStudy?.systemArchitecture) {
        updatedProjects[projectIndex].caseStudy!.systemArchitecture = []
      }
      updatedProjects[projectIndex].caseStudy!.systemArchitecture!.push({
        title: systemArchitectureTitle.trim(),
        description: systemArchitectureDescription.trim(),
      })
      setProjects(updatedProjects)
      setSystemArchitectureTitle("")
      setSystemArchitectureDescription("")
    }
  }

  const handleDeleteSystemArchitecture = (projectIndex: number, archIndex: number) => {
    const updatedProjects = [...projects]
    if (updatedProjects[projectIndex].caseStudy?.systemArchitecture) {
      updatedProjects[projectIndex].caseStudy!.systemArchitecture = updatedProjects[
        projectIndex
      ].caseStudy!.systemArchitecture!.filter((_, i) => i !== archIndex)
      setProjects(updatedProjects)
    }
  }

  const handleAddChallengeSolution = (projectIndex: number) => {
    if (challengeTitle.trim() !== "" && challengeDescription.trim() !== "" && solutionDescription.trim() !== "") {
      const updatedProjects = [...projects]
      if (!updatedProjects[projectIndex].caseStudy?.challengesAndSolutions) {
        updatedProjects[projectIndex].caseStudy!.challengesAndSolutions = []
      }
      updatedProjects[projectIndex].caseStudy!.challengesAndSolutions!.push({
        title: challengeTitle.trim(),
        challenge: challengeDescription.trim(),
        solution: solutionDescription.trim(),
      })
      setProjects(updatedProjects)
      setChallengeTitle("")
      setChallengeDescription("")
      setSolutionDescription("")
    }
  }

  const handleDeleteChallengeSolution = (projectIndex: number, csIndex: number) => {
    const updatedProjects = [...projects]
    if (updatedProjects[projectIndex].caseStudy?.challengesAndSolutions) {
      updatedProjects[projectIndex].caseStudy!.challengesAndSolutions = updatedProjects[
        projectIndex
      ].caseStudy!.challengesAndSolutions!.filter((_, i) => i !== csIndex)
      setProjects(updatedProjects)
    }
  }

  const handleRemoveCaseStudy = (projectIndex: number) => {
    const updatedProjects = [...projects]
    updatedProjects[projectIndex].caseStudy = {
      youtubeVideoUrl: "",
      projectOverview: "",
      keyFeatures: [],
      databaseArchitectureImage: { public_id: "", url: "" },
      systemArchitectureImage: { public_id: "", url: "" }, // Clear new image field
      systemArchitecture: [{ title: "", description: "" }],
      challengesAndSolutions: [{ title: "", challenge: "", solution: "" }],
    }
    setProjects(updatedProjects)
  }

  const handleBack = () => setActive(active - 1)

  const handleNext = () => {
    const isIncomplete = projects.some(
      (p) =>
        !p.title ||
        !p.link ||
        !p.description ||
        p.technologies.length === 0 ||
        !p.dates ||
        p.links.some((l) => !l.type || !l.link) || // Reverted validation
        !p.video?.url, // Ensure video is present
    )

    if (isIncomplete) {
      alert("Please complete all fields before proceeding, including a video for each project.")
      return
    }

    localStorage.setItem("projects", JSON.stringify(projects))
    alert("Projects data saved locally. Click 'Save Complete Portfolio' to save to database.")
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-black shadow-md rounded-xl space-y-6">
      <h1 className="text-2xl font-bold text-center text-black dark:text-white">Projects</h1>
      {projects.map((p, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            className="border border-gray-300 dark:border-gray-700 rounded-md p-4 bg-gray-50 dark:bg-gray-900 space-y-3"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-black dark:text-white">Project {i + 1}</div>
              <div
                className="text-sm text-blue-600 cursor-pointer hover:underline"
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                {isOpen ? "Hide ▲" : "Show ▼"}
              </div>
            </div>
            {isOpen && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">Title</label>
                  <input
                    type="text"
                    value={p.title}
                    onChange={(e) => handleProjects(i, "title", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">Link</label>
                  <input
                    type="url"
                    value={p.link}
                    onChange={(e) => handleProjects(i, "link", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">End Date</label>
                  <DatePicker
                    views={["month", "year"]}
                    value={p.dates ? dayjs(p.dates, "MMMM YYYY") : null}
                    onChange={(date: any) => {
                      if (date?.isValid()) {
                        handleProjects(i, "dates", date.format("MMMM YYYY"))
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
                  <label className="block text-sm font-medium text-black dark:text-white">Description</label>
                  <textarea
                    value={p.description}
                    onChange={(e) => handleProjects(i, "description", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Technologies (press Enter after each)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {p.technologies.map((tech, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 bg-blue-100 text-blue-800 rounded-md px-2 py-1 text-sm"
                      >
                        <span>{tech}</span>
                        <button
                          onClick={() => DeleteTechnology(idx, i)}
                          className="text-red-600 hover:text-red-800 font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={technologievalue}
                    onChange={(e) => setTechnologievalue(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, i, e.currentTarget.value)}
                    placeholder="Enter a technology"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                  />
                </div>
                {/* Additional Links UI Section */}
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">Additional Links</label>
                  <div className="bg-gray-200 dark:bg-gray-800 p-5 rounded-md space-y-4">
                    {p.links.map((l, lindex) => {
                      const linkOpen = openlinkindex === lindex
                      return (
                        <div key={lindex} className="space-y-2">
                          <div className="flex justify-between items-center text-sm font-semibold text-black dark:text-white">
                            <span>Link {lindex + 1}</span>
                            <button
                              className="text-blue-600 hover:underline focus:outline-none"
                              onClick={() => setOpenlinkindex(linkOpen ? null : lindex)}
                            >
                              {linkOpen ? "Hide ▲" : "Show ▼"}
                            </button>
                          </div>
                          {linkOpen && (
                            <div className="p-4 bg-white dark:bg-gray-900 rounded-md border border-gray-300 dark:border-gray-700 space-y-3">
                              <div>
                                <label className="block text-xs font-medium text-black dark:text-white mb-1">
                                  Link Type
                                </label>
                                <input
                                  placeholder="e.g. GitHub"
                                  value={l.type}
                                  onChange={(e) => handleProjectslinks(i, lindex, "type", e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-black dark:text-white mb-1">
                                  Link URL
                                </label>
                                <input
                                  placeholder="Enter URL"
                                  value={l.link}
                                  onChange={(e) => handleProjectslinks(i, lindex, "link", e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                    <button
                      onClick={() => addNewLink(i)}
                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      + Add More Links
                    </button>
                  </div>
                </div>
                {/* Video Upload for Project */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black dark:text-white">Project Video</label>
                  <VideoUpload
                    videoInfo={p.video}
                    projectIndex={i}
                    updateProjectVide={updateProjectVideo}
                    deleteProjectVide={deleteProjectVideo}
                  />
                  <p className="text-sm text-muted-foreground">Upload a video for your project.</p>
                </div>

                {/* Case Study Section */}
                <div className="space-y-4 border-t border-gray-300 dark:border-gray-700 pt-4 mt-4">
                  <h2 className="text-lg font-bold text-black dark:text-white">Case Study Details</h2>
                  {p.caseStudy?.projectOverview ||
                  p.caseStudy?.youtubeVideoUrl ||
                  p.caseStudy?.keyFeatures?.length > 0 ||
                  p.caseStudy?.databaseArchitectureImage?.url ||
                  p.caseStudy?.systemArchitectureImage?.url || // Check for new image field
                  p.caseStudy?.systemArchitecture?.length > 0 ||
                  p.caseStudy?.challengesAndSolutions?.length > 0 ? (
                    <button
                      onClick={() => handleRemoveCaseStudy(i)}
                      className="text-sm text-red-600 hover:text-red-800 font-medium mb-4"
                    >
                      ✕ Remove Case Study
                    </button>
                  ) : (
                    <p className="text-sm text-muted-foreground mb-4">No case study details added for this project.</p>
                  )}
                  {/* YouTube Video URL */}
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white">YouTube Video URL</label>
                    <input
                      type="url"
                      value={p.caseStudy?.youtubeVideoUrl || ""}
                      onChange={(e) => handleCaseStudy(i, "youtubeVideoUrl", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                  {/* Project Overview */}
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white">Project Overview</label>
                    <textarea
                      value={p.caseStudy?.projectOverview || ""}
                      onChange={(e) => handleCaseStudy(i, "projectOverview", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                      placeholder="Detailed overview of the project"
                      rows={5}
                    />
                  </div>
                  {/* Key Features */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-black dark:text-white">Key Features</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {p.caseStudy?.keyFeatures?.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1 bg-green-100 text-green-800 rounded-md px-2 py-1 text-sm"
                        >
                          <span>{feature}</span>
                          <button
                            onClick={() => handleDeleteKeyFeature(i, idx)}
                            className="text-red-600 hover:text-red-800 font-bold"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={keyFeatureValue}
                        onChange={(e) => setKeyFeatureValue(e.target.value)}
                        placeholder="Add a key feature"
                        className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                      />
                      <button
                        onClick={() => handleAddKeyFeature(i)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  {/* Database Architecture Image */}
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      Database Architecture Image
                    </label>
                    <ImageUpload
                      currentImage={p.caseStudy?.databaseArchitectureImage || { public_id: "", url: "" }}
                      onImageChange={(image) => handleCaseStudy(i, "databaseArchitectureImage", image)}
                    />
                  </div>
                  {/* System Architecture Image */}
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      System Architecture Image
                    </label>
                    <ImageUpload
                      currentImage={p.caseStudy?.systemArchitectureImage || { public_id: "", url: "" }}
                      onImageChange={(image) => handleCaseStudy(i, "systemArchitectureImage", image)}
                    />
                  </div>
                  {/* System Architecture */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-black dark:text-white">System Architecture</label>
                    {p.caseStudy?.systemArchitecture?.map((arch, idx) => (
                      <div key={idx} className="border border-gray-300 dark:border-gray-700 rounded-md p-3 space-y-2">
                        <h4 className="font-semibold text-black dark:text-white">{arch.title}</h4>
                        <p className="text-sm text-muted-foreground">{arch.description}</p>
                        <button
                          onClick={() => handleDeleteSystemArchitecture(i, idx)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <div className="space-y-2 p-3 border border-dashed border-gray-400 dark:border-gray-600 rounded-md">
                      <input
                        type="text"
                        value={systemArchitectureTitle}
                        onChange={(e) => setSystemArchitectureTitle(e.target.value)}
                        placeholder="Architecture Title (e.g., Frontend)"
                        className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                      />
                      <textarea
                        value={systemArchitectureDescription}
                        onChange={(e) => setSystemArchitectureDescription(e.target.value)}
                        placeholder="Architecture Description"
                        rows={3}
                        className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                      />
                      <button
                        onClick={() => handleAddSystemArchitecture(i)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                      >
                        Add Architecture
                      </button>
                    </div>
                  </div>
                  {/* Challenges & Solutions */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-black dark:text-white">
                      Challenges & Solutions
                    </label>
                    {p.caseStudy?.challengesAndSolutions?.map((cs, idx) => (
                      <div key={idx} className="border border-gray-300 dark:border-gray-700 rounded-md p-3 space-y-2">
                        <h4 className="font-semibold text-black dark:text-white">{cs.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          <strong>Challenge:</strong> {cs.challenge}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Solution:</strong> {cs.solution}
                        </p>
                        <button
                          onClick={() => handleDeleteChallengeSolution(i, idx)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <div className="space-y-2 p-3 border border-dashed border-gray-400 dark:border-gray-600 rounded-md">
                      <input
                        type="text"
                        value={challengeTitle}
                        onChange={(e) => setChallengeTitle(e.target.value)}
                        placeholder="Challenge Title (e.g., Real-time Communication)"
                        className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                      />
                      <textarea
                        value={challengeDescription}
                        onChange={(e) => setChallengeDescription(e.target.value)}
                        placeholder="Challenge Description"
                        rows={2}
                        className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                      />
                      <textarea
                        value={solutionDescription}
                        onChange={(e) => setSolutionDescription(e.target.value)}
                        placeholder="Solution Description"
                        rows={2}
                        className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                      />
                      <button
                        onClick={() => handleAddChallengeSolution(i)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                      >
                        Add Challenge/Solution
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
      <button
        onClick={addProject}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
      >
        + Add More Project
      </button>

      {/* Navigation Buttons */}
      <div className="pt-6 flex justify-between">
        <button
          onClick={handleBack}
          className="bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded-md hover:opacity-90 transition duration-200 font-semibold"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded-md hover:opacity-90 transition duration-200 font-semibold"
        >
          Save Projects Data
        </button>
      </div>
    </div>
  )
}

export default Projects
