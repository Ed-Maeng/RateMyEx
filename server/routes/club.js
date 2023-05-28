import express from "express";
import {
  getClub,
  getClubReviews,
  getClubs,
  updateClub,
} from "../controllers/club.js";

const router = express.Router();

router.get("/:schoolId", getClubs);
router.get("/section/:clubId", getClub);
router.get("/reviews/:clubId", getClubReviews);
router.put("/:clubId", updateClub);

export default router;
