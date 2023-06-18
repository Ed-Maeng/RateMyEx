import express from "express";
import {
  getInternship,
  getInternshipFilters,
  getInternshipRatings,
  getInternshipReview,
  getInternshipReviews,
  getInternships,
  updateInternship,
} from "../controllers/internship.js";

const router = express.Router();

router.get("/:schoolId", getInternships);
router.get("/section/:internshipId", getInternship);
router.post("/reviews/:internshipId", getInternshipReviews);
router.get("/review/:_id", getInternshipReview);
router.get("/ratings/:internshipId", getInternshipRatings);
router.get("/filters/:internshipId", getInternshipFilters);
router.put("/:internshipId", updateInternship);

export default router;
