import mongoose from "mongoose";

const ProfessorSchema = new mongoose.Schema(
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
    color: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Unique Index (School ID, Internship Name)
ProfessorSchema.index({ "schoolId": 1, "name": 1}, { "unique": true });

const Professor = mongoose.model("Professor", ProfessorSchema);
export default Professor;
