import express from "express";
import Job from "../../models/Job.js";

const getApplicantsRouter = express.Router();

// After /api/applicants

getApplicantsRouter.get("/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    console.log(jobId);
    res.send(jobId);
    // const job = await Job.findById(jobId);
    // console.log(job);
    // res.json(job.applicants);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error fetching applicants");
  }
});

export default getApplicantsRouter;
