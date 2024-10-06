import InternshipCard from "./InternshipCard";
import useMediaQuery from "../../hooks/useMediaQuery";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

const InternshipCards = ({ category, allInternships }) => {
  const filteredInternships = allInternships.filter((item) => {
    return item.category === category || item.mode === category;
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
              isAboveSmallScreens ? "max-w-[1000px]" : "max-w-sm"
            } h-full overflow-hidden whitespace-nowrap scroll-smooth`}
          >
            {!category && <p className="text-base">Select a Category</p>}
            {category && filteredInternships.length === 0 ? (
              <p className="h-32 text-base text-center">
                No internships available for {category} !
              </p>
            ) : (
              filteredInternships.map((item) => (
                <InternshipCard
                  id={item._id}
                  key={item._id}
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
