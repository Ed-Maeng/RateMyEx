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
    },
    employmentType: {
      type: String,
    },
    location: {
      type: String,
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
  },
  { timestamps: true }
);

const InternshipReview = mongoose.model("InternshipReview", InternshipReviewSchema);
export default InternshipReview;
