import mongoose from "mongoose";

const ClubReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    clubId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
    },
    term: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    imageNames: {
      type: Array,
      default: [],
    },
    imageUrls: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const ClubReview = mongoose.model("ClubReview", ClubReviewSchema);
export default ClubReview;
