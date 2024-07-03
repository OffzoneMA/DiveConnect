import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Paper,
  Typography,
  Button,
  Grid,
  FormControlLabel,
  Stack,
  Autocomplete,
} from "@mui/material";
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
  },
  tripContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  pagination: {
    margin: "0 auto",
    marginTop: "2rem",
  },
}));

const PromotionsSection = () => {
  const classes = useStyles();
  const { divingCenters, isLoading, page, numOfPages } = useSelector(
    (store) => store.divingCentersState
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  const handleChangePagination = (e, value) => {
    console.log(value);
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
      <div className={classes.tripContainer}>
        <Grid container spacing={2} className={classes.tripContainer}>
          {divingCenters.map((center) => (
            <Grid item xs={12} sm={6} md={4} key={center._id}>
              <DivingTripCard trip={center} />
            </Grid>
          ))}
        </Grid>
        <Stack className={classes.pagination} spacing={2}>
          <Pagination
            count={numOfPages}
            color="primary"
            page={page}
            onChange={handleChangePagination}
          />
        </Stack>
      </div>
      <br />
      <br />
      {/* <Button variant="contained" color="primary">
        View All Promotions
      </Button> */}
    </Paper>
  );
};

export default PromotionsSection;
