import mongoose from "mongoose";

const JobseekerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    resume: {
      type: Buffer,
      contentType: String,
      required: true,
    },
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "AllJobs" }],
    appliedInternships: [
      { type: mongoose.Schema.Types.ObjectId, ref: "AllJobs" },
    ],
    experience: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Jobseeker", JobseekerSchema);
