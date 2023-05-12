import mongoose from "mongoose";

const DormReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    dormId: {
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

const DormReview = mongoose.model("DormReview", DormReviewSchema);
export default DormReview;
