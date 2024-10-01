import { useContext, useEffect, useState } from "react";
import { RecruiterContext } from "../../context/RecruiterContext";
import { Navigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";

export const RecruiterProtector = () => {
  const { recruiter, setRecruiter } = useContext(RecruiterContext);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const storedRecruiter = localStorage.getItem("recruiter");
    if (storedRecruiter) setRecruiter(JSON.parse(storedRecruiter));
    else setRecruiter(null);
    setInitialized(true);
  }, []);

  if (!initialized) {
    return (
      <div className="flex mt-72 justify-center gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    );
  }

  return recruiter ? (
    <Outlet />
  ) : (
    <>
      {toast.error("Login Please !", { duration: 200 })}
      <Navigate to={"/"} />
    </>
  );
};
