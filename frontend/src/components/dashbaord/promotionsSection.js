import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Paper,
  Typography,
  Button,
  Grid,
  FormControlLabel,
  Stack,
  Autocomplete,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";

import Pagination from "@mui/material/Pagination";
import DivingTripCard from "./DivingTripCard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getAllDivingCenters,
  handleChange,
} from "../../features/divingCenters/divingCentersSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
const useStyles = makeStyles(() => ({
  paper: {
    padding: "20px",
    margin: "0 auto",
    marginBottom: "50px",
    width: "80%",
    justifyContent: "center",
  },
  submitBtn: {
    textAlign: "right",
    marginTop: "2rem",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
}));

const PromotionsSection = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDivingCenters());
  }, []);
  const classes = useStyles();
  const { divingCenters, isLoading, page, numOfPages } = useSelector(
    (store) => store.divingCentersState
  );
  let [checkedAll, setCheckedAll] = useState(false);
  const handleCheckedAll = (checked) => {
    let newDivingCenters = [...divingCenters];
    newDivingCenters = newDivingCenters.map((center) => {
      return { ...center, selected: checked };
    });
    console.log(checked);
    dispatch(handleChange({ name: "divingCenters", value: newDivingCenters }));
  };

  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const handleSelect = (checked, id) => {
    let newDivingCenters = [...divingCenters];
    newDivingCenters.map((center, index) => {
      if (center._id === id) {
        newDivingCenters[index] = { ...center, selected: checked };
      }
    });
    dispatch(handleChange({ name: "divingCenters", value: newDivingCenters }));
  };
  useEffect(() => {
    setCheckedAll(divingCenters.every((center) => center.selected));
  }, [divingCenters]);
  const handleChangePagination = (e, value) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", value);
    navigate(`${pathname}?${searchParams.toString()}`);
    dispatch(handleChange({ name: "page", value }));
    dispatch(getAllDivingCenters());
  };
  return (
    <Paper className={classes.paper}>
      {/* <Typography variant="h2" gutterBottom>
        Our Famous locations
      </Typography> */}
      {/* Enhanced promotions section with cards */}
      <FormControlLabel
        sx={{ marginLeft: "1rem", marginBottom: "1rem" }}
        label="Select All"
        control={
          <Checkbox
            onChange={(e) => handleCheckedAll(e.target.checked)}
            checked={checkedAll}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
        }
      />
      <Grid container spacing={2} className={classes.tripContainer}>
        {divingCenters.map((center) => {
          return (
            <Grid item xs={12} sm={12} md={12} key={center._id}>
              <DivingTripCard
                checkedAll={checkedAll}
                handleSelect={handleSelect}
                trip={center}
              />
            </Grid>
          );
        })}
      </Grid>
      <div className={classes.submitBtn}>
        <Button
          component={Link}
          onClick={() => {
            if (!divingCenters.find((center) => center.selected)) {
              alert("Veuillez sélectionner un centre de plongée ou plus");
              return;
            }
            navigate("/deviseForm");
          }}
          variant="contained"
          color="primary"
          sx={{}}
        >
          Envoyer
        </Button>
      </div>
      <br />
      <br />
      <div className={classes.pagination}>
        <Stack className={classes.pagination} spacing={2}>
          <Pagination
            count={numOfPages}
            color="primary"
            page={page}
            onChange={handleChangePagination}
          />
        </Stack>
      </div>

      {/* <Button variant="contained" color="primary">
        View All Promotions
        </Button> */}
    </Paper>
  );
};

export default PromotionsSection;
