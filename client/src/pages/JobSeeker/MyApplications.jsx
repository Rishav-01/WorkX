import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer/Footer";

const MyApplications = () => {
  return (
    <>
      <Navbar />
      <section className="my-2">
        <h1 className="text-3xl my-5 text-center font-bold">My Applications</h1>
        <div className="grid mx-auto grid-cols-4 gap-4 max-w-7xl">
          <div className="bg-gray-200 p-2 text-center rounded-md">
            Company Name
          </div>
          <div className="bg-gray-200 p-2 text-center rounded-md">Category</div>
          <div className="bg-gray-200 p-2 text-center rounded-md">
            Applied On
          </div>
          <div className="bg-gray-200 p-2 text-center rounded-md">
            Application Status
          </div>

          {/* Add your application data here */}
          <div className="p-2 text-center">Company 1</div>
          <div className="p-2 text-center">Software Development</div>
          <div className="p-2 text-center">2022-01-01</div>
          <div className="p-2 text-center bg-green-400">Accepted</div>
          <div className="p-2 text-center">Company 2</div>
          <div className="p-2 text-center">Marketing</div>
          <div className="p-2 text-center">2022-01-05</div>
          <div className="p-2 text-center bg-red-400">Rejected</div>
          {/* Add more rows here */}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MyApplications;
