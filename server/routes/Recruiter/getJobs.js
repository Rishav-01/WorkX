import express from "express";
import Job from "../../models/Job.js";

// After /api/getJobs

const getJobsRouter = express.Router();

// getJobs by recruiter's email
getJobsRouter.post("/", async (req, res) => {
  try {
    const { recruiterEmail } = req.body; // recruiter's email through the request from frontend
    // console.log(recruiterEmail);
    const allJobs = await Job.find({ recruiterEmail }).exec();
    // console.log(allJobs);
    res.send(allJobs);
  } catch (error) {
    console.log(error);
    res.status(400).send("Some Error occurred");
  }
});

// get job by an id
getJobsRouter.get("/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate("applicants");
    if (!job) {
      return res.status(404).send("Job not found");
    }
    res.send(job);
  } catch (error) {
    console.log(error);
    res.status(400).send("Some error occurred");
  }
});

export default getJobsRouter;
