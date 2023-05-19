import express from "express";
import {
  getProfessorReviews,
  getProfessors,
} from "../controllers/professor.js";

const router = express.Router();

router.get("/:schoolId", getProfessors);
router.get("/reviews/:professorId", getProfessorReviews);

export default router;
