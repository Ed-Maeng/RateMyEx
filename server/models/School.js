import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    location: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
);

const School = mongoose.model("School", SchoolSchema);
export default School;
