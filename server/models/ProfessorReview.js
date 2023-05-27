import mongoose from "mongoose";

const ProfessorReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    professorId: {
      type: String,
      required: true
    },
    term: {
      type: String,
    },
    className: {
      type: String,
      required: true,
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

const ProfessorReview = mongoose.model("ProfessorReview", ProfessorReviewSchema);
export default ProfessorReview;
