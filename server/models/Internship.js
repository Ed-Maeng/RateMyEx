import mongoose from "mongoose";

const InternshipSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    schoolId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      max: 50,
    },
    role: {
      type: String,
      required: true,
      max: 50,
    },
    location: {
      type: String,
      min: 2,
      max: 50,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Internship = mongoose.model("Internship", InternshipSchema);
export default Internship;
