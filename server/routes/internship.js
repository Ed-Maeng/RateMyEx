import express from "express";
import {
  createInternship,
  createInternshipReview,
  getInternshipReviews,
  getInternships,
  getUserInternshipReviews
} from "../controllers/internship.js";

const router = express.Router();

router.post("/:schoolName", createInternship);
router.post("/:internshipId/:userId", createInternshipReview);
router.get("/:schoolName", getInternships);
router.get("/reviews/:internshipId", getInternshipReviews);
router.get("/reviews/:internshipId/:userId", getUserInternshipReviews);

export default router;
