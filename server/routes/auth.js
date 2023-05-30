import express from "express";
import { login, oauth, register, verifyEmail } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/verifyemail", verifyEmail)
router.post("/login", login);
router.post("/oauth", oauth);

export default router;
