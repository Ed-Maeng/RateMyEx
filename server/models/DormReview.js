import mongoose from "mongoose";

const DormReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    dormId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    campus: {
      type: String,
      default: null,
    },
    rooms: {
      type: String,
      default: null,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      max: 500,
    },
    imageNames: {
      type: Array,
      default: [],
    },
    imageUrls: {
      type: Array,
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

const DormReview = mongoose.model("DormReview", DormReviewSchema);
export default DormReview;
