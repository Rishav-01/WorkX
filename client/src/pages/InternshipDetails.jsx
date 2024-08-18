import React from "react";
import { useParams } from "react-router-dom";
import { internshipsData } from "../constants";

const InternshipDetails = () => {
  const internshipId = Number(useParams().id);

  const internship = internshipsData.find((item) => item.id === internshipId);

  return (
    <>
      <div className="p-3">
        <h1 className="font-bold mb-2">Applying for {internship.role}</h1>
        <h2>{internship.company}</h2>
      </div>
    </>
  );
};

export default InternshipDetails;
