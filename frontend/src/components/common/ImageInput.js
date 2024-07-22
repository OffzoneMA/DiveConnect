import React from "react";
import styled from "styled-components";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import readFile from "../../utils/readFile";
import { useDispatch, useSelector } from "react-redux";
import { handleChange } from "../../features/divingCenters/divingCentersSlice";
import DeleteButton from "./DeleteButton";
const DropZone = () => {
  const { selectedCenter, image } = useSelector(
    (store) => store.divingCentersState
  );
  const dispatch = useDispatch();
  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    for (const file of acceptedFiles) {
      const image = await readFile(file);
      dispatch(handleChange({ name: "image", value: image }));
    }
  }, []);
  const deleteImg = () => {
    dispatch(handleChange({ name: "image", value: null }));
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".png"],
    },
  });
  useEffect(() => {
    if (selectedCenter?.edited) {
      dispatch(handleChange({ name: "image", value: selectedCenter.image }));
    }
  }, []);
  return (
    <Wrapper {...getRootProps()}>
      <input {...getInputProps()} />
      {image ? (
        <ContainerDropZoneImg src={image} deleteImg={() => deleteImg()} />
      ) : (
        <span className="dropzone-upload-message">
          <UploadFileIcon />
          <b>Drag/Upload</b> your images here.
        </span>
      )}
    </Wrapper>
  );
};
const ContainerDropZoneImg = ({ src, deleteImg }) => {
  const handleClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div className="container-img" onClick={handleClick}>
      <img src={src} alt="img" />
      <div className="remove-btn">
        <DeleteButton func={deleteImg} />
      </div>
    </div>
  );
};

const Wrapper = styled.div`
  border: 2px dashed #e7e7e7;
  min-height: 200px;
  transition: ease opacity 300ms;
  padding: 23px;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  .dropzone-upload-message {
    position: absolute;
    top: 50%;
    left: 50%;
    pointer-events: none;
    transform: translate3d(-50%, -50%, 0);
  }
  svg {
    font-size: 3rem;
    width: 100%;
  }
  b {
    color: #0088cc !important;
  }
  .container-img {
    width: 90%;
    height: 90%;
    border-radius: 1rem;
    position: relative;
  }
  .container-img.selected {
    opacity: 0.7;
  }
  .container-img.selected::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 100%;
    height: 100%;
    border: 2px solid black;
    border-left: 0;
    border-top: 0;
  }
  img {
    width: 200px;
    height: 100px;
    border-radius: 1rem;
  }
  .remove-btn {
    position: absolute;
    top: -10px;
    left: -10px;
  }
  .remove-btn svg {
    width: 25px;
    height: 25px;
  }
`;

export default DropZone;
