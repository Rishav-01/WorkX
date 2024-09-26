import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    userId: String,
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    status: {
      type: String,
      default: "Pending",
    },
    resume: { type: String, required: true },
    coverLetter: String,
    yearsOfExperience: { type: Number, default: 0 },
    availability: String,
  },
  { timestamps: true }
);

export default mongoose.model("Application", ApplicationSchema);
