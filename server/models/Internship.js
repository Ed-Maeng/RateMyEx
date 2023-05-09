import mongoose from "mongoose";

const InternshipSchema = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      max: 50,
    },
  },
  { timestamps: true }
);

// Unique Index (School Name, Internship Name)
InternshipSchema.index({ "schoolName": 1, "name": 1}, { "unique": true });

const Internship = mongoose.model("Internship", InternshipSchema);
export default Internship;
