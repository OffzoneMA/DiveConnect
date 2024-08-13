import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { batch, useSelector } from "react-redux";

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
import styled from "styled-components";
import { formatDate } from "../../../../utils";
import { useSelect } from "@mui/base";

const BookingCard = ({ center, bookingElement }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { equipments: equipmentData } = useSelector(
    (store) => store.equipmentsState
  );
  const {
    phone,
    email,
    diversLevel1,
    diversLevel2,
    diversLevel3,
    equipments,
    numberOfDivers,
    date,
    clientName,
  } = bookingElement;
  const {
    name: centerName,
    email: centerEmail,
    address,
    city,
    image,
    description,
  } = center;
  console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
  console.log(equipmentData);
  console.log(equipments);
  // equipments.map((equipment) => {
  //   equipmentData.find((eq) => {
  //     return eq._id == equipment.equipment ? console.log(eq.name) : false;
  //   });
  // });
  return (
    <Wrapper>
      <div className="section">
        <h3 className="header">les informations de client</h3>
        <div className="contente">
          <div className="row">
            <div className="info">
              <h5>Nom</h5>
              <p>{clientName}</p>
            </div>
            <div className="info">
              <h5>Telephone</h5>
              <p>{phone}</p>
            </div>
            {/* <div className="column">
            </div> */}
            <div className="info">
              <h5>Email</h5>
              <p>{email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <h3 className="header">les informations de la réservation</h3>
        <div className="contente">
          <div className="row">
            <div className="info">
              <h5>Centre de plongée</h5>
              <p>{centerName}</p>
            </div>
            <div className="info">
              <h5>Date de réservation</h5>
              <p>{formatDate(date)}</p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <h3 className="header">Détails de l'équipement</h3>
        <div className="contente">
          {equipments.length === 0 ? (
            <p>Aucun équipement</p>
          ) : (
            <div className="row">
              <div className="info">
                <h5>Equipement</h5>
              </div>
              <div className="info">
                <h5>Quantité</h5>
              </div>
            </div>
          )}
          {equipments.map((equipment) => {
            return (
              <div className="row" key={equipment.equipment}>
                <div className="info">
                  <p>
                    {
                      equipmentData.find((eq) => eq._id == equipment.equipment)
                        .name
                    }
                  </p>
                </div>
                <div className="info">
                  <p>{equipment.quantity}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="section">
        <h3 className="header">Détails de plongeur</h3>
        <div className="contente">
          <div className="row">
            <div className="info">
              <h5>Niveau de plongueur</h5>
            </div>
            <div className="info">
              <h5>Nombre de plongeurs</h5>
            </div>
          </div>
          <div className="row">
            <div className="info">
              <p>Plongeur niveau 1</p>
            </div>
            <div className="info">
              <h4>{diversLevel1}</h4>
            </div>
          </div>
          <div className="row">
            <div className="info">
              <p>Plongeur niveau 2</p>
            </div>
            <div className="info">
              <h4>{diversLevel2}</h4>
            </div>
          </div>
          <div className="row">
            <div className="info">
              <p>Plongeur niveau 3</p>
            </div>
            <div className="info">
              <h4>{diversLevel3}</h4>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem 3rem;
  margin-bottom: 2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);

  .row {
    display: flex;
    justify-content: space-between;
  }
  h4,
  h3 {
    margin-bottom: 0;
  }
  h5 {
    /* color: grey; */
  }
  p {
    margin: 0rem;
    margin-top: 0.4rem;
  }
`;
export default BookingCard;
