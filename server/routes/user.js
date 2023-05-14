import express from "express";
import {
  getUser,
  getUserInternshipReviews,
  getUserClubReviews,
  getUserDormReviews
} from "../controllers/user.js";

const router = express.Router();

router.get("/:_id", getUser);
router.get("/internships/:_id/:internshipId", getUserInternshipReviews);
router.get("/clubs/:_id/:clubId", getUserClubReviews);
router.get("/dorms/:_id/:dormId", getUserDormReviews);

export default router;
