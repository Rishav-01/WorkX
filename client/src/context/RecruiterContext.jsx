import { createContext, useEffect, useState } from "react";

export const RecruiterContext = createContext({
  recruiter: null,
  setRecruiter: (newRecruiter) => {},
});

export const RecruiterContextProvider = ({ children }) => {
  const [recruiter, setRecruiter] = useState(null);

  const getRecruiter = () => {
    const storedRecruiter = localStorage.getItem("recruiter");
    if (storedRecruiter) {
      setRecruiter(JSON.parse(storedRecruiter));
    } else setRecruiter(null);
  };

  useEffect(() => {
    getRecruiter();
  }, []);

  return (
    <RecruiterContext.Provider value={{ recruiter, setRecruiter }}>
      {children}
    </RecruiterContext.Provider>
  );
};
