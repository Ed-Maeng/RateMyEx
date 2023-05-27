import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { verifyToken } from "./middleware/auth.js";

/* ROUTES */
import { createClub, createClubReview } from "./controllers/club.js";
import { createDorm, createDormReview } from "./controllers/dorm.js";
import { createInternship, createInternshipReview } from "./controllers/internship.js";
import { createProfessor, createProfessorReview } from "./controllers/professor.js";
import { createSchool } from "./controllers/school.js";

/* ROUTERS */
import authRoutes from "./routes/auth.js";
import clubRoutes from "./routes/club.js";
import dormRoutes from "./routes/dorm.js";
import internshipRoutes from "./routes/internship.js";
import professorRoutes from "./routes/professor.js";
import schoolRoutes from "./routes/school.js";
import userRoutes from "./routes/user.js";

/* CONFIGURATIONS */
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/self-ssl-key.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/self-signed-cerrt.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var express = require('express');

const app = express();
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
app.use(express.json());
app.use(cors());
dotenv.config();

/* MEMORY STORAGE */
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* ROUTES WITH S3 & FILE */
app.post("/schools", upload.single("file"), createSchool);
app.post("/internships/:schoolId", upload.single("file"), createInternship);
app.post("/internships/:internshipId/:userId", verifyToken, upload.array("files[]", 3), createInternshipReview);
app.post("/dorms/:schoolId", upload.single("file"), createDorm);
app.post("/dorms/:dormId/:userId", verifyToken, upload.array("files[]", 3), createDormReview);
app.post("/clubs/:schoolId", upload.single("file"), createClub);
app.post("/clubs/:clubId/:userId", verifyToken, upload.array("files[]", 3), createClubReview);
app.post("/professors/:schoolId", upload.single("file"), createProfessor);
app.post("/professors/:professorId/:userId", verifyToken, upload.array("files[]", 3), createProfessorReview);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/schools", schoolRoutes);
app.use("/internships", internshipRoutes);
app.use("/professors", professorRoutes);
app.use("/dorms", dormRoutes);
app.use("/clubs", clubRoutes);
app.use("/users", userRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });
