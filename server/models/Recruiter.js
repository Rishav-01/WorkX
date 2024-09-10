import mongoose from "mongoose";

const RecruiterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    companyName: { type: String, required: true },
    postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "AllJobs" }],
  },
  { timestamps: true }
);

export default mongoose.model("Recruiter", RecruiterSchema);
