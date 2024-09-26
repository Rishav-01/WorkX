import express from "express";
import multer from "multer";
import Job from "../../models/Job.js";

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
  try {
    // Process the uploaded file
    const fileName = req.file.originalname + Date.now();
    let { data } = req.body;
    data = JSON.parse(data);
    // console.log(data);
    const job = new Job(data);
    job.logo = fileName;
    await job.save();
    res.json(job);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
});

export default postJobRouter;
