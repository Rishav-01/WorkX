import InternshipCard from "./InternshipCard";
import useMediaQuery from "../../hooks/useMediaQuery";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { internshipsData } from "../../constants";

const InternshipCards = ({ category }) => {
  const filteredInternships = internshipsData.filter((item) => {
    return item.category === category;
  });

  const slideLeft = () => {
    let slider = document.getElementById("interncard");
    slider.scrollLeft -= 350;
  };
  const slideRight = () => {
    let slider = document.getElementById("interncard");
    slider.scrollLeft += 350;
  };
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        {/* Slider  */}
        <div className="flex items-center justify-center relative">
          <div
            id="interncard"
            className={`flex gap-2 ${
              isAboveSmallScreens ? "max-w-[1000px]" : "max-w-md"
            } h-full overflow-hidden whitespace-nowrap scroll-smooth`}
          >
            {filteredInternships.length === 0 ? (
              <p className="h-32 text-base w-full text-center">
                No internships available for {category} !
              </p>
            ) : (
              filteredInternships.map((item) => (
                <InternshipCard
                  title={item.title}
                  company={item.company}
                  location={item.location}
                  salary={item.salary}
                  duration={item.duration}
                />
              ))
            )}
          </div>
        </div>

        {/* Buttons  */}
        {filteredInternships.length > 0 && (
          <div className="flex gap-2">
            <button onClick={slideLeft}>
              <CiCircleChevLeft
                className="opacity-50 hover:opacity-100"
                size={35}
              />
            </button>
            <button onClick={slideRight}>
              <CiCircleChevRight
                className="opacity-50 hover:opacity-100"
                size={35}
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default InternshipCards;
