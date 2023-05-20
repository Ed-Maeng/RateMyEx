import express from "express";
import {
  getClubReviews,
  getClubs,
  updateClub,
} from "../controllers/club.js";

const router = express.Router();

router.get("/:schoolId", getClubs);
router.get("/reviews/:clubId", getClubReviews);
router.put("/:clubId", updateClub);

export default router;
