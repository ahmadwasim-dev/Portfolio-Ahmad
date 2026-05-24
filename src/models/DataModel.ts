import mongoose, { type Document, type Model, Schema } from "mongoose"

// Reusable image schema
const imageSchema = {
  public_id: { type: String, required: true },
  url: { type: String, required: true },
}

// Video schema for project video
const videoSchema = {
  public_id: { type: String, required: true },
  url: { type: String, required: true },
  duration: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  format: { type: String, required: true },
  bytes: { type: Number, required: true },
}

// TypeScript Interface
export interface IData extends Document {
  name: string
  location: string
  locationLink: string
  description: string
  summary: string
  avatarUrl: {
    public_id: string
    url: string
  }
  skills: string[]
  resumeUrl?: string // Added resumeUrl here
  initials?: string // Added initials here
  contact: {
    email: string
    tel: string
    social: {
      name: string
      url: string
      icon: {
        public_id: string
        url: string
      }
      navbar: boolean
    }[]
  }
  work: {
    company: string
    link: string
    location: string
    logoUrl: {
      public_id: string
      url: string
    }
    start: string
    end: string
    description: string
  }[]
  education: {
    school: string
    link: string
    degree: string
    logoUrl: {
      public_id: string
      url: string
    }
    start: string
    end: string
  }[]
  projects: {
    title: string
    link: string
    dates: string
    active: boolean
    description: string
    technologies: string[]
    links: {
      type: string // Reverted to 'type'
      link: string // Reverted to 'link'
    }[]
    video: {
      public_id: string
      url: string
      duration: number
      width: number
      height: number
      format: string
      bytes: number
    }
    caseStudy?: {
      // New optional case study object
      youtubeVideoUrl?: string
      projectOverview?: string
      keyFeatures?: string[]
      databaseArchitectureImage?: {
        public_id: string
        url: string
      }
      systemArchitectureImage?: {
        public_id: string
        url: string
      } // New: Image for overall system architecture
      systemArchitecture?: { title: string; description: string }[]
      challengesAndSolutions?: { title: string; challenge: string; solution: string }[]
    }
  }[]
  hackathons: {
    title: string
    link: string
    dates: string
    location: string
    description?: string
    image: {
      public_id: string
      url: string
    }
    // Removed 'links' from Hackathons as per your DATA object
  }[]
}

// Mongoose Schema
const DataSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    locationLink: { type: String, required: true },
    description: { type: String, required: true },
    summary: { type: String, required: true },
    avatarUrl: imageSchema,
    skills: { type: [String], required: true },
    resumeUrl: { type: String }, // Added resumeUrl here
    initials: { type: String }, // Added initials here
    contact: {
      email: { type: String, required: true },
      tel: { type: String, required: true },
      social: [
        {
          name: { type: String, required: true },
          url: { type: String, required: true },
          icon: imageSchema,
          navbar: { type: Boolean, default: false },
        },
      ],
    },
    work: [
      {
        company: { type: String, required: true },
        link: { type: String, required: true },
        location: { type: String, required: true },
        logoUrl: imageSchema,
        start: { type: String, required: true },
        end: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    education: [
      {
        school: { type: String, required: true },
        link: { type: String, required: true },
        degree: { type: String, required: true },
        logoUrl: imageSchema,
        start: { type: String, required: true },
        end: { type: String, required: true },
      },
    ],
    projects: [
      {
        title: { type: String, required: true },
        link: { type: String, required: true },
        dates: { type: String, required: true },
        active: { type: Boolean, default: false },
        description: { type: String, required: true },
        technologies: { type: [String], required: true },
        links: [
          {
            type: { type: String, required: true }, // Reverted to 'type'
            link: { type: String, required: true }, // Reverted to 'link'
          },
        ],
        video: videoSchema,
        caseStudy: {
          // New optional case study object
          youtubeVideoUrl: { type: String },
          projectOverview: { type: String },
          keyFeatures: { type: [String] },
          databaseArchitectureImage: imageSchema,
          systemArchitectureImage: imageSchema, // New: Image for overall system architecture
          systemArchitecture: [
            {
              title: { type: String },
              description: { type: String },
            },
          ],
          challengesAndSolutions: [
            {
              title: { type: String },
              challenge: { type: String },
              solution: { type: String },
            },
          ],
        },
      },
    ],
    hackathons: [
      {
        title: { type: String, required: true },
        link: { type: String, required: true },
        dates: { type: String, required: true },
        location: { type: String, required: true },
        description: { type: String, default: "" },
        image: imageSchema,
        // Removed 'links' from Hackathons as per your DATA object
      },
    ],
  },
  { timestamps: true },
)

// Export model
export const DataModel: Model<IData> = mongoose.models.DataModel || mongoose.model<IData>("DataModel", DataSchema)
