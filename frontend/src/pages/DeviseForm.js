import React from "react";
import { makeStyles } from "@mui/styles";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import Autocomplete from "@mui/material/Autocomplete";

import {
  Paper,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { func } from "prop-types";
import { customFetch } from "../utils";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DivingTripCard from "../components/dashbaord/DivingTripCard";
const equipmentOptions = ["Détendeur", "Stab", "Masque/Tuba", "Palmes"];

const useStyles = makeStyles((theme) => ({}));
function DeviseForm() {
  const history = useHistory();

  const { selectedCenter } = useSelector((store) => store.divingCentersState);
  useEffect(() => {
    if (!selectedCenter) {
      history.push("/");
    }
  }, []);
  const [materials, setMaterials] = useState([]);
  const classes = useStyles();
  async function sendMail(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const divesNum = document.getElementById("divesNum").value;
    const diversLevel = document.querySelector(
      'input[name="divers"]:checked'
    ).value;
    const total = document.getElementById("total").value;
    const formData = {
      name,
      email,
      phone,
      divesNum,
      diversLevel,
      total,
      center: selectedCenter,
    };
    const res = await customFetch.post("/diving-centers/deviseForm", formData);
  }
  return (
    <Wrapper>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form method="post">
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
                />
              </div>
            </div>

            <div className="formbold-input-flex">
              <div>
                <label htmlFor="email" className="formbold-form-label">
                  {" "}
                  Email{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="jhon@mail.com"
                  className="formbold-form-input"
                />
              </div>
              <div>
                <label htmlFor="phone" className="formbold-form-label">
                  {" "}
                  Téléphone{" "}
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="(+319) 555-0115"
                  className="formbold-form-input"
                />
              </div>
            </div>
            <div className="formbold-input">
              <div>
                <label htmlFor="divesNum" className="formbold-form-label">
                  {" "}
                  Nombre de plongée par personne{" "}
                </label>
                <input
                  type="number"
                  name="divesNum"
                  id="divesNum"
                  placeholder="3"
                  defaultValue={3}
                  className="formbold-form-input"
                />
              </div>
            </div>
            <div className="formbold-input-radio-wrapper">
              <label htmlFor="Divers" className="formbold-form-label">
                {" "}
                Les plongeurs{" "}
              </label>

              <div className="formbold-radio-flex">
                <div className="formbold-radio-group">
                  <label className="formbold-radio-label">
                    <input
                      className="formbold-input-radio"
                      type="radio"
                      value={1}
                      name="divers"
                      defaultChecked
                    />
                    Niveau 1<span className="formbold-radio-checkmark"></span>
                  </label>
                </div>

                <div className="formbold-radio-group">
                  <label className="formbold-radio-label">
                    <input
                      className="formbold-input-radio"
                      type="radio"
                      name="divers"
                      value={2}
                    />
                    Niveau 2<span className="formbold-radio-checkmark"></span>
                  </label>
                </div>

                <div className="formbold-radio-group">
                  <label className="formbold-radio-label">
                    <input
                      className="formbold-input-radio"
                      type="radio"
                      name="divers"
                      value={3}
                    />
                    Niveau 3<span className="formbold-radio-checkmark"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="formbold-input">
              <div>
                <label htmlFor="total" className="formbold-form-label">
                  {" "}
                  Total{" "}
                </label>
                <input
                  type="number"
                  name="total"
                  id="total"
                  placeholder="10"
                  defaultValue={10}
                  className="formbold-form-input"
                />
              </div>
            </div>
            <div className="formbold-input">
              <div>
                <Autocomplete
                  className={classes.diveTypesInput}
                  multiple
                  options={equipmentOptions}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField {...params} label="Location matériel" />
                  )}
                  onChange={(event, value) => setMaterials(value)}
                />
              </div>
            </div>

            {/* <div>
              <label for="message" class="formbold-form-label">
                {" "}
                Message{" "}
              </label>
              <textarea
                rows="6"
                name="message"
                id="message"
                placeholder="Type your message"
                class="formbold-form-input"
              ></textarea>
            </div> */}
            <button
              type="submit"
              className="formbold-btn"
              onClick={(e) => sendMail(e)}
            >
              Envoyer la demande
            </button>
          </form>
        </div>
        <div className="tripInfo">
          <img src={selectedCenter.image} alt="" />
          <h2>{selectedCenter?.name}</h2>
          <p>{selectedCenter?.address}</p>
        </div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  .content {
    display: flex;
    flex-direction: column;
    .item {
      width: 100%;
      overflow: hidden;
      display: flex;
      padding: 0;
      position: relative;
      transition: all 300ms ease-out;
      cursor: pointer;
      * {
        pointer-events: none;
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
    /* height: 100%; */
    align-self: stretch;
    background: white;
    text-align: center;
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
`;
export default DeviseForm;
