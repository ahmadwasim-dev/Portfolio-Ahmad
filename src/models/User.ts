import mongoose, { type Document, type Model, Schema } from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser extends Document {
  username: string
  password: string
  comparePassword: (candidatePassword: string) => Promise<boolean>
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Do not return password by default
    },
  },
  { timestamps: true },
)

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password)
}

export const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
