import express from "express";
import {
  getProfessor,
  getProfessorRatings,
  getProfessorReview,
  getProfessorReviews,
  getProfessors,
  updateProfessor,
} from "../controllers/professor.js";

const router = express.Router();

router.get("/:schoolId", getProfessors);
router.get("/section/:professorId", getProfessor);
router.get("/reviews/:professorId", getProfessorReviews);
router.get("/review/:_id", getProfessorReview);
router.get("/ratings/:professorId", getProfessorRatings);
router.put("/:professorId", updateProfessor);

export default router;
