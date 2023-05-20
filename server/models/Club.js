import mongoose from "mongoose";

const ClubSchema = new mongoose.Schema(
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

// Unique Index (School ID, Club Name)
ClubSchema.index({ "schoolId": 1, "name": 1}, { "unique": true });

const Club = mongoose.model("Club", ClubSchema);
export default Club;
