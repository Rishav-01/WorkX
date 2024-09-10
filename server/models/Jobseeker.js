import mongoose from "mongoose";

const JobseekerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    appliedInternships: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    experience: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Jobseeker", JobseekerSchema);
