import express from "express";
import multer from "multer";
import Application from "../models/Application.js";

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

const applyRouter = express.Router();

// All are after /api/apply

applyRouter.post("/internship", upload.single("resume"), async (req, res) => {
  res.json(req.file);
  try {
    const {
      user,
      company,
      resume,
      coverLetter,
      yearsOfExperience,
      availability,
    } = req.body;
    const newApplication = new Application({
      user,
      company,
      resume,
      coverLetter,
      yearsOfExperience,
      availability,
    });
    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (error) {
    console.log(error);
  }
});

applyRouter.post("/job", upload.single("resume"), async (req, res) => {
  try {
    const { user, company, resume, coverLetter, yearsOfExperience } = req.body;
    const newApplication = new Application({
      user,
      company,
      resume,
      coverLetter,
      yearsOfExperience,
    });
    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (error) {
    console.log(error);
  }
});

export default applyRouter;
