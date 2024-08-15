import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, CircularProgress, Paper } from "@mui/material";
import CustomLayout from "../../components/common/Layout.js";

import axios from "axios";
import PromotionsSection from "../../components/dashbaord/promotionsSection";
import { API_URL } from "../../utils/constants";
import ContactSection from "../../components/dashbaord/ContactSection";

import BackgroundSection from "../../components/dashbaord/BackgroundSection";
import Button from "../../components/common/Button";
import Footer from "../../components/common/footer.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllDivingCenters } from "../../features/divingCenters/divingCentersSlice.js";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
const DivingCenterList = () => {
  const { isLoading } = useSelector((store) => store.divingCentersState);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const times = generateTimes();
  // price
  const prices = [
    { name: "$ 0 - $ 1,100", key: "A" },
    { name: "$ 1,100 - $ 2,200", key: "M" },
    { name: "$ 2,200 - $ 3,300", key: "P" },
    { name: "$ 4400 +", key: "R" },
  ];
  const [selectedPrices, setSelectedPrice] = useState([prices[1]]); // default value of URL filter
  const onPriceChange = (e) => {
    let _selectedPrices = [...selectedPrices];

    if (e.checked) _selectedPrices.push(e.value);
    else
      _selectedPrices = _selectedPrices.filter(
        (price) => price.key !== e.value.key
      );
    setSelectedPrice(_selectedPrices);
  };
  // trip length
  const tripLengths = [
    { name: "< 5 Nights", key: "A" },
    { name: "5 - 7 Nights", key: "P" },
    { name: "8+ Nights", key: "R" },
  ];
  const [selectedTripLengths, setSelectedTripLength] = useState([
    tripLengths[1],
  ]);
  const onTripLengthChange = (e) => {
    let _selectedTripLengths = [...selectedTripLengths];

    if (e.checked) _selectedTripLengths.push(e.value);
    else
      _selectedTripLengths = _selectedTripLengths.filter(
        (tripLength) => tripLength.key !== e.value.key
      );
    setSelectedTripLength(_selectedTripLengths);
  };
  //  trip city
  const cities = [
    { name: "Australia", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  // Minimum logged dives
  const loggedDives = [
    { name: "No minimum logged dives", key: "A" },
    { name: "1-20 logged dives", key: "M" },
  ];
  const [selectedLoggedDives, setSelectedLoggedDives] = useState([
    loggedDives[0],
  ]);
  const onLoggedDivesChange = (e) => {
    let _selectedLoggedDives = [...selectedLoggedDives];

    if (e.checked) _selectedLoggedDives.push(e.value);
    else
      _selectedLoggedDives = _selectedLoggedDives.filter(
        (loggedDive) => loggedDive.key !== e.value.key
      );
    setSelectedLoggedDives(_selectedLoggedDives);
  };
  // diving equipments
  const divingEquipments = [
    { name: "Stab", key: "A" },
    { name: "Regulator", key: "M" },
    { name: "Mask", key: "C" },
    { name: "Fins", key: "D" },
    { name: "Torch", key: "E" },
  ];
  const [selectedDivingEquipments, setSelectedDivingEquipments] = useState([]);
  const onDivingEquipmentsChange = (e) => {
    let _selectedDivingEquipments = [...selectedDivingEquipments];

    if (e.checked) _selectedDivingEquipments.push(e.value);
    else
      _selectedDivingEquipments = _selectedDivingEquipments.filter(
        (divingEquipment) => divingEquipment.key !== e.value.key
      );
    setSelectedDivingEquipments(_selectedDivingEquipments);
  };

  return (
    <>
      {/* <BackgroundSection />
      <PromotionsSection /> */}
      <section className="bg-gray-700 mt-4">
        <div className="container  mx-auto px-6 py-20 ">
          <div className="flex gap-6">
            <div className="flex flex-col">
              <div className="flex flex-col border gap-3 border-[#E7E6F2] mb-8 bg-white px-4 py-5">
                <p className="font-bold text-lg">Destination</p>
                <div className="card flex justify-content-center">
                  <Dropdown
                    value={selectedCity || { name: "Australlie", code: "AU" }} // to do the default value from filter URL
                    onChange={(e) => setSelectedCity(e.value)}
                    options={cities}
                    optionLabel="name"
                    placeholder="Select a City"
                    className="w-full md:w-14rem border "
                  />
                </div>
                <div className="card flex justify-content-center">
                  <Dropdown
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.value)}
                    options={times}
                    optionLabel="name"
                    placeholder="Select a Time"
                    className="w-full md:w-14rem border"
                  />
                </div>
                <button className="w-[14rem] h-10 p-3 flex gap-1 justify-center items-center bg-[#4E9FFF] rounded-lg">
                  <p className="font-bold text-white">Search</p>
                  <img
                    src="/image/search.svg"
                    className="h-5 w-[1.25rem] "
                    alt=""
                  />
                </button>
              </div>
              {/* Diving equipments filter */}
              <div className="flex flex-col border gap-3 border-[#ADABC3] bg-white px-4 py-5">
                <p>Diving Equipments</p>
                <div className="card flex">
                  <div className="flex flex-column gap-3">
                    {divingEquipments.map((divingEquipment) => {
                      return (
                        <div
                          key={divingEquipment.key}
                          className="flex align-items-center"
                        >
                          <Checkbox
                            inputId={divingEquipment.key}
                            name="category"
                            value={divingEquipment}
                            className="border rounded-md  bg-white"
                            onChange={onDivingEquipmentsChange}
                            checked={selectedDivingEquipments.some(
                              (item) => item.key === divingEquipment.key
                            )}
                          />
                          <label htmlFor={divingEquipment.key} className="ml-2">
                            {divingEquipment.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* price filter */}
              <div className="flex flex-col border gap-3 border-[#ADABC3] bg-white px-4 py-5">
                <p>Price Range</p>
                <div className="card flex ">
                  <div className="flex flex-column gap-3">
                    {prices.map((price) => {
                      return (
                        <div
                          key={price.key}
                          className="flex align-items-center"
                        >
                          <Checkbox
                            inputId={price.key}
                            name="category"
                            value={price}
                            className="border rounded-md  bg-white"
                            onChange={onPriceChange}
                            checked={selectedPrices.some(
                              (item) => item.key === price.key
                            )}
                          />
                          <label htmlFor={price.key} className="ml-2">
                            {price.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* Length of trip filter */}
              <div className="flex flex-col border gap-3 border-[#ADABC3] bg-white px-4 py-5">
                <p>Length of trip</p>
                <div className="card flex ">
                  <div className="flex flex-column gap-3">
                    {tripLengths.map((tripLength) => {
                      return (
                        <div
                          key={tripLength.key}
                          className="flex align-items-center"
                        >
                          <Checkbox
                            inputId={tripLength.key}
                            name="category"
                            value={tripLength}
                            className="border rounded-md  bg-white"
                            onChange={onTripLengthChange}
                            checked={selectedTripLengths.some(
                              (item) => item.key === tripLength.key
                            )}
                          />
                          <label htmlFor={tripLength.key} className="ml-2">
                            {tripLength.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* Minimum logged dives filter */}
              <div className="flex flex-col border gap-3 border-[#ADABC3] bg-white px-4 py-5">
                <p>Minimum logged dives</p>
                <div className="card flex justify-content-center">
                  <div className="flex flex-column gap-3">
                    {loggedDives.map((loggedDive) => {
                      return (
                        <div
                          key={loggedDive.key}
                          className="flex align-items-center"
                        >
                          <Checkbox
                            inputId={loggedDive.key}
                            name="category"
                            value={loggedDive}
                            className="border rounded-md  bg-white"
                            onChange={onLoggedDivesChange}
                            checked={selectedLoggedDives.some(
                              (item) => item.key === loggedDive.key
                            )}
                          />
                          <label htmlFor={loggedDive.key} className="ml-2">
                            {loggedDive.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10  flex-[1_1_0] ">
              <p className="font-medium text-xl -mb-3  text-white">
                20 Australia Diving Center August 2024
              </p>
              <div className="flex  gap-2">
                <div className="flex">
                  <button className="px-3 py-2 flex justify-center items-center gap-2 rounded-lg bg-[#F2F1FA] text-sm">
                    <p className="capitalize text-black">australia</p>
                    <img
                      src="/image/close.svg"
                      className="h-5 w-[1.25rem]"
                      alt=""
                    />
                  </button>
                </div>
                <div className="flex">
                  <button className="px-3 py-2 flex justify-center items-center gap-2 rounded-lg bg-[#F2F1FA] text-sm">
                    <p className="capitalize text-black">august</p>
                    <img
                      src="/image/close.svg"
                      className="h-5 w-[1.25rem]"
                      alt=""
                    />
                  </button>
                </div>
                <div className="flex">
                  <button className="px-3 py-2 flex justify-center items-center gap-2 rounded-lg bg-[#F2F1FA] text-sm">
                    <p className="capitalize text-black">$ 0 - $ 1,100</p>
                    <img
                      src="/image/close.svg"
                      className="h-5 w-[1.25rem]"
                      alt=""
                    />
                  </button>
                </div>
                <div className="flex">
                  <button className="px-3 py-2 flex justify-center items-center gap-2 rounded-lg bg-[#F2F1FA] text-sm">
                    <p className="capitalize text-black">Aircon Cabins</p>
                    <img
                      src="/image/close.svg"
                      className="h-5 w-[1.25rem]"
                      alt=""
                    />
                  </button>
                </div>
              </div>
              <div className="flex gap-2 self-end">
                <button className="flex bg-[#C3DDFF] rounded-lg gap-2 px-3 py-2">
                  <img
                    src="/image/checkmark.svg"
                    className="h-5 w-[1.25rem]"
                    alt=""
                  />
                  <p className="font-bold text-base text-[#4A3AFF]">
                    Select All
                  </p>
                </button>
                <button className="flex bg-[#FED133] rounded-lg gap-2 px-3 py-2">
                  <img
                    src="/image/plus.svg"
                    className="h-5 w-[1.25rem]"
                    alt=""
                  />
                  <p className="font-bold text-base text-[#4A3AFF]">
                    Add to Requests
                  </p>
                </button>
                <button className="flex bg-[#FBE080] rounded-lg gap-2 px-3 py-2">
                  <p className="font-bold text-base text-[#4A3AFF]">
                    Add to Requests
                  </p>
                  <img
                    src="/image/arrowRigthPurpel.svg"
                    className="h-5 w-[1.25rem]"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
function generateTimes() {
  const currentDate = new Date();
  const startMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11, so add 1
  const startYear = currentDate.getFullYear();
  const endMonth = (startMonth + 10) % 12 || 12;
  const endYear = startYear + Math.floor((startMonth + 10) / 12);

  const times = [];
  let currentMonth = startMonth;
  let currentYear = startYear;

  while (
    currentYear < endYear ||
    (currentYear === endYear && currentMonth <= endMonth)
  ) {
    const monthName = new Date(currentYear, currentMonth - 1).toLocaleString(
      "en-US",
      { month: "long" }
    );
    times.push({
      name: `${monthName} ${currentYear}`,
      code: `${currentMonth}/${currentYear}`,
    });

    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
  }

  return times;
}

export default DivingCenterList;
