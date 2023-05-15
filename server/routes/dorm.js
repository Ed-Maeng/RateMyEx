import express from "express";
import {
  getDormReviews,
  getDorms,
} from "../controllers/dorm.js";

const router = express.Router();

router.get("/:schoolId", getDorms);
router.get("/reviews/:dormId", getDormReviews);

export default router;
