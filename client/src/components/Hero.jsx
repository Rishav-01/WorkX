import Cards from "./courses/Cards";
import JobCards from "./jobs/JobCards";

const Hero = () => {
  return (
    <section className="mt-10 text-2xl font-semibold">
      <div className="flex gap-4 flex-col text-center">
        <p>Hi, Jobseekers ! &#9996;</p>
        <p>Let's help you land your dream career !</p>
      </div>
      <p className="my-11 font-bold text-center">Trending on WorkX &#9889;</p>

      {/* Courses Component  */}
      <Cards />
      {/* Job & Internship Cards */}
      <h1 className="text-center my-10 font-semibold text-3xl">
        Latest Internships & Jobs on WorkX
      </h1>
      <JobCards />
    </section>
  );
};

export default Hero;
