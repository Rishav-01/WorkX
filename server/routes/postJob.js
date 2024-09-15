import express from "express";
import multer from "multer";
import Job from "../models/Job.js";

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const postJobRouter = express.Router();

// After /api/postJob
postJobRouter.post("/", upload.single("logo"), async (req, res) => {
  // Process the uploaded file
  const logo = req.file;
  const data = JSON.parse(req.body);
  const job = new Job(data);
  job.logo = logo;
  await job.save();
  res.json(job);
});

export default postJobRouter;
