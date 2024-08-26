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
  getAllDivingCenters,
  handleChange,
} from "../features/divingCenters/divingCentersSlice.js";

import { AutoComplete } from "primereact/autocomplete";
function Home() {
  const townsOfFrance = [
    { name: "Paris", code: "PAR" },
    { name: "Lyon", code: "LYO" },
    { name: "Marseille", code: "MAR" },
    { name: "Toulouse", code: "TOU" },
    { name: "Nice", code: "NIC" },
    { name: "Nantes", code: "NAN" },
    { name: "Strasbourg", code: "STR" },
    { name: "Montpellier", code: "MON" },
    { name: "Bordeaux", code: "BOR" },
    { name: "Lille", code: "LIL" },
  ];
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);

  const searchItem = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredCountries;

      if (!event.query.trim().length) {
        _filteredCountries = [...countries];
      } else {
        _filteredCountries = countries.filter((country) => {
          return country.name
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredCountries(_filteredCountries);
    }, 250);
  };

  useEffect(() => {
    // CountryService.getCountries().then((data) => setCountries(data));
    setCountries(townsOfFrance);
  }, []);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    searchParams.set("city", selectedCountry.name);
    navigate(`${pathname}diving-center/list?${searchParams.toString()}`);
    batch(() => {
      dispatch(
        handleChange({
          name: "search",
          value: { city: selectedCountry.name },
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
      <h1 className="text-[rgba(255,255,255,0.41)] text-center text-[9.375rem] font-bold leading-[5.875rem] pt-[14.2rem] z-10">
        Discover
      </h1>
      <h2 className="text-[#FAFAFF] m-0 mt-2 text-[3.5rem] font-bold leading-[4.125rem] text-center z-10">
        Best Diving Adventures
      </h2>
      <p className="text-[1.375rem] my-3 font-bold leading-7 text-[#FAFAFF] text-center">
        Find dive trips, rental equipment, and dive centers all in one place.
      </p>
      <div className="flex mt-4  justify-between items-center w-[45%] p-2 rounded-lg bg-white m-auto">
        {/* <input
          type="text"
          placeholder="Where do you want to dive?"
          name=""
          id=""
          className="text-base leading-5 w-[50%] focus:outline-none"
        /> */}
        <div className="card flex justify-content-center">
          <AutoComplete
            field="name"
            value={selectedCountry}
            suggestions={filteredCountries}
            completeMethod={searchItem}
            onChange={(e) => setSelectedCountry(e.value)}
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
