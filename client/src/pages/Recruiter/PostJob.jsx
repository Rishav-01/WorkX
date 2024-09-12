import React, { useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { myJobs } from "../../constants";

const PostJob = () => {
  const companyNameRef = useRef(null);
  const modeOfWorkRef = useRef(null);
  const jobRoleRef = useRef(null);
  const salaryRef = useRef(null);
  const [responsibilities, setResponsibilities] = useState([]);
  const [skills, setSkills] = useState([]);
  const experienceRef = useRef(null);
  const locationRef = useRef(null);
  const durationRef = useRef(null);
  const [jobType, setJobType] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);

  const addResponsibility = () => {
    setResponsibilities((prev) => [...prev, ""]);
  };

  const removeResponsibility = (index) => {
    setResponsibilities((prevResponsibilities) =>
      prevResponsibilities.filter((_, i) => i !== index)
    );
  };

  const updateResponsibility = (index, value) => {
    setResponsibilities((prevResponsibilities) =>
      prevResponsibilities.map((responsibility, i) =>
        i === index ? value : responsibility
      )
    );
  };

  const addSkill = () => {
    setSkills((prevSkills) => [...prevSkills, ""]);
  };

  const removeSkill = (index) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };

  const updateSkill = (index, value) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill, i) => (i === index ? value : skill))
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(responsibilities, skills);

    const companyName = companyNameRef.current.value;
    const jobRole = jobRoleRef.current.value;
    const sal = salaryRef.current.value;
    // const responsibilities = responsibilitiesRef.current.value;
    const expirience = experienceRef.current?.value;
    // const skills = skillsRequiredRef.current.value;
    const location = locationRef.current.value;
    const duration = durationRef.current?.value;
    console.log(myJobs);

    const newJob = {
      id: 4,
      company: companyName,
      datePosted: Date.now(),
      internship: jobType === "internship",
      fullTime: jobType === "fullTime",
      role: jobRole,
      location,
      salary: sal,
      duration,
      responsibilities,
      expirience,
      type: jobType === "fullTime" ? "Full Time" : "Internship",
      skills,
    };
    myJobs.push(newJob);

    companyNameRef.current.value = null;
    modeOfWorkRef.current.value = null;
    jobRoleRef.current.value = null;
    salaryRef.current.value = null;
    setResponsibilities([]);
    experienceRef.current.value = null;
    setSkills([]);
    locationRef.current.value = null;
    experienceRef.current.value = null;
    durationRef.current.value = null;
  };

  return (
    <>
      <Navbar selectedTab={"postJob"} />
      <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
        <h2 className="text-lg font-bold mb-4">Post a Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="companyName"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              ref={companyNameRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
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
              ref={locationRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="jobType"
            >
              Job Type
            </label>
            <select
              id="jobType"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>Select Job Type</option>
              <option value="internship">Internship</option>
              <option value="fullTime">Full Time</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="modeOfWork"
            >
              Mode of Work
            </label>
            <select
              id="modeOfWork"
              ref={modeOfWorkRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Mode of Work</option>
              <option value="Work from Home">Work from Home</option>
              <option value="Part Time">In Office</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="jobRole"
            >
              Job Role
            </label>
            <input
              type="text"
              id="jobRole"
              ref={jobRoleRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
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
              ref={salaryRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
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
                  type="text"
                  value={responsibility}
                  onChange={(e) => updateResponsibility(index, e.target.value)}
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                  type="button"
                  onClick={() => removeResponsibility(index)}
                  className="bg-red-400 hover:bg-red-500 text-white my-2 py-1 px-3 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addResponsibility}
              className="bg-green-400 hover:bg-green-600 text-white py-1 px-3 rounded"
            >
              Add Responsibility
            </button>
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
                ref={experienceRef}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ) : (
            jobType === "internship" && (
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
                  ref={durationRef}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            )
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="skillsRequired"
            >
              Skills Required
            </label>
            {skills.map((skill, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="bg-red-400 hover:bg-red-500 text-white my-2 py-1 px-3 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSkill}
              className="bg-green-400 hover:bg-green-500 text-white py-1 px-3 rounded"
            >
              Add Skill
            </button>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span>Company Logo -:</span>
            </div>
            <div>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                onChange={(e) => setCompanyLogo(e.target.files[0])}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Post Job
          </button>
        </form>
      </div>
    </>
  );
};
export default PostJob;
