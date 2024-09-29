import express from "express";
import multer from "multer";
import Application from "../../models/Application.js";
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

const applyRouter = express.Router();

// All are after /api/apply

applyRouter.post("/internship", upload.single("resume"), async (req, res) => {
  try {
    let fileName = req.file.originalname.split(".");
    fileName[0] += "_abcd";
    fileName = fileName.join(".");
    const resume = fileName;
    const { userId, jobId, coverLetter, availability, name, email } =
      JSON.parse(req.body.data);
    // Find the required internship by jobId
    const job = await Job.findById(jobId);
    // Check if the job exists
    if (!job) {
      return res.status(404).send("Job not found");
    }
    const newApplication = new Application({
      userId,
      jobId,
      resume,
      coverLetter,
      availability,
      name,
      email,
    });

    // First check whether the user already applied on this job or not
    const existingApplication = await Application.findOne({
      userId,
      jobId,
    });
    if (existingApplication) {
      return res.status(400).send("You already applied for this job");
    }
    // If the user is not already applied, then save the application
    await newApplication.save();

    // Now to this job, add the new application id into its applicants field and update the database
    job.applicants.push(newApplication._id);
    await job.save();

    res.status(201).json(newApplication);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error occurred");
  }
});

applyRouter.post("/job", upload.single("resume"), async (req, res) => {
  try {
    const resume = req.file.originalname;
    const { userId, jobId, coverLetter, yearsOfExperience, name, email } =
      JSON.parse(req.body.data);
    // Find the required Job by jobId
    const job = await Job.findById(jobId);
    // Check if the job exists
    if (!job) {
      return res.status(404).send("Job not found");
    }
    const newApplication = new Application({
      userId,
      jobId,
      resume,
      coverLetter,
      yearsOfExperience,
      name,
      email,
    });

    // Check whether user has already applied in this job
    const existingApplication = await Application.findOne({ userId, jobId });
    if (existingApplication) {
      return res.status(400).send("You already applied for this job");
    }

    // If not applied, then save the application
    await newApplication.save();

    // Now add this applicationId to the job.applicants
    job.applicants.push(newApplication._id);
    await job.save();
    res.json(newApplication);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

export default applyRouter;
