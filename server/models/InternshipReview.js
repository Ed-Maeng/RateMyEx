import mongoose from "mongoose";

const InternshipReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    internshipId: {
      type: String,
      required: true
    },
    role: {
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

const InternshipReview = mongoose.model("InternshipReview", InternshipReviewSchema);
export default InternshipReview;
