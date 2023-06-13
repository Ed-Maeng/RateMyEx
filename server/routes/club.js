import express from "express";
import {
  getClub,
  getClubReviews,
  getClubReviewsData,
  getClubs,
  updateClub,
} from "../controllers/club.js";

const router = express.Router();

router.get("/:schoolId", getClubs);
router.get("/section/:clubId", getClub);
router.get("/reviews/:clubId", getClubReviews);
router.get("/reviewsData/:clubId", getClubReviewsData);
router.put("/:clubId", updateClub);

export default router;
