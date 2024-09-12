import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  user: String,
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  status: {
    type: String,
    default: "Pending",
  },
  resume: { type: Buffer, required: true },
  coverLetter: String,
  yearsOfExperience: { type: Number, default: 0 },
  availability: String,
});

export default mongoose.model("Application", ApplicationSchema);
