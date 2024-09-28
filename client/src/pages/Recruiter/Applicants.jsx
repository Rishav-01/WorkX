import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
import { applicants } from "../../constants";
import { myJobs } from "../../constants";
import { toast } from "react-hot-toast";
import axios from "axios";

const Applicants = () => {
  const { VITE_BACKEND_URL } = import.meta.env;
  const [applicantsList, setApplicantsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState();
  let { jobId } = useParams();

  const getJob = async () => {
    try {
      const res = await axios.get(`${VITE_BACKEND_URL}/api/getJobs/${jobId}`);
      setApplicantsList(res.data.applicants);
      setJob(res.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching applicants", {
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    getJob();
  }, [job, setJob]);

  const handleAccept = async (applicant) => {
    console.log("Accept");
    // Add logic to handle accept functionality
    try {
      const obj = { applicationId: applicant._id, jobId };
      await axios.post(`${VITE_BACKEND_URL}/api/recruiter/action/accept`, obj);
      const remaining = applicantsList.filter(
        (item) => item._id !== applicant._id
      );
      setApplicantsList(remaining);
      toast.success("Applicant accepted", {
        duration: 2000,
      });
    } catch (error) {
      toast.error("Error accepting applicant", {
        duration: 2000,
      });
    }
  };

  const handleReject = async (applicant) => {
    console.log("Reject");
    // Add logic to handle reject functionality
    try {
      const obj = { applicationId: applicant._id, jobId };
      await axios.post(`${VITE_BACKEND_URL}/api/recruiter/action/reject`, obj);
      const remaining = applicantsList.filter(
        (item) => item._id !== applicant._id
      );
      setApplicantsList(remaining);
      toast.success("Action Completed", { duration: 2000 });
    } catch (error) {
      toast.error("Error rejecting applicant", {
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        </div>
      ) : (
        <>
          <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
            {applicantsList.length > 0 ? (
              <>
                <h1 className="text-3xl mb-4 text-center">
                  Applicants for {job.role} at {job.company}
                </h1>
                <ul className="list-none mb-4">
                  {applicantsList.map((applicant, index) => (
                    <li
                      key={index}
                      className="bg-white shadow-md rounded p-4 mb-4"
                    >
                      <h2 className="text-lg font-bold">
                        Name : {applicant.name}
                      </h2>
                      <p className="text-gray-600">Email : {applicant.email}</p>
                      {!job.internship && (
                        <p className="text-gray-600">
                          Years of Experience : {applicant.yearsOfExperience}
                        </p>
                      )}
                      <p className="text-gray-600">
                        Resume :{" "}
                        <a
                          className="text-blue-500"
                          href={`${VITE_BACKEND_URL}/uploads/${applicant.resume}`}
                          target="_blank"
                        >
                          {applicant.resume}
                        </a>
                      </p>
                      <h3 className="text-lg font-bold mt-4">
                        Why we should hire you?
                      </h3>
                      <p>{applicant.coverLetter}</p>
                      <div className="flex justify-end mt-4">
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleAccept(applicant)}
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                          onClick={() => handleReject(applicant)}
                        >
                          Reject
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <h1 className="text-center text-xl">No Applicants currently</h1>
            )}
          </div>
        </>
      )}

      <Footer recruiter={true} />
    </div>
  );
};

export default Applicants;
