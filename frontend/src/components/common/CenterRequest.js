import { Rating } from "@mui/material";
import React from "react";
import Ratting from "./Ratting";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEquipments } from "../../features/equipments/equipmentsSlice";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { api, checkForUnauthorizedResponse, customFetch } from "../../utils";
import { getAllDivingCenters } from "../../features/divingCenters/divingCentersSlice";
function CenterRequest() {
  return (
    <div className="bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-medium">Diving Center / Trip + Rent Gear</p>
        <button className="rounded-xl p-2 flex items-center gap-1 justify-between border-[#5D5A88] border">
          <span className="text-[#374151] font-bold">Delete</span>
          <img
            className="h-[13px] w-[13px]"
            src="/image/greyClose.svg"
            alt=""
          />
        </button>
      </div>
      <div className="flex ">
        <img
          className="h-[15rem] w-[25%] rounded-lg"
          src="/image/underwater.jpg"
          alt=""
        />
        <div className="bg-[#FAFAFF] flex flex-col gap-3 flex-1 px-10 py-5">
          <h2 className="font-bold text-lg text-[#6D758F]">Name : Club 1</h2>
          <p className="text-base text-[#6D758F]">Location: Australia</p>
          <Ratting></Ratting>
          <p className="text-base mt-2 text-[#374151] w-[70%]">
            The award-winning Spoilsport yacht offers year-round diving to some
            of the best dive sites of the outer Great Barrier Reef and the Coral
            Sea.
          </p>
        </div>
      </div>
      <p className="text-xl font-medium my-4">Diving Trips Details</p>
      <Grid>
        <div className="bg-[#5D5A88] border-r-2 p-2 text-white">Date</div>
        <div className="bg-[#5D5A88] border-r-2 p-2 text-white">Length</div>
        <div className="bg-[#5D5A88] border-r-2 p-2 text-white">
          Departure/Time
        </div>
        <div className="bg-[#5D5A88] border-r-2 p-2 text-white">
          Return/Time
        </div>
        <div className="bg-[#5D5A88] border-r-2 p-2 text-white">
          Dive Number
        </div>
        <div className="bg-[#5D5A88] border-r-2 p-2 text-white">
          Price Range
        </div>
        <div className="bg-[#5D5A88] border-r-2 p-2 text-white">Select</div>
        {/* rows */}
        <div className="border-[#BCBACD] border-r-2 bg-[#F2F1FA] p-2 text-[#374151]">
          8 AUG
        </div>
        <div className="border-[#BCBACD] border-r-2 bg-[#F2F1FA] p-2 text-[#374151]">
          6 Days/5 Nights
        </div>
        <div className="border-[#BCBACD] border-r-2 bg-[#F2F1FA] p-2 text-[#374151]">
          6 PM
        </div>
        <div className="border-[#BCBACD] border-r-2 bg-[#F2F1FA] p-2 text-[#374151]">
          13 AUG, 8 AM
        </div>
        <div className="border-[#BCBACD] border-r-2 bg-[#F2F1FA] p-2 text-[#374151]">
          Max 18
        </div>
        <div className="border-[#BCBACD] border-r-2 bg-[#F2F1FA] p-2 text-[#374151]">
          From $800
        </div>
        <div className="border-[#BCBACD] border-r-2 bg-[#F2F1FA] p-2 text-[#374151]">
          <button
            // key={center._id}
            className={`${
              //   selectedCenters.some((item) => item._id === center._id) ||
              //   center.selected
              true ? "bg-[#4A3AFF]" : "bg-[#D4D2E3] "
            }  sm:px-3 sm:py-2 py-2 px-2 text-white rounded-lg flex justify-between items-center sm:gap-2`}
            // onClick={() => onCenterChange(center)}
          >
            <p className="sm:text-base text-sm ">Selected</p>
            <img
              src="/image/checkmarkWhite.svg"
              className="w-[20px] h-[20px]"
              alt=""
              srcset=""
            />
          </button>
        </div>
      </Grid>
      <div className="my-5 flex gap-8">
        <input
          type="number"
          name="divesNum"
          id="divesNum"
          placeholder="Number of Person"
          className="px-4 py-3 border-[#5D5A88] border rounded-lg w-1/3
          "
          min={0}
        />
        <input
          type="number"
          name="divesNum"
          id="divesNum"
          placeholder="Number of Dive"
          className="px-4 py-3 border-[#5D5A88] border rounded-lg w-1/3 
          "
          min={0}
        />
      </div>
    </div>
  );
}
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(2, 1fr);
  text-align: center;
  > p {
    padding-top: 5rem;
    text-align: center;
  }
`;
export default CenterRequest;
