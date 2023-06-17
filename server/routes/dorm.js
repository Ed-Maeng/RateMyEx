import express from "express";
import {
  getDorm,
  getDormRatings,
  getDormReview,
  getDormReviews,
  getDorms,
  updateDorm,
} from "../controllers/dorm.js";

const router = express.Router();

router.get("/:schoolId", getDorms);
router.get("/section/:dormId", getDorm);
router.get("/reviews/:dormId", getDormReviews);
router.get("/review/:_id", getDormReview);
router.get("/ratings/:dormId", getDormRatings);
router.put("/:dormId", updateDorm);

export default router;
