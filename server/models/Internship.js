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
      default: "e11fa827751d82b05562abb9eecc3a1f4b324d5ea90780cf747bbf4fcb2b3476",
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
