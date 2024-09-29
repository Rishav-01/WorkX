import express from "express";
import multer from "multer";
import Job from "../../models/Job.js";

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    let fileName = file.originalname.split(".");
    fileName[0] += "_abcd";
    fileName = fileName.join(".");
    cb(null, fileName);
  },
});
const upload = multer({ storage });

const postJobRouter = express.Router();

// After /api/postJob
postJobRouter.post("/", upload.single("logo"), async (req, res) => {
  try {
    // Process the uploaded file
    let fileName = req.file.originalname.split(".");
    fileName[0] += "_abcd";
    fileName = fileName.join(".");
    let { data } = req.body;
    data = JSON.parse(data);
    const job = new Job(data);
    job.logo = fileName;
    await job.save();
    res.json("Success");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
});

export default postJobRouter;
