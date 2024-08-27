import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useImperativeHandle, forwardRef } from "react";

import DropDownFilter from "../../components/common/DropDownFilter.js";
import CheckBoxFilter from "../../components/common/CheckBoxFilter.js";
const Filters = forwardRef((props, ref) => {
  const { isLoading } = useSelector((store) => store.divingCentersState);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const times = generateTimes();
  // price
  const prices = [
    { name: "$ 0 - $ 1,100", key: "A" },
    { name: "$ 1,100 - $ 2,200", key: "B" },
    { name: "$ 2,200 - $ 3,300", key: "C" },
    { name: "$ 4400 +", key: "D" },
  ];
  const [selectedPrices, setSelectedPrice] = useState([]); // default value of URL filter
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
  const [selectedTripLengths, setSelectedTripLength] = useState([]);
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
  const [selectedLoggedDives, setSelectedLoggedDives] = useState([]);
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

  useImperativeHandle(ref, () => ({
    clear() {
      setSelectedCity([]);
      setSelectedTime([]);
      setSelectedPrice([]);
      setSelectedTripLength([]);
      setSelectedLoggedDives([]);
      setSelectedDivingEquipments([]);
    },
  }));

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border gap-3 border-[#E7E6F2] mb-4 sm:mb-8 bg-white px-4 py-5">
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
        <button className="w-[14rem] hidden  h-10 p-3 sm:flex gap-1 justify-center items-center bg-[#4E9FFF] rounded-lg">
          <p className="font-bold text-white">Search</p>
          <img src="/image/search.svg" className="h-5 w-[1.25rem] " alt="" />
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
  );
});

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
export default Filters;
