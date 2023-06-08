import mongoose from "mongoose";

const DormSchema = new mongoose.Schema(
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
      default: "9c006e2f35abcb80f190d737f0a3ff4a0d234b6b1af5197f672332052d122e63",
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Unique Index (School ID, Dorm Name)
DormSchema.index({ "schoolId": 1, "name": 1}, { "unique": true });

const Dorm = mongoose.model("Dorm", DormSchema);
export default Dorm;
