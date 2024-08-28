import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, CircularProgress, Paper } from "@mui/material";
import CustomLayout from "../components/common/Layout.js";
import axios from "axios";
import PromotionsSection from "../components/dashbaord/promotionsSection.js";
import { API_URL } from "../utils/constants.js";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import { useDispatch, useSelector, batch } from "react-redux";
import {
  getAllCenterCities,
  getAllDivingCenters,
  handleChange,
} from "../features/divingCenters/divingCentersSlice.js";

import { AutoComplete } from "primereact/autocomplete";
import DateInput from "../components/common/DateInput.js";
function Home() {
  const dispatch = useDispatch();
  const [cities, setCities] = useState(null);
  useEffect(() => {
    dispatch(getAllCenterCities());
    const { citiesOption } = useSelector((store) => store.divingCentersState);
    setCities(citiesOption);
  }, []);
  const [selectedCity, setSelectedCity] = useState(null);
  const [filteredCities, setFilteredCities] = useState(null);

  const searchItem = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredCities;

      if (!event.query.trim().length) {
        _filteredCities = [...cities];
      } else {
        _filteredCities = cities
          .filter((city) => {
            const [cityName, countryName] = city.name.split(",");
            return cityName.toLowerCase().startsWith(event.query.toLowerCase());
          })
          .map((city) => {
            const [cityName, countryName] = city.name.split(",");
            const capitalizedCountryName =
              countryName.charAt(0).toUpperCase() +
              countryName.slice(1).toLowerCase();
            return {
              name: `${cityName}, ${capitalizedCountryName}`,
              code: `${cityName},${capitalizedCountryName}`,
            };
          });
      }

      setFilteredCities(_filteredCities);
    }, 250);
  };

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleSearch = () => {
    const searchParams = new URLSearchParams();

    const cityName = selectedCity ? selectedCity.name.split(",")[0] : "";
    navigate(`${pathname}diving-center/list?${searchParams.toString()}`);
    batch(() => {
      dispatch(
        handleChange({
          name: "search",
          value: { city: cityName },
        })
      );
      dispatch(getAllDivingCenters());
    });
  };
  return (
    <div
      style={{
        backgroundImage: "url('/image/home-background.jpeg')",
      }}
      className="h-screen object-cover bg-center bg-no-repeat bg-cover relative z-0"
    >
      <div class="absolute inset-0 bg-black bg-opacity-30 -z-10 "></div>
      <h1 className="text-[rgba(255,255,255,0.41)] text-center text-[5.5rem] sm:text-[9.375rem] font-bold leading-[5.875rem] pt-[10rem] sm:pt-[14.2rem] z-10">
        Discover
      </h1>
      <h2 className="text-[#FAFAFF] m-0 mt-2 text-4xl sm:text-[3.5rem] font-bold leading-[4.125rem] text-center z-10">
        Best Diving Adventures
      </h2>
      <p className="text-lg px-10 text-left sm:px-0 sm:text-[1.375rem] my-3 font-bold leading-6 sm:leading-7 text-[#FAFAFF] sm:text-center">
        Find dive trips, rental equipment, and dive centers all in one place.
      </p>
      <div className="mt-4 hidden sm:flex  justify-between items-center w-[45%] p-2 rounded-lg bg-white m-auto">
        <div className="card w-2/3 p-fluid">
          <AutoComplete
            field="name"
            value={selectedCity}
            suggestions={filteredCities}
            completeMethod={searchItem}
            onChange={(e) => setSelectedCity(e.value)}
            placeholder="Where do you want to dive?"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex p-2 gap-1 items-center rounded-lg bg-[#C3DDFF] cursor-pointer">
            <span className="font-bold text-base leading-5  text-[#374151]">
              Filter
            </span>
            <img className="h-4 w-[1.25rem]" src="/image/filters.svg" alt="" />
          </button>
          <button
            onClick={handleSearch}
            className="flex p-2 gap-1 items-center rounded-lg bg-[#4E9FFF] cursor-pointer"
          >
            <span className="font-bold text-base leading-5  text-white">
              Search
            </span>
            <img className="h-5 w-[1.25rem]" src="/image/search.svg" alt="" />
          </button>
        </div>
      </div>
      <div className="flex sm:hidden flex-col gap-3 px-4">
        <div className="card p-fluid p-2 w-full rounded-lg bg-white">
          <AutoComplete
            field="name"
            value={selectedCity}
            suggestions={filteredCities}
            completeMethod={searchItem}
            onChange={(e) => setSelectedCity(e.value)}
            placeholder="Where do you want to dive?"
            width={"100%"}
          />
        </div>
        <div className="flex gap-2">
          <DateInput></DateInput>
          <div className="card p-fluid p-2 rounded-lg bg-white flex items-center ">
            <AutoComplete
              field="name"
              value={selectedCity}
              suggestions={filteredCities}
              completeMethod={searchItem}
              onChange={(e) => setSelectedCity(e.value)}
              placeholder="Name of Center"
              className=""
            />
          </div>
        </div>
        <button
          onClick={handleSearch}
          className="flex p-2 gap-1 items-center rounded-lg bg-[#4E9FFF] cursor-pointer justify-center"
        >
          <span className="font-bold text-base leading-5  text-white">
            Search
          </span>
          <img className="h-5 w-[1.25rem]" src="/image/search.svg" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Home;

// const useStyles = makeStyles(() => ({
//   section: {
//     position: "relative",
//     height: "100vh",
//     marginBottom: "20px",
//     background: "url(/home-background.jpg) center/cover no-repeat",
//   },
//   btn: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//   },
// }));
// const Dashboard = () => {
//   const classes = useStyles();

//   const { isLoading } = useSelector((store) => store.divingCentersState);

//   return (
//     <section className={classes.section}>
//       <div className={classes.btn}>
//         <Button
//           component={Link}
//           to="/diving-center/list"
//           variant="contained"
//           color="primary"
//         >
//           Découvrir les centres de plongée
//         </Button>
//       </div>
//     </section>
//   );
// };

// export default Dashboard;
