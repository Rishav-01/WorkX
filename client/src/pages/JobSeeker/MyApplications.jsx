import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyApplications = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getApplications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/jobSeeker/applications/${userId}`
      );
      setIsLoading(false);
      return res.data;
    } catch (error) {
      toast.error("Error Fetching applications", {
        duration: 2000,
        position: "top-center",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      const jobSeeker = JSON.parse(localStorage.getItem("jobSeeker"));
      if (!jobSeeker || !jobSeeker.id) {
        localStorage.removeItem("jobSeeker");
        navigate("/login");
      }
      setUserId(jobSeeker.id);
      getApplications().then((res) => {
        setApplications(res);
      });
    } catch (error) {
      localStorage.removeItem("jobSeeker");
      navigate("/login");
    }
  }, [userId, setUserId, applications, setApplications]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        </div>
      ) : (
        <main className="flex-1 container mx-auto p-4">
          <section className="my-2">
            <h1 className="text-3xl font-bold text-center mb-5">
              My Applications
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-4">
              <div className="bg-gray-200 p-2 text-center rounded-md">
                <span className="font-bold">Company Name</span>
              </div>
              <div className="bg-gray-200 p-2 text-center rounded-md">
                <span className="font-bold">Category</span>
              </div>
              <div className="bg-gray-200 p-2 text-center rounded-md">
                <span className="font-bold">Type</span>
              </div>
              <div className="bg-gray-200 p-2 text-center rounded-md">
                <span className="font-bold">Applied On</span>
              </div>
              <div className="bg-gray-200 p-2 text-center rounded-md">
                <span className="font-bold">Application Status</span>
              </div>
            </div>

            {applications.map((application, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-4 bg-white shadow-md rounded-md p-4"
              >
                <div className="text-lg text-center">
                  {application.jobId.company}
                </div>
                <div className="text-lg text-center">
                  {application.jobId.category}
                </div>
                <div className="text-lg text-center">
                  {application.jobId.type === "internship"
                    ? "Internship"
                    : "Full Time"}
                </div>
                <div className="text-lg text-center">
                  {application.createdAt.slice(0, 10)}
                </div>
                <div
                  className={`text-lg text-center text-white px-2 py-1 rounded-md ${
                    application.status === "Accepted"
                      ? "bg-green-400 "
                      : application.status === "Rejected"
                      ? "bg-red-400 "
                      : "bg-yellow-400 "
                  }`}
                >
                  {application.status}
                </div>
              </div>
            ))}
          </section>
        </main>
      )}

      <Footer />
    </div>
  );
};

export default MyApplications;
