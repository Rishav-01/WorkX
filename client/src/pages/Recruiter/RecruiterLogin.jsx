import React, { useContext, useRef, useState } from "react";
import { workXLogo } from "../../constants";
import { RecruiterContext } from "../../context/RecruiterContext";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const RecruiterLogin = () => {
  const navigate = useNavigate();
  const { recruiter, setRecruiter } = useContext(RecruiterContext);
  const [error, setError] = useState(false);
  if (recruiter) navigate("/recruiter");
  const name = useRef();
  const email = useRef();
  const password = useRef();

  const handleLogin = () => {
    const nameValue = name.current.value;
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const recruiterValues = {
          username: nameValue,
          email: emailValue,
          id: user.uid,
        };
        localStorage.setItem("recruiter", JSON.stringify(recruiterValues));
        setRecruiter(recruiterValues);
        navigate("/recruiter");
      })
      .catch((error) => setError(error));
  };

  return (
    <section>
      {error && alert(error)}
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <img src={workXLogo} alt="WorkX Logo" className="h-11 w-10" />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Login as Recruiter
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Don't have an account ?{" "}
            <Link
              to={"/recruiter-signup"}
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign Up
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
                  onClick={handleLogin}
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          {/* <div className="mt-3 space-y-3">
              <button
                onClick={handleLoginWithGoogle}
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </span>
                Login with Google
              </button>
            </div> */}
        </div>
      </div>
    </section>
  );
};

export default RecruiterLogin;
