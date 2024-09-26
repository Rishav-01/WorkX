import express from "express";
import Application from "../../models/Application.js";
import Job from "../../models/Job.js";

const actionRouter = express.Router();

// After /api/recruiter/action
actionRouter.post("/accept", async (req, res) => {
  try {
    const { applicationId, jobId } = req.body;
    const application = await Application.findById(applicationId);
    const job = await Job.findById(jobId);
    if (!application || !job)
      return res.status(404).send("Application not found");

    if (job.openings === 0) return res.status(500).send("No openings left");
    else if (job.openings === 1) job.status = "Closed";
    application.status = "Accepted";
    const newApplicants = job.applicants.filter((id) => id != applicationId);
    job.applicants = newApplicants;
    job.openings--;
    await application.save();
    await job.save();

    res.send("Action performed successfully");
  } catch (error) {
    res.status(500).send("Error occurred while performing action");
  }
});

actionRouter.post("/reject", async (req, res) => {
  try {
    const { applicationId, jobId } = req.body;
    const application = await Application.findById(applicationId);
    const job = await Job.findById(jobId);

    if (!application || !job)
      return res.status(404).send("Application not found");

    application.status = "Rejected";
    const newApplicants = job.applicants.filter((id) => id != applicationId);
    job.applicants = newApplicants;
    await application.save();
    await job.save();
    res.send("Action performed successfully");
  } catch (error) {
    res.status(500).send("Error occurred while performing action");
  }
});

export default actionRouter;
