import express from "express";
import Job from "../../models/Job.js";
import Application from "../../models/Application.js";

const getAllJobsRouter = express.Router();

// After /api/jobSeeker/

// Get all internships for jobSeekers
getAllJobsRouter.get("/internships", async (req, res) => {
  try {
    const allInternships = await Job.find({
      type: "internship",
      status: "Pending",
    });
    res.json(allInternships);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error fetching internships");
  }
});

// Get all jobs for jobSeekers
getAllJobsRouter.get("/jobs", async (req, res) => {
  try {
    const allJobs = await Job.find({
      type: "fullTime",
      status: "Pending",
    }).exec();
    res.json(allJobs);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error fetching jobs");
  }
});

// Get jobs / internships for a particular user
getAllJobsRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const appliedJobs = await Application.find({ userId });

    // Now push all jobId from appliedJobs in an array and send it
    const jobIds = appliedJobs.map((job) => job.jobId);
    res.send(jobIds);
  } catch (error) {
    res.status(400).send("Error");
  }
});

export default getAllJobsRouter;
