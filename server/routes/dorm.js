import express from "express";
import {
  getDorm,
  getDormReviews,
  getDorms,
  updateDorm,
} from "../controllers/dorm.js";

const router = express.Router();

router.get("/:schoolId", getDorms);
router.get("/section/:dormId", getDorm);
router.get("/reviews/:dormId", getDormReviews);
router.put("/:dormId", updateDorm);

export default router;
