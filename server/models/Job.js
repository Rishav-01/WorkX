import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  datePosted: { type: Date, required: true },
  internship: { type: Boolean, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  duration: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  applicants: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobseeker",
        required: true,
      },
      isAccepted: { type: Boolean, required: true },
      resume: { type: Buffer, required: true },
    },
  ],
  aboutCompany: { type: String, required: true },
  description: { type: String, required: true },
  responsibilities: [{ type: String, required: true }],
  skillsRequired: [{ type: String, required: true }],
  openings: { type: Number, required: true },
});

export default mongoose.model("Job", jobSchema);
