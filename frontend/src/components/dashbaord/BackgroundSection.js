import React from "react";
import { makeStyles } from "@mui/styles";
import DivingSearchBar from "./DivingSearchBar";

const useStyles = makeStyles(() => ({
  section: {
    position: "relative",
    height: "800px",
    marginBottom: "20px",
    background:
      "url(https://getwallpapers.com/wallpaper/full/f/8/6/1135886-widescreen-scuba-diving-wallpaper-1920x1080-htc.jpg) center/cover no-repeat",
  },
  searchBar: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const BackgroundSection = () => {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <div className={classes.searchBar}>
        <DivingSearchBar/>
      </div>
    </section>
  );
};

export default BackgroundSection;
