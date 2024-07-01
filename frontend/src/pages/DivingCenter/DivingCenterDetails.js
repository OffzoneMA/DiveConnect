import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import CustomLayout from "../../components/common/Layout";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const DivingCenterDetails = ({ divingCenter }) => {
  const classes = useStyles();

  return (
    <CustomLayout>
      <h1>Diving Center Details</h1>
      <div className={classes.root}>
        {/* Add your diving center details components here */}
      </div>
    </CustomLayout>
  );
};

DivingCenterDetails.propTypes = {
  divingCenter: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
};

export default DivingCenterDetails;
