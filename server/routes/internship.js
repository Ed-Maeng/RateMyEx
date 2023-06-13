import express from "express";
import {
  getInternship,
  getInternshipReviews,
  getInternshipReviewsData,
  getInternships,
  updateInternship,
} from "../controllers/internship.js";

const router = express.Router();

router.get("/:schoolId", getInternships);
router.get("/section/:internshipId", getInternship);
router.get("/reviews/:internshipId", getInternshipReviews);
router.get("/reviewsData/:internshipId", getInternshipReviewsData);
router.put("/:internshipId", updateInternship);

export default router;
