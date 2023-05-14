import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    schoolName: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: true
    }

  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
