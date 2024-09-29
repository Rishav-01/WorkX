import express from "express";
import connectDb from "./db.js";
import cors from "cors";
import applyRouter from "./routes/Jobseeker/apply.js";
import postJobRouter from "./routes/Recruiter/postJob.js";
import path from "path";
import { fileURLToPath } from "url";
import getJobsRouter from "./routes/Recruiter/getJobs.js";
import getAllJobsRouter from "./routes/Jobseeker/getAllJobs.js";
import getApplicationsRouter from "./routes/Jobseeker/getApplications.js";
import actionRouter from "./routes/Recruiter/action.js";
import { configDotenv } from "dotenv";
configDotenv();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use((req, res, next) => {
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  res.header("Cross-Origin-Embedder-Policy", "credentialless");
  next();
});
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json(), express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/apply", applyRouter);
app.use("/api/postJob", postJobRouter);
app.use("/api/getJobs", getJobsRouter);
app.use("/api/jobSeeker", getAllJobsRouter);
app.use("/api/jobSeeker/applications", getApplicationsRouter);
app.use("/api/recruiter/action", actionRouter);

app.get("/", (req, res) => {
  res.json("Hi");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
