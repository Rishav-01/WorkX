import React, { useContext, useEffect, useState } from "react";
import { JobSeekerContext } from "../../context/JobSeekerContext";
import { Navigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";

const JobSeekerProtector = () => {
  const { jobSeeker, setJobSeeker } = useContext(JobSeekerContext);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const storedJobSeeker = localStorage.getItem("jobSeeker");
    if (storedJobSeeker) {
      setJobSeeker(JSON.parse(storedJobSeeker));
    } else setJobSeeker(null);
    setInitialized(true);
  }, []);

  if (!initialized)
    return (
      <div className="flex mt-72 justify-center gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    );

  return jobSeeker ? (
    <Outlet />
  ) : (
    <>
      {toast.error("Please Login !", { duration: 2000 })}
      <Navigate to={"/"} />
    </>
  );
};

export default JobSeekerProtector;
