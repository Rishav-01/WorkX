import Home from "./pages//JobSeeker/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/JobSeeker/Login";
import Register from "./pages/JobSeeker/Register";
import Recruiter from "./pages/Recruiter/Recruiter";
import RecruiterLogin from "./pages/Recruiter/RecruiterLogin";
import RecruiterSignup from "./pages/Recruiter/RecruiterSignup";
import Internships from "./pages/JobSeeker/Internships";
import Jobs from "./pages/JobSeeker/Jobs";
import InternshipDetails from "./pages/JobSeeker/InternshipDetails";
import JobDetails from "./pages/JobSeeker/JobDetails";
import JobSeekerProtector from "./components/ProtectedRoutes/JobSeekerProtector";
import MyApplications from "./pages/JobSeeker/MyApplications";
import PostJob from "./pages/Recruiter/PostJob";
import PostedJobs from "./pages/Recruiter/PostedJobs";
import Applicants from "./pages/Recruiter/Applicants";
import { RecruiterProtector } from "./components/ProtectedRoutes/RecruiterProtector";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<JobSeekerProtector />}>
          <Route path="/internships" element={<Internships />} />
          <Route
            path="/internships/internshipDetails/:id"
            element={<InternshipDetails />}
          />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/jobDetails/:id" element={<JobDetails />} />
          <Route path="/user/:id/applications" element={<MyApplications />} />
        </Route>

        <Route element={<RecruiterProtector />}>
          <Route path="/recruiter" element={<Recruiter />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/my-jobs" element={<PostedJobs />} />
          <Route path="/my-jobs/:jobId/applicants" element={<Applicants />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recruiter-login" element={<RecruiterLogin />} />
        <Route path="/recruiter-signup" element={<RecruiterSignup />} />
      </Routes>
    </BrowserRouter>
  );
}
