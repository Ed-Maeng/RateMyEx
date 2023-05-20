import mongoose from "mongoose";

const InternshipSchema = new mongoose.Schema(
  {
    schoolId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      max: 50,
    },
    totalReviews: {
      type: Number,
      default: 0,
      required: true,
    },
    totalRatings: {
      type: Number,
      default: 0,
      required: true,
    },
    imageName: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Unique Index (School ID, Internship Name)
InternshipSchema.index({ "schoolId": 1, "name": 1}, { "unique": true });

const Internship = mongoose.model("Internship", InternshipSchema);
export default Internship;
