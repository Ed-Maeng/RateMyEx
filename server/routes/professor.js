import express from "express";
import {
  getProfessorReviews,
  getProfessors,
  updateProfessor,
} from "../controllers/professor.js";

const router = express.Router();

router.get("/:schoolId", getProfessors);
router.get("/reviews/:professorId", getProfessorReviews);
router.put("/:professorId", updateProfessor);

export default router;
