import React from "react";

const InternshipPageCard = ({ internships }) => {
  return (
    <div>
      {internships.length === 0
        ? "No Internships"
        : internships.map((item, idx) => <div key={idx}>{item.category}</div>)}
    </div>
  );
};

export default InternshipPageCard;
