import express from "express";
import {
  getDorm,
  getDormFilters,
  getDormRatings,
  getDormReview,
  getDormReviews,
  getDorms,
  updateDorm,
} from "../controllers/dorm.js";

const router = express.Router();

router.get("/:schoolId", getDorms);
router.get("/section/:dormId", getDorm);
router.post("/reviews/:dormId", getDormReviews);
router.get("/review/:_id", getDormReview);
router.get("/ratings/:dormId", getDormRatings);
router.get("/filters/:dormId", getDormFilters);
router.put("/:dormId", updateDorm);

export default router;
