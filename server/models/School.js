import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    abbreivation: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",    
    },
    numberOfReviews: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

const School = mongoose.model("School", SchoolSchema);
export default School;
