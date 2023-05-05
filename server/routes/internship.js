import express from "express";
import {
  createInternshipReview,
  getInternshipReviews,
  getUserInternshipReviews
} from "../controllers/internship.js";

const router = express.Router();

router.post("/:userId/:schoolId", createInternshipReview);
router.get("/:schoolId", getInternshipReviews);
router.get("/:userId/:schoolId", getUserInternshipReviews);

export default router;
