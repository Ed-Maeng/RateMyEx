import mongoose from "mongoose";

const DormSchema = new mongoose.Schema(
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

const Internship = mongoose.model("Dorm", DormSchema);
export default Internship;
