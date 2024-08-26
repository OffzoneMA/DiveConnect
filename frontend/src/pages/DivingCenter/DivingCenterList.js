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
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import Ratting from "../../components/common/Ratting.js";
import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAllDivingCenters,
  handleChange,
} from "../../features/divingCenters/divingCentersSlice";
import DivingCenterCard from "./DivingCenterCard.js";
import DropDownFilter from "../../components/common/DropDownFilter.js";
import CheckBoxFilter from "../../components/common/CheckBoxFilter.js";
import CancelFilterButton from "../../components/common/CancelFilterButton.js";
const DivingCenterList = () => {
  const { isLoading } = useSelector((store) => store.divingCentersState);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const times = generateTimes();
  // price
  const prices = [
    { name: "$ 0 - $ 1,100", key: "A" },
    { name: "$ 1,100 - $ 2,200", key: "B" },
    { name: "$ 2,200 - $ 3,300", key: "C" },
    { name: "$ 4400 +", key: "D" },
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
    { name: "< 5 Nights", key: "E" },
    { name: "5 - 7 Nights", key: "F" },
    { name: "8+ Nights", key: "I" },
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
    { name: "No minimum logged dives", key: "G" },
    { name: "1-20 logged dives", key: "H" },
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
    { name: "Stab", key: "Aa" },
    { name: "Regulator", key: "Ma" },
    { name: "Mask", key: "Ca" },
    { name: "Fins", key: "Da" },
    { name: "Torch", key: "Ea" },
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
  // diving centers:
  const categories = [
    { name: "Accounting", key: "Ab" },
    { name: "Marketing", key: "Mb" },
    { name: "Production", key: "Pb" },
    { name: "Research", key: "Rb" },
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);

  const onCategoryChange = (category) => {
    let _selectedCategories = [...selectedCategories];

    if (_selectedCategories.some((cat) => cat.key === category.key)) {
      _selectedCategories = _selectedCategories.filter(
        (cat) => cat.key !== category.key
      );
    } else {
      _selectedCategories.push(category);
    }
    setSelectedCategories(_selectedCategories);
    // let newDivingCenters = [...divingCenters];
    // newDivingCenters = newDivingCenters.map((center) => {
    //   return { ...center, selected: checked };
    // });
    // console.log(checked);
    // dispatch(
    //   handleChange({ name: "divingCenters", value: newDivingCenters })
    // );
  };
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const selectAllCenters = () => {
    if (isSelectedAll) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories);
    }
    setIsSelectedAll(!isSelectedAll);
  };
  // pagination
  const { search, pathname } = useLocation();
  const { page, numOfPages } = useSelector((store) => store.divingCentersState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChangePagination = (e, value) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", value);
    navigate(`${pathname}?${searchParams.toString()}`);
    dispatch(handleChange({ name: "page", value }));
    dispatch(getAllDivingCenters());
  };
  return (
    <>
      {/* <BackgroundSection />
      <PromotionsSection /> */}

      <section className="bg-gray-700 mt-4">
        <div className="container mx-auto px-3 sm:px-6 sm:py-20 ">
          <div className="flex gap-6">
            <div className="hidden sm:flex flex-col">
              <div className="flex flex-col border gap-3 border-[#E7E6F2] mb-8 bg-white px-4 py-5">
                <p className="font-bold text-lg">Destination</p>
                <DropDownFilter
                  selectedItems={selectedCity}
                  setSelectedItem={setSelectedCity}
                  name="City"
                  options={cities}
                />
                <DropDownFilter
                  selectedItems={selectedTime}
                  setSelectedItem={setSelectedTime}
                  name="Time"
                  options={times}
                />
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
              <CheckBoxFilter
                items={divingEquipments}
                onItemsChange={onDivingEquipmentsChange}
                selectedItems={selectedDivingEquipments}
                title={"Diving Equipments"}
              />
              {/* price filter */}
              <CheckBoxFilter
                items={prices}
                onItemsChange={onPriceChange}
                selectedItems={selectedPrices}
                title={"Price Range"}
              />
              {/* Length of trip filter */}
              <CheckBoxFilter
                items={tripLengths}
                onItemsChange={onTripLengthChange}
                selectedItems={selectedTripLengths}
                title={"Length of trip"}
              />
              {/* Minimum logged dives filter */}
              <CheckBoxFilter
                items={loggedDives}
                onItemsChange={onLoggedDivesChange}
                selectedItems={selectedLoggedDives}
                title={"Minimum logged dives"}
              />
            </div>
            <div className="flex flex-col gap-10  flex-[1_1_0] ">
              <p className="font-medium text-xl -mb-3  text-white">
                20 Australia Diving Center August 2024
              </p>
              <div className="flex  gap-2">
                <CancelFilterButton title={"Australia"} />
                <CancelFilterButton title={"august"} />
                <CancelFilterButton title={"$ 0 - $ 1,100"} />
                <CancelFilterButton title={"Aircon Cabins"} />
              </div>
              <div className="flex gap-2 self-end">
                <button
                  onClick={selectAllCenters}
                  className="flex bg-[#C3DDFF] rounded-lg sm:gap-2 p-1 sm:px-3 sm:py-2 items-center "
                >
                  <img
                    src="/image/checkmark.svg"
                    className="h-5 w-[1.25rem]"
                    alt=""
                  />
                  <p className="sm:font-bold text-sm sm:text-base  text-[#4A3AFF]">
                    Select All
                  </p>
                </button>
                <button className="flex bg-[#FED133] rounded-lg sm:gap-2 p-1 sm:px-3 sm:py-2 items-center ">
                  <img
                    src="/image/plus.svg"
                    className="h-5 w-[1.25rem]"
                    alt=""
                  />
                  <p className="sm:font-bold  text-sm sm:text-base text-[#4A3AFF]">
                    Add to Requests
                  </p>
                </button>
                <button
                  className="flex bg-[#FBE080] rounded-lg sm:gap-2  p-1
                 sm:px-3 sm:py-2 items-center "
                >
                  <p className="sm:font-bold  text-sm sm:text-base text-[#4A3AFF]">
                    Request Quote
                  </p>
                  <img
                    src="/image/arrowRigthPurpel.svg"
                    className="h-5 w-[1.25rem]"
                    alt=""
                  />
                </button>
              </div>
              <div className="flex flex-col  rounded-sm bg-[#E3EFFF]">
                {categories.map((category) => (
                  <DivingCenterCard
                    center={category}
                    onCenterChange={onCategoryChange}
                    selectedCenters={selectedCategories}
                  ></DivingCenterCard>
                ))}
              </div>
              <div className="self-center">
                <Stack className="" spacing={2}>
                  <Pagination
                    count={numOfPages}
                    color="primary"
                    page={page}
                    onChange={handleChangePagination}
                  />
                </Stack>
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
