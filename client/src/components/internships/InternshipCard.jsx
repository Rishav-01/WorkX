import { IoIosTrendingUp } from "react-icons/io";

const InternshipCard = ({ title, company, location, salary, duration }) => {
  return (
    <div className="max-w-60 rounded-md border mt-5 cursor-pointer hover:scale-105 transition duration-200">
      <div className="p-4">
        <div className="w-52">
          <div className="flex gap-1 items-center">
            <h2 className="text-xs font-semibold">{title}</h2>
            <IoIosTrendingUp size={20} />
          </div>
          <span className="text-sm font-bold">{company}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600">{location}</p>
        <p className="mt-2 text-sm text-gray-600">{salary}</p>
        <p className="mt-2 text-sm text-gray-600">{duration}</p>
        <div className="mt-2">
          <span className="mb-1 mr-2 inline-block rounded-full bg-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-900">
            Internship
          </span>
        </div>
        <button
          type="button"
          className="mt-2 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default InternshipCard;
