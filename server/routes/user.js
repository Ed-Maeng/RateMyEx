import express from "express";
import {
  getUser,
  getUserReviews,
} from "../controllers/user.js";

const router = express.Router();

router.get("/:_id", getUser);
router.get("/reviews/:userId", getUserReviews);

export default router;
