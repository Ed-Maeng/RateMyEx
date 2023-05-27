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
    campus: {
      type: String,
    },
    rooms: {
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

const DormReview = mongoose.model("DormReview", DormReviewSchema);
export default DormReview;
