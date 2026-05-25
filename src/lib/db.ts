import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    const MONGODB_URI: any = process.env.MONGODB_URI

    // Skip connection if MONGODB_URI is not set
    if (!MONGODB_URI) {
      console.warn("MONGODB_URI not set, using fallback data only")
      throw new Error("MONGODB_URI environment variable is not set")
    }

    if (mongoose.connections[0].readyState) {
      return
    }
    
    await mongoose.connect(MONGODB_URI, {
      connectTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    })
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}
