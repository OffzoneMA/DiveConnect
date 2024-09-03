import React from "react";
import CenterRequest from "../components/common/CenterRequest";

function Requests() {
  return (
    <section className="bg-gray-700 mt-8 sm:mt-4">
      <div className="container mx-auto px-3 sm:px-6 sm:py-20 ">
        <h3 className="font-bold text-4xl text-[#C3DDFF]">Your Requests</h3>
        <li className="text-xl text-white list-item">
          Lorem ipsum dolor sit amet consectetur. Lorem fringilla massa ultrices
          proin ac enim.
        </li>
        <li className="text-xl text-white">
          Lorem ipsum dolor sit amet consectetur. Phasellus magna venenatis mi
          nec.
        </li>
        <div className="flex flex-col gap-12">
          <CenterRequest />
        </div>
      </div>
    </section>
  );
}

export default Requests;
