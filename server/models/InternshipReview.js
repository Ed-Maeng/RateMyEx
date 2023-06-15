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
    name: {
      type: String,
      required: true
    },
    industry: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
      max: 50,
    },
    term: {
      type: String,
      default: null,
    },
    employmentType: {
      type: String,
      default: null,
    },
    location: {
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
    numberOfLikes: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

const InternshipReview = mongoose.model("InternshipReview", InternshipReviewSchema);
export default InternshipReview;
