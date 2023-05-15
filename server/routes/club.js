import express from "express";
import {
  getClubReviews,
  getClubs,
} from "../controllers/club.js";

const router = express.Router();

router.get("/:schoolId", getClubs);
router.get("/reviews/:clubId", getClubReviews);

export default router;
