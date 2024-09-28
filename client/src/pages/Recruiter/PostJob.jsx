import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const { VITE_BACKEND_URL } = import.meta.env;
  const navigate = useNavigate();
  const [recruiterEmail, setRecruiterEmail] = useState(null);

  useEffect(() => {
    try {
      const recruiter = JSON.parse(localStorage.getItem("recruiter"));
      setRecruiterEmail(recruiter.email);
    } catch (err) {
      localStorage.removeItem("recruiter");
      navigate("/recruiter-login");
    }
  }, [recruiterEmail]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [responsibilities, setResponsibilities] = useState([""]);
  const [companyLogo, setCompanyLogo] = useState(null);
  const jobType = watch("type");

  const handleAddResponsibility = () => {
    setResponsibilities([...responsibilities, ""]);
  };

  const handleRemoveResponsibility = (index) => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities.splice(index, 1);
    setResponsibilities(newResponsibilities);
  };

  const handleChangeResponsibility = (index, value) => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities[index] = value;
    setResponsibilities(newResponsibilities);
  };

  const onSubmit = async (data) => {
    try {
      const skills = data.skills.split(",");
      const updatedData = {
        ...data,
        skills,
        responsibilities,
        recruiterEmail,
      };
      console.log(updatedData);
      const formData = new FormData();
      formData.append("logo", companyLogo);
      formData.append("data", JSON.stringify(updatedData));
      await axios.post(`${VITE_BACKEND_URL}/api/postJob`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      reset();
      setResponsibilities([""]);
      toast.success("Job Posted Successfully", {
        duration: 2000,
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      toast.error("Error posting Job", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <>
      <Navbar selectedTab="postJob" />
      <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
        <h2 className="text-lg font-bold mb-4">Post a Job</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="company"
            >
              Company Name
            </label>
            <input
              type="text"
              id="company"
              {...register("company", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.companyName && <div>{errors.companyName.message}</div>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              {...register("location", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.location && <div>{errors.location.message}</div>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Job Type
            </label>
            <select
              id="type"
              {...register("type", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Job Type</option>
              <option value="internship">Internship</option>
              <option value="fullTime">Full Time</option>
            </select>
            {errors.jobType && <div>{errors.jobType.message}</div>}
          </div>
          {jobType === "fullTime" ? (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="experience"
              >
                Experience (in years)
              </label>
              <input
                type="number"
                id="experience"
                {...register("experience", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.experience && <div>{errors.experience.message}</div>}
            </div>
          ) : jobType === "internship" ? (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="duration"
              >
                Duration (in months)
              </label>
              <input
                type="number"
                id="duration"
                {...register("duration", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.duration && <div>{errors.duration.message}</div>}
            </div>
          ) : null}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Job Category
            </label>
            <input
              type="text"
              id="category"
              {...register("category", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.jobCategory && <div>{errors.jobCategory.message}</div>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Job Description
            </label>
            <textarea
              id="description"
              {...register("description", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.jobDescription && (
              <div>{errors.jobDescription.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mode"
            >
              Mode of Work
            </label>
            <select
              id="mode"
              {...register("mode", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Mode of Work</option>
              <option value="Work from Home">Work from Home</option>
              <option value="In Office">In Office</option>
            </select>
            {errors.modeOfWork && <div>{errors.modeOfWork.message}</div>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Job Role
            </label>
            <input
              type="text"
              id="role"
              {...register("role", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.jobRole && <div>{errors.jobRole.message}</div>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="salary"
            >
              Salary / Stipend
            </label>
            <input
              type="number"
              id="salary"
              {...register("salary", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.salary && <div>{errors.salary.message}</div>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="jobDescription"
            >
              Skills
            </label>
            <input
              type="text"
              id="skills"
              {...register("skills", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.skills && <div>{errors.skills.message}</div>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="responsibilities"
            >
              Responsibilities
            </label>
            {responsibilities.map((responsibility, index) => (
              <div key={index}>
                <input
                  required
                  type="text"
                  value={responsibility}
                  onChange={(e) =>
                    handleChangeResponsibility(index, e.target.value)
                  }
                  className="shadow appearance-none border rounded w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                  type="button"
                  className=" bg-red-500 hover:bg-red-700 text-white font-bold my-1 p-1 rounded"
                  onClick={() => handleRemoveResponsibility(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
              onClick={handleAddResponsibility}
            >
              Add Responsibility
            </button>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="openings"
            >
              Job Openings
            </label>
            <input
              type="number"
              id="openings"
              {...register("openings", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.openings && <div>{errors.openings.message}</div>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="companyLogo"
            >
              Company Logo
            </label>
            <input
              type="file"
              id="logo"
              name="logo"
              accept=".jpg, .png, .jpeg"
              className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              onChange={(e) => setCompanyLogo(e.target.files[0])}
            />
            {errors.companyLogo && <div>{errors.companyLogo.message}</div>}
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Post Job"}
          </button>
        </form>
      </div>
    </>
  );
};

export default PostJob;

// import React, { useRef, useState } from "react";
// import Navbar from "../../components/Navbar";
// import { myJobs } from "../../constants";

// const PostJob = () => {
//   const companyNameRef = useRef(null);
//   const modeOfWorkRef = useRef(null);
//   const jobRoleRef = useRef(null); // Sde 2, Swe etc
//   const salaryRef = useRef(null);
//   const [responsibilities, setResponsibilities] = useState([]);
//   const [skills, setSkills] = useState([]);
//   const experienceRef = useRef(null);
//   const locationRef = useRef(null);
//   const durationRef = useRef(null);
//   const [jobType, setJobType] = useState(""); // fullTime / internship
//   const [companyLogo, setCompanyLogo] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const jobCategory = useRef(null);
//   const jobDescription = useRef(null);
//   const jobOpenings = useRef(null);

//   const addResponsibility = () => {
//     setResponsibilities((prev) => [...prev, ""]);
//   };

//   const removeResponsibility = (index) => {
//     setResponsibilities((prevResponsibilities) =>
//       prevResponsibilities.filter((_, i) => i !== index)
//     );
//   };

//   const updateResponsibility = (index, value) => {
//     setResponsibilities((prevResponsibilities) =>
//       prevResponsibilities.map((responsibility, i) =>
//         i === index ? value : responsibility
//       )
//     );
//   };

//   const addSkill = () => {
//     setSkills((prevSkills) => [...prevSkills, ""]);
//   };

//   const removeSkill = (index) => {
//     setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
//   };

//   const updateSkill = (index, value) => {
//     setSkills((prevSkills) =>
//       prevSkills.map((skill, i) => (i === index ? value : skill))
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const companyName = companyNameRef.current.value;
//     const jobRole = jobRoleRef.current.value;
//     const sal = Number(salaryRef.current.value);
//     const expirience = experienceRef.current?.value;
//     const location = locationRef.current.value;
//     const duration = Number(durationRef.current?.value);
//     const category = jobCategory?.current.value;
//     const description = jobDescription?.current.value;
//     const openings = Number(jobOpenings?.current.value);
//     // console.log(myJobs);

//     const newJob = {
//       datePosted: Date.now(),
//       company: companyName,
//       role: jobRole,
//       location,
//       salary: sal,
//       duration,
//       category,
//       responsibilities,
//       expirience,
//       openings,
//       description,
//       type: jobType === "fullTime" ? "Full Time" : "Internship",
//       skills,
//       logo: JSON.stringify(companyLogo),
//     };
//     // console.log(newJob);
//     fetch("http://localhost:3000/api/postJob", {
//       body: JSON.stringify(newJob),
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => {
//         setSuccess(true);
//         // console.log(res);
//         // alert("Job posted Successfully");
//       })
//       .catch((err) => {
//         console.log(err);
//         setSuccess(false);
//         // alert("Failed to post the job");
//       });
//     // myJobs.push(newJob);

//     // Set everything to default after submission
//     // if (success) {
//     //   companyNameRef?.current.value = null;
//     //   modeOfWorkRef?.current.value = null;
//     //   jobRoleRef?.current.value = null;
//     //   salaryRef?.current.value = null;
//     //   setResponsibilities([]);
//     //   experienceRef?.current.value = null;
//     //   setSkills([]);
//     //   locationRef?.current.value = null;
//     //   experienceRef?.current.value = null;
//     //   durationRef?.current.value = null;
//     //   jobCategory?.current.value = null;
//     //   jobDescription?.current.value = null;
//     //   jobOpenings?.current.value = null;
//     // }
//   };

//   return (
//     <>
//       <Navbar selectedTab={"postJob"} />
//       <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
//         <h2 className="text-lg font-bold mb-4">Post a Job</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="companyName"
//             >
//               Company Name
//             </label>
//             <input
//               type="text"
//               id="companyName"
//               ref={companyNameRef}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="location"
//             >
//               Location
//             </label>
//             <input
//               type="text"
//               id="location"
//               ref={locationRef}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="jobType"
//             >
//               Job Type
//             </label>
//             <select
//               id="jobType"
//               value={jobType}
//               onChange={(e) => setJobType(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             >
//               <option>Select Job Type</option>
//               <option value="internship">Internship</option>
//               <option value="fullTime">Full Time</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="jobCategory"
//             >
//               Job Category
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               ref={jobCategory}
//               type="text"
//               id="jobCategory"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="jobDescription"
//             >
//               Job Description
//             </label>
//             <textarea
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               ref={jobDescription}
//               id="jobDescription"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="modeOfWork"
//             >
//               Mode of Work
//             </label>
//             <select
//               id="modeOfWork"
//               ref={modeOfWorkRef}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             >
//               <option value="">Select Mode of Work</option>
//               <option value="Work from Home">Work from Home</option>
//               <option value="Part Time">In Office</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="jobRole"
//             >
//               Job Role
//             </label>
//             <input
//               type="text"
//               id="jobRole"
//               ref={jobRoleRef}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="salary"
//             >
//               Salary / Stipend
//             </label>
//             <input
//               type="number"
//               id="salary"
//               ref={salaryRef}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="jobOpenings"
//             >
//               Job Openings
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               ref={jobOpenings}
//               type="number"
//               id="jobOpenings"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="responsibilities"
//             >
//               Responsibilities
//             </label>
//             {responsibilities.map((responsibility, index) => (
//               <div key={index}>
//                 <input
//                   type="text"
//                   value={responsibility}
//                   onChange={(e) => updateResponsibility(index, e.target.value)}
//                   className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeResponsibility(index)}
//                   className="bg-red-400 hover:bg-red-500 text-white my-2 py-1 px-3 rounded"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addResponsibility}
//               className="bg-green-400 hover:bg-green-600 text-white py-1 px-3 rounded"
//             >
//               Add Responsibility
//             </button>
//           </div>
//           {jobType === "fullTime" ? (
//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 text-sm font-bold mb-2"
//                 htmlFor="experience"
//               >
//                 Experience (in years)
//               </label>
//               <input
//                 type="number"
//                 id="experience"
//                 ref={experienceRef}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div>
//           ) : (
//             jobType === "internship" && (
//               <div className="mb-4">
//                 <label
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                   htmlFor="duration"
//                 >
//                   Duration (in months)
//                 </label>
//                 <input
//                   type="number"
//                   id="duration"
//                   ref={durationRef}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 />
//               </div>
//             )
//           )}
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="skillsRequired"
//             >
//               Skills Required
//             </label>
//             {skills.map((skill, index) => (
//               <div key={index}>
//                 <input
//                   type="text"
//                   value={skill}
//                   onChange={(e) => updateSkill(index, e.target.value)}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeSkill(index)}
//                   className="bg-red-400 hover:bg-red-500 text-white my-2 py-1 px-3 rounded"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addSkill}
//               className="bg-green-400 hover:bg-green-500 text-white py-1 px-3 rounded"
//             >
//               Add Skill
//             </button>
//           </div>
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <span>Company Logo -:</span>
//             </div>
//             <div>
//               <input
//                 type="file"
//                 accept=".jpg, .jpeg, .png"
//                 className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
//                 onChange={(e) => setCompanyLogo(e.target.files[0])}
//               />
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Post Job
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };
// export default PostJob;
