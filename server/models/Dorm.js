import mongoose from "mongoose";

const DormSchema = new mongoose.Schema(
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
    totalReviews: {
      type: Number,
      default: 0,
      required: true,
    },
    averageRating: {
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

// Unique Index (School Name, Dorm Name)
DormSchema.index({ "schoolName": 1, "name": 1}, { "unique": true });

const Dorm = mongoose.model("Dorm", DormSchema);
export default Dorm;
