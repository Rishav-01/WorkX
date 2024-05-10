import Cards from "./courses/Cards";
import Internships from "./internships/Internships";
import Jobs from "./jobs/Jobs";

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

      {/* Internship Cards */}
      <Internships />

      {/* Jobs Cards  */}
      <Jobs />
    </section>
  );
};

export default Hero;
