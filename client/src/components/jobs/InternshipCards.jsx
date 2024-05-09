import InternshipCard from "./InternshipCard";
import useMediaQuery from "../../hooks/useMediaQuery";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

const InternshipCards = () => {
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
              isAboveSmallScreens && "w-[1000px]"
            } h-full overflow-hidden whitespace-nowrap scroll-smooth`}
          >
            <InternshipCard
              title="Actively hiring"
              company="Physics Wallah"
              location="Work From Home"
              salary="8,000-12,000 /month"
              duration="3 Months"
            />
            <InternshipCard
              title="Actively hiring"
              company="CollegeDekho.com"
              location="Gurgaon"
              salary="₹ 10,000 /month"
              duration="3 Months"
            />
            <InternshipCard
              title="Actively hiring"
              company="Internshala Trainings"
              location="Gurgaon"
              salary="₹ 18,000 /month"
              duration="6 Months"
            />
            <InternshipCard
              title="Actively hiring"
              company="More Retail Private Limited"
              location="Bangalore"
              salary="₹ 35,000 /month"
              duration="3 Months"
            />
            <InternshipCard
              title="Actively hiring"
              company="More Retail Private Limited"
              location="Bangalore"
              salary="₹ 35,000 /month"
              duration="3 Months"
            />
            <InternshipCard
              title="Actively hiring"
              company="More Retail Private Limited"
              location="Bangalore"
              salary="₹ 35,000 /month"
              duration="3 Months"
            />
            <InternshipCard
              title="Actively hiring"
              company="More Retail Private Limited"
              location="Bangalore"
              salary="₹ 35,000 /month"
              duration="3 Months"
            />
            <InternshipCard
              title="Actively hiring"
              company="More Retail Private Limited"
              location="Bangalore"
              salary="₹ 35,000 /month"
              duration="3 Months"
            />
          </div>
        </div>

        {/* Buttons  */}
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
      </div>
    </>
  );
};

export default InternshipCards;
