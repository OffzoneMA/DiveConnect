import React from "react";
import { makeStyles } from "@mui/styles";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch } from "react-redux";
import { getAllEquipments } from "../../../../features/equipments/equipmentsSlice";
import {
  createDivingCenter,
  updateDivingCenter,
} from "../../../../features/divingCenters/divingCentersSlice";

import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import {
  Paper,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  api,
  checkForUnauthorizedResponse,
  customFetch,
} from "../../../../utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearStore } from "../../../../features/users/userSlice";
import ImageInput from "../../../common/ImageInput";
// const materials = ["Stab", "Palmes", "Masque", "Détendeur"];

const useStyles = makeStyles((theme) => ({}));
function CenterEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  useEffect(() => {
    dispatch(getAllEquipments());
  }, []);

  const { divingCenters, image, selectedCenter, isLoading } = useSelector(
    (store) => store.divingCentersState
  );
  const { user } = useSelector((store) => store.userState);

  async function addCenter(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const description = document.getElementById("description").value;
    const center = {
      name,
      email,
      address,
      city,
      description,
      image,
    };
    let url = api + "/diving-centers";
    if (!email) {
      alert("Veuillez remplir le champ email");
      return;
    }
    try {
      // const res = await customFetch.post(url, center);
      await dispatch(createDivingCenter(center));
      alert("le Centre a été ajouté avec succès");
      navigate("/dashboard/centers");
    } catch (error) {
      if (error.response.status === 401) {
        console.log(error);
        // dispatch(clearStore());
      }
    }
  }
  async function updateCenter(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const description = document.getElementById("description").value;
    const center = {
      name,
      email,
      address,
      city,
      description,
      image,
    };
    let url = api + "/diving-centers";
    if (!email) {
      alert("Veuillez remplir le champ email");
      return;
    }
    try {
      // const res = await customFetch.post(url, center);
      await dispatch(updateDivingCenter(center));
      alert("le Centre a été modifié avec succès");
      navigate("/dashboard/centers");
    } catch (error) {
      if (error.response.status === 401) {
        console.log(error);
        // dispatch(clearStore());
      }
    }
  }
  return (
    <Wrapper>
      <form method="post">
        <div className="formbold-main-wrapper">
          <div className="formbold-form-wrapper">
            <div className="formbold-input">
              <div>
                <label htmlFor="name" className="formbold-form-label">
                  {" "}
                  Nom{" "}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Jane"
                  className="formbold-form-input"
                  defaultValue={
                    selectedCenter?.edited ? selectedCenter.name : null
                  }
                />
              </div>
            </div>
            <div className="formbold-input">
              <div>
                <label htmlFor="email" className="formbold-form-label">
                  {" "}
                  Email{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="johnCenter@mail.com"
                  className="formbold-form-input"
                  defaultValue={
                    selectedCenter?.edited ? selectedCenter.email : null
                  }
                />
              </div>
            </div>
            <div className="formbold-input">
              <div>
                <label htmlFor="email" className="formbold-form-label">
                  {" "}
                  Adresse{" "}
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Centre X, n° 45 avenue Mohamed V"
                  className="formbold-form-input"
                  defaultValue={
                    selectedCenter?.edited ? selectedCenter.address : null
                  }
                />
              </div>
            </div>
            <div className="formbold-input">
              <div>
                <label htmlFor="email" className="formbold-form-label">
                  {" "}
                  Ville{" "}
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Casablanca"
                  className="formbold-form-input"
                  defaultValue={
                    selectedCenter?.edited ? selectedCenter.city : null
                  }
                />
              </div>
            </div>
            {selectedCenter?.edited ? (
              isLoading ? (
                <LoadingButton
                  loading
                  loadingPosition="center"
                  variant="text"
                ></LoadingButton>
              ) : (
                <button
                  type="submit"
                  className="formbold-btn"
                  onClick={(e) => updateCenter(e)}
                >
                  Modifier le Centre
                </button>
              )
            ) : isLoading ? (
              <LoadingButton loading loadingPosition="center" variant="text">
                Ajout...
              </LoadingButton>
            ) : (
              <button
                type="submit"
                className="formbold-btn"
                onClick={(e) => addCenter(e)}
              >
                Ajouter le Centre
              </button>
            )}
          </div>
          <div className="tripInfo">
            <div className="formbold-input">
              <div>
                <label htmlFor="email" className="formbold-form-label">
                  {" "}
                  Description{" "}
                </label>
                <textarea
                  required=""
                  cols="50"
                  rows="5"
                  id="description"
                  name="description"
                  defaultValue={
                    selectedCenter?.edited ? selectedCenter.description : null
                  }
                ></textarea>
              </div>
            </div>
            <div className="formbold-input">
              <div>
                <label htmlFor="email" className="formbold-form-label">
                  {" "}
                  Image{" "}
                </label>
                <ImageInput />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  .content {
    /* display: flex;
    flex-direction: column; */
    .additional-info {
      display: none;
    }
    .additional-info.visible {
      display: block;
    }
    .toggle-button {
      cursor: pointer;
      color: blue;
      text-decoration: underline;
    }
    .item {
      width: 100%;
      overflow: hidden;
      padding: 0;
      position: relative;
      transition: all 300ms ease-out;
      /* cursor: pointer; */
      * {
        /* pointer-events: none; */
        transition: all 200ms ease;
      }
      .item-content {
        display: flex;
        flex-direction: column;

        .item {
          height: 10rem;
        }
        .text {
          margin-top: 1rem;
        }
      }
      /* @media (max-width: 768px) {
        padding: 0;
        margin-bottom: 1rem;
        height: auto;
        .item-content {
          p {
            height: auto;
          }
          span {
            font-weight: 600;
          }
        }
      } */
    }
  }
  .formbold-main-wrapper {
    display: flex;
    /* align-items: center;
    justify-content: center; */
    /* padding: 1rem; */
    width: 80%;
    margin: 1rem auto;
    border-radius: 5rem;

    /* margin: 0 auto; */
  }

  .formbold-form-wrapper {
    border-radius: 5rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    /* max-width: 550px; */
    /* width: 100%; */
    background: white;
    padding: 2rem 3rem;
    width: 50%;
    border-right: 1px solid #dde3ec;
  }
  .tripInfo {
    border-radius: 5rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    width: 50%;
    padding: 2rem 3rem;
    /* height: 100%; */
    align-self: stretch;
    background: white;
    /* text-align: center; */
    img {
      width: 100%;
      border-top-right-radius: 5rem;
      height: 70%;
      object-fit: cover;
    }
  }
  .formbold-input {
    margin-bottom: 15px;
  }
  .formbold-input-flex {
    display: flex;
    gap: 20px;
    margin-bottom: 15px;
  }
  .formbold-input-flex > div {
    width: 50%;
  }

  .formbold-input-radio-wrapper {
    margin-bottom: 28px;
  }
  .formbold-radio-flex {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .formbold-radio-label {
    font-size: 14px;
    line-height: 24px;
    color: #07074d;
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .formbold-input-radio {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  .formbold-radio-checkmark {
    position: absolute;
    top: -1px;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: #ffffff;
    border: 1px solid #dde3ec;
    border-radius: 50%;
  }
  .formbold-radio-label
    .formbold-input-radio:checked
    ~ .formbold-radio-checkmark {
    background-color: #6a64f1;
  }
  .formbold-radio-checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .formbold-radio-label
    .formbold-input-radio:checked
    ~ .formbold-radio-checkmark:after {
    display: block;
  }

  .formbold-radio-label .formbold-radio-checkmark:after {
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ffffff;
    transform: translate(-50%, -50%);
  }

  .formbold-form-input {
    width: 100%;
    padding: 13px 22px;
    border-radius: 5px;
    border: 1px solid #dde3ec;
    background: #ffffff;
    font-weight: 500;
    font-size: 16px;
    color: #07074d;
    outline: none;
    resize: none;
  }
  .formbold-form-input::placeholder {
    color: #536387;
  }
  .formbold-form-input:focus {
    border-color: #6a64f1;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
  }
  .formbold-form-label {
    color: #07074d;
    font-size: 14px;
    line-height: 24px;
    display: block;
    margin-bottom: 10px;
  }

  .formbold-btn {
    text-align: center;
    width: 100%;
    font-size: 16px;
    border-radius: 5px;
    padding: 14px 25px;
    border: none;
    font-weight: 500;
    background-color: #6a64f1;
    color: white;
    cursor: pointer;
    margin-top: 25px;
  }
  .formbold-btn:hover {
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
  }
  .column {
    flex-direction: column;
  }
  textarea {
    width: 100%;
    padding: 13px 22px;
    border-radius: 5px;
    border: 1px solid #dde3ec;
    background: #ffffff;
    font-weight: 500;
    font-size: 16px;
    color: #07074d;
    outline: none;
    resize: none;
  }
`;
export default CenterEdit;
