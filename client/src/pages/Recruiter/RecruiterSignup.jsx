import React, { useContext, useRef, useState } from "react";
import { workXLogo } from "../../constants";
import { RecruiterContext } from "../../context/RecruiterContext";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const RecruiterSignup = () => {
  const navigate = useNavigate();
  const { recruiter, setRecruiter } = useContext(RecruiterContext);
  const [error, setError] = useState(false);
  if (recruiter) navigate("/recruiter");

  const name = useRef();
  const email = useRef();
  const password = useRef();

  const handleRegister = () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const nameValue = name.current.value;

    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        const user = userCredential.user;
        const recruiterValues = {
          id: user.uid,
          name: nameValue,
          email: emailValue,
        };
        localStorage.setItem("recruiter", JSON.stringify(recruiterValues));
        setRecruiter(recruiterValues);
        navigate("/recruiter");
      })
      .catch((error) => setError(error.message));
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <img src={workXLogo} alt="WorkX Logo" className="h-11 w-10" />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Signup as Recruiter
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account ?{" "}
            <Link
              to={"/recruiter-login"}
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Log in
            </Link>
          </p>
          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Full Name{" "}
                </label>
                <div className="mt-2">
                  <input
                    ref={name}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    id="name"
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    ref={email}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    ref={password}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                  ></input>
                </div>
              </div>
              <div>
                <button
                  onClick={handleRegister}
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RecruiterSignup;
