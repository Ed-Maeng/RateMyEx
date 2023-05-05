import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

/* ROUTERS */
import authRoutes from "./routes/auth.js";
import internshipRoutes from "./routes/internship.js";
import schoolRoutes from "./routes/school.js";

/* CONFIGURATIONS */
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/school", schoolRoutes);
app.use("/internship", internshipRoutes);

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
