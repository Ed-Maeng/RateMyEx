import express from "express";
import {
  getUser,
  getUserInternshipReviews,
  getUserClubReviews,
  getUserDormReviews
} from "../controllers/user.js";

const router = express.Router();

router.get("/:userId", getUser);
router.get("/internships/:userId/:internshipId", getUserInternshipReviews);
router.get("/clubs/:userId/:clubId", getUserClubReviews);
router.get("/dorms/:userId/:dormId", getUserDormReviews);

export default router;
