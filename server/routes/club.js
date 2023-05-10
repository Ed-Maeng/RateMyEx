import express from "express";
import {
  createClub,
  createClubReview,
  getClubReviews,
  getClubs,
  getUserClubReviews
} from "../controllers/club.js";

const router = express.Router();

router.post("/:schoolName", createClub);
router.post("/:clubId/:userId", createClubReview);
router.get("/:schoolName", getClubs);
router.get("/reviews/:clubId", getClubReviews);
router.get("/reviews/:clubId/:userId", getUserClubReviews);

export default router;
