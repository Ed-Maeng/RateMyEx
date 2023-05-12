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
import { createSchool } from "./controllers/school.js";

/* ROUTERS */
import authRoutes from "./routes/auth.js";
import clubRoutes from "./routes/club.js";
import dormRoutes from "./routes/dorm.js";
import internshipRoutes from "./routes/internship.js";
import schoolRoutes from "./routes/school.js";

/* CONFIGURATIONS */
const app = express();
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

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/schools", schoolRoutes);
app.use("/internships", internshipRoutes);
app.use("/dorms", dormRoutes);
app.use("/clubs", clubRoutes);

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
