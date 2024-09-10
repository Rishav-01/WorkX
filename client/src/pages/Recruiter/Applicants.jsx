import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
import { applicants } from "../../constants";
import { myJobs } from "../../constants";

const Applicants = () => {
  let { jobId } = useParams();
  jobId = Number(jobId);
  const job = myJobs.find((item) => item.id === jobId);
  console.log(job);

  const [jobApplicants, setJobApplicants] = useState([]);

  useEffect(() => {
    let applicantsList;
    if (job.internship) {
      applicantsList = applicants.filter((applicant) =>
        applicant.appliedForInternship.includes(jobId)
      );
    } else {
      applicantsList = applicants.filter((applicant) =>
        applicant.appliedForJob.includes(jobId)
      );
    }
    setJobApplicants(applicantsList);
  }, [jobId, job, applicants]);

  const handleAccept = (applicant) => {
    // Add logic to handle accept functionality
    const remaining = jobApplicants.filter((item) => item.id !== applicant.id);
    job.applicants.map((item) => {
      if (item.applicantId === applicant.id) item.isAccepted = true;
    });
    setJobApplicants(remaining);
  };

  const handleReject = (applicant) => {
    // Add logic to handle reject functionality
    const remaining = jobApplicants.filter((item) => item.id !== applicant.id);
    job.applicants.map((item) => {
      if (item.applicantId === applicant.id) item.isAccepted = false;
    });
    setJobApplicants(remaining);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        {jobApplicants.length > 0 ? (
          <>
            <h1 className="text-3xl mb-4 text-center">
              Applicants for {job.role} at {job.company}
            </h1>
            <ul className="list-none mb-4">
              {jobApplicants.map((applicant, index) => (
                <li key={index} className="bg-white shadow-md rounded p-4 mb-4">
                  <h2 className="text-lg font-bold">Name : {applicant.name}</h2>
                  <p className="text-gray-600">Email : {applicant.email}</p>
                  {!job.internship && (
                    <p className="text-gray-600">
                      Years of Expirience : {applicant.expirience}
                    </p>
                  )}
                  <p className="text-gray-600">Resume : {applicant.resume}</p>
                  <h3 className="text-lg font-bold mt-4">
                    Why we should hire you?
                  </h3>
                  <p>{applicant.answer}</p>
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
      <Footer recruiter={true} />
    </>
  );
};

export default Applicants;
