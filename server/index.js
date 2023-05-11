import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

/* ROUTERS */
import authRoutes from "./routes/auth.js";
import dormRoutes from "./routes/dorm.js";
import internshipRoutes from "./routes/internship.js";
import schoolRoutes from "./routes/school.js";
import clubRoutes from "./routes/club.js";
import userRoutes from "./routes/user.js";

/* CONFIGURATIONS */
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/schools", schoolRoutes);
app.use("/internships", internshipRoutes);
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
