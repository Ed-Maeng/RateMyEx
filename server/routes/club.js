import express from "express";
import {
  getClubReviews,
  getClubs,
  getUserClubReviews
} from "../controllers/club.js";

const router = express.Router();

router.get("/:schoolName", getClubs);
router.get("/reviews/:clubId", getClubReviews);
router.get("/reviews/:clubId/:userId", getUserClubReviews);

export default router;
