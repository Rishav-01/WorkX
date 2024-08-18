import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recruiter from "./pages/Recruiter";
import RecruiterLogin from "./pages/RecruiterLogin";
import RecruiterSignup from "./pages/RecruiterSignup";
import User from "./pages/User";
import Internships from "./pages/Internships";
import Jobs from "./pages/Jobs";
import InternshipDetails from "./pages/InternshipDetails";
import JobDetails from "./pages/JobDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recruiter" element={<Recruiter />} />
        <Route path="/recruiter-login" element={<RecruiterLogin />} />
        <Route path="/recruiter-signup" element={<RecruiterSignup />} />
        <Route path="/internships" element={<Internships />} />
        <Route
          path="/internships/internshipDetails/:id"
          element={<InternshipDetails />}
        />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/jobDetails/:id" element={<JobDetails />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}
