import express from "express";
import {
  getInternship,
  getInternshipRatings,
  getInternshipReview,
  getInternshipReviews,
  getInternships,
  updateInternship,
} from "../controllers/internship.js";

const router = express.Router();

router.get("/:schoolId", getInternships);
router.get("/section/:internshipId", getInternship);
router.get("/reviews/:internshipId", getInternshipReviews);
router.get("/review/:_id", getInternshipReview);
router.get("/ratings/:internshipId", getInternshipRatings);
router.put("/:internshipId", updateInternship);

export default router;
