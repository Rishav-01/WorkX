import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  datePosted: { type: Date, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  duration: { type: Number, default: 0 },
  category: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, default: "Pending" },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
  description: { type: String, required: true },
  responsibilities: [{ type: String, required: true }],
  skills: [{ type: String, required: true }],
  openings: { type: Number, required: true },
  logo: { type: Buffer, required: true },
});

export default mongoose.model("Job", jobSchema);
