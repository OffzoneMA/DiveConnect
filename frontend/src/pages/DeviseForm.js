import React from "react";
import { makeStyles } from "@mui/styles";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch } from "react-redux";
import { getAllEquipments } from "../features/equipments/equipmentsSlice";
import {
  Paper,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { func } from "prop-types";
import { api, checkForUnauthorizedResponse, customFetch } from "../utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DivingTripCard from "../components/dashbaord/DivingTripCard";
import axios from "axios";
import { clearStore } from "../features/users/userSlice";
// const materials = ["Stab", "Palmes", "Masque", "Détendeur"];
const useStyles = makeStyles((theme) => ({}));
function DeviseForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  useEffect(() => {
    dispatch(getAllEquipments());
  }, []);

  const { equipments } = useSelector((store) => store.equipmentsState);
  const { divingCenters } = useSelector((store) => store.divingCentersState);
  const { user } = useSelector((store) => store.userState);
  useEffect(() => {
    if (!divingCenters.length) {
      navigate("/diving-center/list");
    }
  }, []);
  const [diversLevel1, setDiversLevel1] = useState(1);
  const [diversLevel2, setDiversLevel2] = useState(1);
  const [diversLevel3, setDiversLevel3] = useState(1);
  const [total, setTotal] = useState(3);
  const [materialQuantities, setMaterialQuantities] = useState({});
  const handleMaterialChange = (e, materialId) => {
    const value = e.target.value;
    setMaterialQuantities((prev) => ({ ...prev, [materialId]: value }));
  };
  async function sendMail(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const divesNum = document.getElementById("divesNum").value;

    const form = {
      formData: {
        name,
        email,
        phone,
        divesNum,
        diversLevel1,
        diversLevel2,
        diversLevel3,
        total,
      },
      materials: materialQuantities,
      centers: divingCenters.filter((center) => center.selected),
      user,
    };
    let url = api + "/diving-centers/deviseForm";
    if (!email) {
      alert("Veuillez remplir le champ email");
      return;
    }
    try {
      const res = await customFetch.post(url, form);
    } catch (error) {
      if (error.response.status === 401) {
        console.log(error);
        // dispatch(clearStore());
      }
    }
    // if (res.ok) {
    //   alert("Votre demande a été envoyée avec succès");
    // } else {
    //   alert("Une erreur s'est produite, veuillez réessayer");
    // }
  }
  const qst = useRef();
  const [showFqs, setShowFqs] = useState(false);
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  const openFAQs = () => {
    let e = document.querySelector(".item");
    const allEquipments = [...qst.current.querySelectorAll(".item")];
    allEquipments.forEach((x) => {
      if (e !== x) {
        x.style = `height:${x.querySelector("span").offsetHeight}px`;
        x.classList.remove("open");
      }
    });

    const item = e;
    const span = item.querySelector("span");
    const content = item.querySelector(".text");
    item.style = `height: ${
      item.classList[1] !== "open"
        ? content.offsetHeight + span.offsetHeight + 40
        : span.offsetHeight
    }px`;
    e.classList.toggle("open");
  };

  useEffect(() => {
    window.addEventListener("resize", () => setwindowWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    const items = [...qst.current.querySelectorAll(".item")];
    items.forEach((x) => {
      const span = x.querySelector("span");
      x.style = `height:${span.offsetHeight}px`;
      x.classList.remove("open");
    });
  }, [showFqs, windowWidth]);
  useEffect(() => {
    setTotal(
      parseInt(diversLevel1) + parseInt(diversLevel2) + parseInt(diversLevel3)
    );
  }, [diversLevel1, diversLevel2, diversLevel3]);
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
            <br />
            <label htmlFor="phone" className="formbold-form-label">
              {" "}
              Les plongueurs{" "}
            </label>
            <div className="formbold-input-flex">
              <div>
                <label htmlFor="email" className="formbold-form-label">
                  {" "}
                  Niveau 1{" "}
                </label>
                <input
                  type="number"
                  name="diversLevel1"
                  defaultValue={diversLevel1}
                  className="formbold-form-input"
                  onChange={(e) => {
                    setDiversLevel1(e.target.value);
                  }}
                  min={0}
                />
              </div>
              <div>
                <label htmlFor="phone" className="formbold-form-label">
                  {" "}
                  Niveau 2{" "}
                </label>
                <input
                  type="number"
                  name="diversLevel2"
                  defaultValue={diversLevel2}
                  className="formbold-form-input"
                  onChange={(e) => {
                    setDiversLevel2(e.target.value);
                  }}
                  min={0}
                />
              </div>
              <div>
                <label htmlFor="phone" className="formbold-form-label">
                  {" "}
                  Niveau 3{" "}
                </label>
                <input
                  type="number"
                  name="diversLevel3"
                  defaultValue={diversLevel3}
                  className="formbold-form-input"
                  onChange={(e) => {
                    setDiversLevel3(e.target.value);
                  }}
                  min={0}
                />
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
                  value={total}
                  className="formbold-form-input"
                  disabled
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
          </div>
          <div className="tripInfo">
            Location matériel <Checkbox onChange={openFAQs} />
            <div className="content" ref={qst}>
              <div>
                <div className="item">
                  <div className="item-content">
                    <span> </span>
                    <div className="text">
                      {equipments.map((material) => {
                        return (
                          <div className="formbold-input" key={material._id}>
                            <div>
                              <label className="formbold-form-label">
                                {" "}
                                la quantité de {material.name}{" "}
                              </label>
                              <input
                                type="number"
                                name={[`material-${material._id}`]}
                                id={[`material-${material._id}`]}
                                placeholder="10"
                                defaultValue={0}
                                min={0}
                                max={material.quantity}
                                className="formbold-form-input"
                                onChange={(e) =>
                                  handleMaterialChange(e, material._id)
                                }
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="formbold-input">
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
            {materials.map((material) => {
              return (
                <div className="formbold-input">
                  <div>
                    <label htmlFor="total" className="formbold-form-label">
                      {" "}
                      la quantité de {material}{" "}
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
              );
            })} */}
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
`;
export default DeviseForm;
