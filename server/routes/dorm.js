import express from "express";
import {
  createDormReview,
  getDormReviews,
  getUserDormReviews
} from "../controllers/dorm.js";

const router = express.Router();

router.post("/:userId/:schoolId", createDormReview);
router.get("/:schoolId", getDormReviews);
router.get("/:userId/:schoolId", getUserDormReviews);

export default router;
