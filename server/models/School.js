import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    shortName: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",    
    },
  },
  { timestamps: true }
);

const School = mongoose.model("School", SchoolSchema);
export default School;
