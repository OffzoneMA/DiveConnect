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
import CentersCard from "./CentersCard";
import Pagination from "@mui/material/Pagination";
import DivingTripCard from "../../DivingTripCard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getAllDivingCentersOfUser,
  handleChange,
} from "../../../../features/divingCenters/divingCentersSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import DivingSearchBar from "../../DivingSearchBar";
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

const Centers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDivingCentersOfUser());
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
    dispatch(getAllDivingCentersOfUser());
  };
  return (
    <Paper className={classes.paper}>
      <DivingSearchBar></DivingSearchBar>
      <div className={classes.submitBtn}>
        <Button
          component={Link}
          to="/dashboard/center"
          onClick={() => {
            dispatch(handleChange({ name: "image", value: null }));
          }}
          variant="contained"
          color="primary"
          sx={{}}
        >
          Ajouter un centre
        </Button>
      </div>
      <br />
      <Grid container spacing={2} className={classes.tripContainer}>
        {divingCenters.map((center) => {
          return (
            <Grid item xs={12} sm={12} md={12} key={center._id}>
              <CentersCard
                checkedAll={checkedAll}
                handleSelect={handleSelect}
                trip={center}
              />
            </Grid>
          );
        })}
      </Grid>

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

export default Centers;
