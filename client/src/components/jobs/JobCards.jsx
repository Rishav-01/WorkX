import InternshipCards from "./InternshipCards";

export default function JobCards() {
  return (
    <div className="mt-14">
      {/* Different Categories */}
      <div className="flex flex-col items-center justify-center lg:flex-row mb-20">
        <h2 className="mb-4 lg:mb-0 mr-8 whitespace-nowrap">
          Popular categories:
        </h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 rounded-full border border-gray-300">
            Big brands
          </button>
          <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 rounded-full border border-gray-300">
            Work from home
          </button>
          <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 rounded-full border border-gray-300">
            Part-time
          </button>
          <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 rounded-full border border-gray-300">
            MBA
          </button>
          <button className="px-2 py-1 text-sm text-blue-500 hover:text-blue-700 rounded-full border border-blue-500">
            Engineering
          </button>
          <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 rounded-full border border-gray-300">
            Media
          </button>
          <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 rounded-full border border-gray-300">
            Design
          </button>
          <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 rounded-full border border-gray-300">
            Data Science
          </button>
        </div>
      </div>
      {/* Job Listing Cards */}
      <InternshipCards />
    </div>
  );
}
