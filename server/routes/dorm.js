import express from "express";
import {
  createDorm,
  createDormReview,
  getDormReviews,
  getDorms,
  getUserDormReviews
} from "../controllers/dorm.js";

const router = express.Router();

router.post("/:schoolName", createDorm);
router.post("/:dormId/:userId", createDormReview);
router.get("/:schoolName", getDorms);
router.get("/reviews/:dormId", getDormReviews);
router.get("/reviews/:dormId/:userId", getUserDormReviews);

export default router;
