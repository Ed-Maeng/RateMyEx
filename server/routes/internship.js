import express from "express";
import {
  getInternshipReviews,
  getInternships,
  getUserInternshipReviews
} from "../controllers/internship.js";

const router = express.Router();

router.get("/:schoolId", getInternships);
router.get("/reviews/:internshipId", getInternshipReviews);
router.get("/reviews/:internshipId/:userId", getUserInternshipReviews);

export default router;
