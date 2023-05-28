import express from "express";
import {
  getInternship,
  getInternshipReviews,
  getInternships,
  updateInternship,
} from "../controllers/internship.js";

const router = express.Router();

router.get("/:schoolId", getInternships);
router.get("/section/:internshipId", getInternship);
router.get("/reviews/:internshipId", getInternshipReviews);
router.put("/:internshipId", updateInternship);

export default router;
