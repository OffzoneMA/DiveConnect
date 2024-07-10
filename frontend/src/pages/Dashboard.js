import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, CircularProgress, Paper } from "@mui/material";
import CustomLayout from "../components/common/Layout";
import axios from "axios";
import PromotionsSection from "../components/dashbaord/promotionsSection";
import { API_URL } from "../utils/constants";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { getAllDivingCenters } from "../features/divingCenters/divingCentersSlice.js";

const useStyles = makeStyles(() => ({
  section: {
    position: "relative",
    height: "100vh",
    marginBottom: "20px",
    background: "url(/home-background.jpg) center/cover no-repeat",
  },
  btn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));
const Dashboard = () => {
  const classes = useStyles();

  const { isLoading } = useSelector((store) => store.divingCentersState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDivingCenters());
  }, []);

  return (
    <section className={classes.section}>
      <div className={classes.btn}>
        <Button
          component={Link}
          to="/diving-center/list"
          variant="contained"
          color="primary"
        >
          Envoyer
        </Button>
      </div>
    </section>
  );
};

export default Dashboard;
