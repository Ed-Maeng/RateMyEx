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
      default: "",
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
