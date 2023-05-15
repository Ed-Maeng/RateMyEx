import express from "express";
import {
  getInternshipReviews,
  getInternships,
} from "../controllers/internship.js";

const router = express.Router();

router.get("/:schoolId", getInternships);
router.get("/reviews/:internshipId", getInternshipReviews);

export default router;
