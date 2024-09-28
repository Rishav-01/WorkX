import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../../hooks/useMediaQuery";

const MyApplications = () => {
  const { VITE_BACKEND_URL } = import.meta.env;
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");

  const getApplications = async () => {
    try {
      const res = await axios.get(
        `${VITE_BACKEND_URL}/api/jobSeeker/applications/${userId}`
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
    <div className="flex flex-col h-screen">
      <Navbar />
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        </div>
      ) : isAboveSmallScreens ? (
        <main className="flex-1 container mx-auto p-4">
          {applications.length === 0 ? (
            <span className="text-base mx-auto my-auto">
              No Applications currently
            </span>
          ) : (
            <section className="my-2">
              <h1 className="text-3xl font-bold text-center mb-5">
                My Applications
              </h1>
              <div className="grid md:text-lg text-base md:max-w-[85%] md:mx-auto md:gap-x-4 grid-cols-5 gap-x-2 mb-4">
                <div className="bg-gray-200 text-center p-1 rounded-md">
                  <span className="font-bold text-sm">Company Name</span>
                </div>
                <div className="bg-gray-200 text-center rounded-md">
                  <span className="font-bold">Category</span>
                </div>
                <div className="bg-gray-200 text-center p-1 rounded-md">
                  <span className="font-bold">Type</span>
                </div>
                <div className="bg-gray-200 text-center p-1 rounded-md">
                  <span className="font-bold">Applied On</span>
                </div>
                <div className="bg-gray-200 text-center p-1 rounded-md">
                  <span className="font-bold">Application Status</span>
                </div>
              </div>

              {applications.map((application, idx) => (
                <div
                  key={idx}
                  className="md:max-w-[85%] md:mx-auto md:gap-x-4 grid grid-cols-5 bg-blue-50 gap-x-3 mb-4 shadow-md rounded-md p-2"
                >
                  <div className="text-base md:text-lg text-center my-auto">
                    {application.jobId.company}
                  </div>
                  <div className="text-base md:text-lg text-center my-auto">
                    {application.jobId.category}
                  </div>
                  <div className="text-base md:text-lg text-center my-auto">
                    {application.jobId.type === "internship"
                      ? "Internship"
                      : "Full Time"}
                  </div>
                  <div className="text-base md:text-lg text-center my-auto">
                    {application.createdAt.slice(0, 10)}
                  </div>
                  <div
                    className={`text-base md:text-lg my-auto text-center text-white px-2 py-1 rounded-md ${
                      application.status === "Accepted"
                        ? "bg-green-400 "
                        : application.status === "Rejected"
                        ? "bg-red-400"
                        : "bg-yellow-400 "
                    }`}
                  >
                    {application.status}
                  </div>
                </div>
              ))}
            </section>
          )}
        </main>
      ) : (
        <main>
          {applications.length === 0 ? (
            <span className="text-base mx-auto my-auto">
              No Applications currently
            </span>
          ) : (
            <main>
              <h1 className="text-3xl font-bold text-center my-5">
                My Applications
              </h1>
              <section className="shadow-md p-2 bg-blue-100">
                {applications.map((application, idx) => (
                  <div key={idx} className="md:max-w-[85%] md:mx-auto">
                    <div className="text-base flex gap-2 my-1 items-center justify-center md:text-lg">
                      <span className="font-bold">Company Name - </span>
                      <span className="text-base">
                        {application.jobId.company}
                      </span>
                    </div>
                    <div className="text-base md:text-lg my-1 flex gap-2 items-center justify-center">
                      <span className="font-bold">Category - </span>
                      <span className="text-base">
                        {application.jobId.category}
                      </span>
                    </div>
                    <div className="text-base md:text-lg my-1 flex gap-2 items-center justify-center">
                      <span className="font-bold">Type - </span>
                      <span className="text-base">
                        {application.jobId.type === "internship"
                          ? "Internship"
                          : "Full Time"}
                      </span>
                    </div>
                    <div className="text-base md:text-lg my-1 flex gap-2 items-center justify-center">
                      <span className="font-bold">Date Posted - </span>
                      <span className="text-base">
                        {application.createdAt.slice(0, 10)}
                      </span>
                    </div>
                    <div
                      className={`text-base md:text-lg w-fit my-1 mx-auto text-white px-2 py-1 rounded-md ${
                        application.status === "Accepted"
                          ? "bg-green-400 "
                          : application.status === "Rejected"
                          ? "bg-red-400"
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
        </main>
      )}
      <Footer />
    </div>
  );
};

export default MyApplications;
