import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { batch } from "react-redux";

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
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditButton from "../../../common/EditButton";
import DeleteButton from "../../../common/DeleteButton";
import {
  // deleteDivingCenter,
  handleChange,
  getAllBookingsOfUser,
} from "../../../../features/bookings/bookingsSlice";
const useStyles = makeStyles({
  root: { width: "100%" },

  media: {
    height: 140,
  },
  card: {
    flexDirection: "row",
  },
});

const BookingCard = ({ trip, handleSelect }) => {
  const classes = useStyles();
  const tripData = trip;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Card sx={{ display: "flex", padding: "0 2rem" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {/* <button type="button">
          <EditNoteOutlinedIcon fontSize="large" />
        </button> */}
        <EditButton
          func={() => {
            batch(() => {
              dispatch(
                handleChange({
                  name: "selectedCenter",
                  value: { ...trip, edited: true },
                })
              );
              dispatch(
                handleChange({
                  name: "image",
                  value: trip.image,
                })
              );
            });
            navigate("/dashboard/center");
          }}
        />
        <DeleteButton
          func={() => {
            batch(() => {
              // dispatch(deleteDivingCenter(trip._id));
              // dispatch(getAllDivingCentersOfUser());
            });
            // navigate("/dashboard/centers");
          }}
        />
      </CardContent>
      <CardMedia
        component="img"
        sx={{ width: 300, height: 200, minWidth: 300 }}
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

export default BookingCard;
