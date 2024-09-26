import express from "express";
import Application from "../../models/Application.js";

const getApplicationsRouter = express.Router();

// After /api/jobSeeker/applications

getApplicationsRouter.get("/:jobSeekerId", async (req, res) => {
  try {
    const { jobSeekerId } = req.params;
    const applications = await Application.find({
      userId: jobSeekerId,
    }).populate("jobId");
    res.send(applications);
  } catch (error) {
    res.status(500).send("Error fetching applications");
    console.log(error);
  }
});

export default getApplicationsRouter;
