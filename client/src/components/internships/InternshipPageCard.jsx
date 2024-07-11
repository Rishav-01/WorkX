import React from "react";

const InternshipPageCard = ({ filteredInternships }) => {
  return (
    <div>
      {filteredInternships.length === 0
        ? "No Internships"
        : filteredInternships.map((item, idx) => (
            <div key={idx}>{item.category}</div>
          ))}
    </div>
  );
};

export default InternshipPageCard;
