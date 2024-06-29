import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, CircularProgress, Paper } from "@mui/material";
import CustomLayout from "../components/common/Layout";
import axios from "axios";
import PromotionsSection from "../components/dashbaord/promotionsSection";
import { API_URL } from "../utils/constants";
import ContactSection from "../components/dashbaord/ContactSection";

import BackgroundSection from "../components/dashbaord/BackgroundSection";
import Button from "../components/common/Button";
import Footer from "../components/common/footer.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllDivingCenters } from "../features/divingCenters/divingCentersSlice.js";

const Dashboard = () => {
  const { isLoading } = useSelector((store) => store.divingCentersState);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("c'est fait");
    dispatch(getAllDivingCenters());
  }, []);

  return (
    <CustomLayout>
      <BackgroundSection />
      <PromotionsSection />
      <ContactSection />
      <Footer />
    </CustomLayout>
  );
};

export default Dashboard;
