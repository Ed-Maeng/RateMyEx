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

const ClubReview = mongoose.model("ClubReview", ClubReviewSchema);
export default ClubReview;
