import express from "express";
import { login, oauth, register, resetPassword, sendResetPassword, verifyEmail } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/verifyemail", verifyEmail)
router.post("/login", login);
router.post("/oauth", oauth);
router.post("/send/reset", sendResetPassword);
router.post("/reset", resetPassword);

export default router;
