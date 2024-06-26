import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Paper } from "@mui/material";
import Button from "../common/Button";

const useStyles = makeStyles(() => ({
  paper: {
    padding: "20px",
    margin: "0 auto",
    width: "80%",
    textAlign: "center",
  },
}));

const ContactSection = () => {
  const classes = useStyles();

  return (
    <section>
      <Paper className={classes.paper}>
        <Typography variant="h2" gutterBottom>
          Get in Touch
        </Typography>
        {/* Add contact form or information here */}
        <Typography variant="body1" gutterBottom>
          For any inquiries or assistance, please contact us.
        </Typography>
        <Button variant="contained" color="primary">
          Contact Us
        </Button>
      </Paper>
    </section>
  );
};

export default ContactSection;
