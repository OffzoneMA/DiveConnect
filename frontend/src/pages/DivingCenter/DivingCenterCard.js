import React from "react";
import { Link } from "react-router-dom"; // Import Link
import Ratting from "../../components/common/Ratting";
import Star from "../../components/common/Star";

function DivingCenterCard({
  center,
  onCenterChange,
  selectedCenters,
  randomImg: image,
}) {
  return (
    <div className="flex bg-white m-3 sm:m-4">
      {center.image ? (
        <img
          className=" w-1/3 sm:w-80 h-64"
          src={center.image || "/image/underwater.jpg"}
          alt=""
        />
      ) : (
        <img
          className=" w-1/3 sm:w-80 h-64"
          key={image?.id}
          src={image?.src.medium}
          alt={image?.alt}
        />
      )}
      <div className="flex flex-col gap-1 px-1 py-4 sm:p-4 flex-1">
        <div className="flex justify-between w-12">
          <p className="text-[#0065B8] text-[1.375rem] leading-9 text-lg">
            {center.name}
          </p>
          <p className="hidden sm:block text-gray-700 text-base  leading-[1.6rem]">
            from $ <span className="text-2xl leading-8">60</span>
            /Dive
          </p>
        </div>
        <div className="flex gap-2 mb-3">
          <Ratting />
          <Star />
          <p className="text-sm sm:hidden">9.3</p>
          <p className="text-[#6B7280] text-sm">181 reviews</p>
        </div>
        <div className="flex items-center gap-1 ">
          <img
            className="h-[20px] w-[20px]"
            src="/image/equipement.svg"
            alt=""
          />
          <p className="text-sm mb-1 text-[#374151] text-center ">
            Equipment available
          </p>
        </div>
        <p className="sm:text-sm text-[0.8rem] text-[#374151] w-full sm:w-3/4">
          {center.description}
        </p>
        <div key={center._id} className="mt-4 flex items-center ">
          <button
            key={center._id}
            className={`${
              selectedCenters.some((item) => item._id === center._id) ||
              center.selected
                ? "bg-[#4A3AFF]"
                : "bg-[#D4D2E3] "
            }  sm:px-3 sm:py-2 py-2 px-2 text-white rounded-lg flex justify-between items-center sm:gap-2`}
            onClick={() => onCenterChange(center)}
          >
            <p className="sm:text-base text-sm ">Selected</p>
            <img
              src="/image/checkmarkWhite.svg"
              className="w-[20px] h-[20px]"
              alt=""
            />
          </button>
          <p className="sm:hidden text-gray-700 sm:text-base text-sm sm:leading-[1.6rem]">
            from $ <span className="sm:text-2xl text-sm sm:leading-8">60</span>
            / day
          </p>
        </div>
        {/* Add "See Details" link here */}
        <Link 
          to={`/diving-center/details/${center._id}`} 
          className="text-blue-500 mt-2 hover:underline text-sm sm:text-base"
        >
          See Details
        </Link>
      </div>
    </div>
  );
}

export default DivingCenterCard;