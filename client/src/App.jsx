import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recruiter from "./pages/Recruiter";
import RecruiterLogin from "./pages/RecruiterLogin";
import RecruiterSignup from "./pages/RecruiterSignup";
import Internships from "./pages/Internships";
import Jobs from "./pages/Jobs";
import InternshipDetails from "./pages/InternshipDetails";
import JobDetails from "./pages/JobDetails";
import JobSeekerProtector from "./components/ProtectedRoutes/JobSeekerProtector";
import MyApplications from "./pages/MyApplications";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
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

        <Route path="/" element={<Home />} />
        <Route path="/recruiter" element={<Recruiter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recruiter-login" element={<RecruiterLogin />} />
        <Route path="/recruiter-signup" element={<RecruiterSignup />} />
      </Routes>
    </BrowserRouter>
  );
}
