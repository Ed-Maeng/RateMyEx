import express from "express";
import { getSchool, getSchools } from "../controllers/school.js";

const router = express.Router();

router.get("/", getSchools);
router.get("/:schoolId", getSchool);

export default router;
