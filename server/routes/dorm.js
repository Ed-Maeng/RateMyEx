import express from "express";
import {
  getDorm,
  getDormReview,
  getDormReviews,
  getDormReviewsData,
  getDorms,
  updateDorm,
} from "../controllers/dorm.js";

const router = express.Router();

router.get("/:schoolId", getDorms);
router.get("/section/:dormId", getDorm);
router.get("/reviews/:dormId", getDormReviews);
router.get("/review/:_id", getDormReview);
router.get("/reviewsData/:dormId", getDormReviewsData);
router.put("/:dormId", updateDorm);

export default router;
