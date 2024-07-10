import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleChange } from "../../features/divingCenters/divingCentersSlice";
const useStyles = makeStyles({
  root: { width: "100%" },

  media: {
    height: 140,
  },
  card: {
    flexDirection: "row",
  },
});

const DivingTripCard = ({ trip, handleSelect }) => {
  const classes = useStyles();
  // Placeholder trip data
  // const placeholderTrip = {
  //   imageUrl: "https://via.placeholder.com/345x140", // Placeholder image URL
  //   title: "Trip Title", // Placeholder title
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Ut in geometria, prima si dederis, danda sunt omnia.", // Placeholder description
  //   price: 1000, // Placeholder price
  // };

  // // Use trip data if provided, otherwise use placeholder data
  // const tripData = trip || placeholderTrip;
  const tripData = trip;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const handleNavigate = () => {
  //   dispatch(handleChange({ name: "selectedCenter", value: trip }));
  //   navigate("/deviseForm");
  // };
  const handleChange = (event, id) => {
    handleSelect(event.target.checked, id);
  };
  // console.log(tripData);
  return (
    <Card sx={{ display: "flex", padding: "0 2rem" }}>
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => handleChange(e, tripData._id)}
            checked={tripData.selected}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
        }
      />
      <CardMedia
        component="img"
        sx={{ width: 300, height: 200 }}
        image={tripData.image}
        alt="Live from space album cover"
      />
      <CardContent sx={{ width: "50%" }}>
        <Typography gutterBottom variant="h5" component="h2">
          {tripData.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Addresse : {tripData.address}
        </Typography>
        <br />
        <Typography variant="body2" color="textSecondary" component="p">
          Description :{" "}
          {tripData.description ||
            " Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel tempore sequi modi quo quam aliquam sunt fuga laudantium at ab. Nisi, possimus quibusdam maxime obcaecati est odio repellat facere vitae."}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography gutterBottom variant="h8" component="h8">
          Tarrification : 99.99 €
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DivingTripCard;
