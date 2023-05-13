import express from "express";
import {
  getDormReviews,
  getDorms,
  getUserDormReviews
} from "../controllers/dorm.js";

const router = express.Router();

router.get("/:schoolId", getDorms);
router.get("/reviews/:dormId", getDormReviews);
router.get("/reviews/:dormId/:userId", getUserDormReviews);

export default router;
