import React, { createContext, useEffect, useState } from "react";

export const JobSeekerContext = createContext({
  jobSeeker: null,
  setJobSeeker: (newJobSeeker) => {},
});

export const JobSeekerContextProvider = ({ children }) => {
  const [jobSeeker, setJobSeeker] = useState(null);

  const getJobSeeker = () => {
    const storedJobSeeker = localStorage.getItem("jobSeeker");
    if (storedJobSeeker) {
      setJobSeeker(JSON.parse(storedJobSeeker));
    } else setJobSeeker(null);
  };

  useEffect(() => {
    getJobSeeker();
  }, []);

  return (
    <JobSeekerContext.Provider value={{ jobSeeker, setJobSeeker }}>
      {children}
    </JobSeekerContext.Provider>
  );
};
