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
import CancelFilterButton from "../../components/common/CancelFilterButton.js";
import ModalFilters from "../../components/common/ModalFilters.js";
import Filters from "../../components/common/Filters.js";
import { Paginator } from "primereact/paginator";

import { Slider } from "primereact/slider";
import { Tooltip } from "primereact/tooltip";
const DivingCenterList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDivingCenters());
  }, []);
  const {
    divingCenters,
    search: searchItems,
    totalDivingCenters,
  } = useSelector((store) => store.divingCentersState);

  const [selectedDivingCenters, setSelectedDivingCenters] = useState([]);

  const onDivingCenterChange = (divingCenter) => {
    let _selectedDivingCenters = [...selectedDivingCenters];

    if (_selectedDivingCenters.some((cat) => cat._id === divingCenter._id)) {
      _selectedDivingCenters = _selectedDivingCenters.filter(
        (cat) => cat._id !== divingCenter._id
      );
    } else {
      _selectedDivingCenters.push(divingCenter);
    }
    setSelectedDivingCenters(_selectedDivingCenters);
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
      setSelectedDivingCenters([]);
    } else {
      setSelectedDivingCenters(divingCenters);
    }
    setIsSelectedAll(!isSelectedAll);
  };
  // pagination
  const { search, pathname } = useLocation();
  const { page, numOfPages } = useSelector((store) => store.divingCentersState);
  const navigate = useNavigate();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const handleChangePagination = (e) => {
    console.log(e);
    setFirst(e.first);
    setRows(e.rows);
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", e.page + 1);
    navigate(`${pathname}?${searchParams.toString()}`);
    dispatch(handleChange({ name: "page", value: e.page + 1 }));
    dispatch(getAllDivingCenters());
  };

  // pixel
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("https://api.pexels.com/v1/search", {
          headers: {
            Authorization: process.env.PIXEL_KEY_API, // Replace with your Pexels API key
          },
          params: {
            query: "diver",
            per_page: 10, // Number of images you want to fetch
          },
        });
        setImages(response.data.photos);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);
  return (
    <>
      {/* <BackgroundSection />
      <PromotionsSection /> */}

      <section className="bg-gray-700 mt-8 sm:mt-4">
        <div className="container mx-auto px-3 sm:px-6 sm:py-20 ">
          <div className="flex gap-6">
            <div className="hidden sm:block">
              <Filters></Filters>
            </div>
            <div className="flex flex-col gap-10  flex-[1_1_0] ">
              <p className="font-medium text-xl hidden sm:block  -mb-3  text-white">
                {totalDivingCenters} Australia Diving Center August 2024
              </p>
              <div className="flex  gap-2">
                {Object.entries(searchItems).map(
                  ([key, value]) =>
                    value && <CancelFilterButton key={key} title={value} />
                )}
                <CancelFilterButton title={"august"} />
                <CancelFilterButton title={"$ 0 - $ 1,100"} />
                <CancelFilterButton title={"Aircon Cabins"} />
              </div>
              <ModalFilters></ModalFilters>
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
                {divingCenters.map((divingCenter, index) => (
                  <DivingCenterCard
                    center={divingCenter}
                    onCenterChange={onDivingCenterChange}
                    selectedCenters={selectedDivingCenters}
                    // random image
                    randomImg={images[index]}
                  ></DivingCenterCard>
                ))}
              </div>
              <div className="self-center">
                {/* <Stack className="" spacing={2}>
                  <Pagination
                    count={numOfPages}
                    color="primary"
                    page={page}
                    onChange={handleChangePagination}
                    shape="rounded"
                  />
                </Stack> */}
                <Paginator
                  first={first}
                  rows={rows}
                  totalRecords={numOfPages * 10}
                  onPageChange={handleChangePagination}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DivingCenterList;
