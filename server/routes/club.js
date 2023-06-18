import express from "express";
import {
  getClub,
  getClubFilters,
  getClubRatings,
  getClubReview,
  getClubReviews,
  getClubs,
  updateClub,
} from "../controllers/club.js";

const router = express.Router();

router.get("/:schoolId", getClubs);
router.get("/section/:clubId", getClub);
router.post("/reviews/:clubId", getClubReviews);
router.get("/review/:_id", getClubReview);
router.get("/ratings/:clubId", getClubRatings);
router.get("/filters/:clubId", getClubFilters);
router.put("/:clubId", updateClub);

export default router;
