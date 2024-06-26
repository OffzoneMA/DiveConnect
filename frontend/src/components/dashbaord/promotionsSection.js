import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Paper,
  Typography,
  Button,
  Grid,
  FormControlLabel,
  Switch,
  Pagination,
  Stack,
  Autocomplete,
} from "@mui/material";
import DivingTripCard from "./DivingTripCard"; // Import the DivingTripCard component
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  paper: {
    padding: "20px",
    margin: "0 auto",
    marginBottom: "50px",
    width: "80%",
  },
  tripContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  pagination: {
    margin: "0 auto",
    marginTop: "2rem",
  },
}));

const PromotionsSection = () => {
  const classes = useStyles();
  const { divingCenters, isLoading } = useSelector(
    (store) => store.divingCentersState
  );
  const { numOfPages } = useSelector((store) => store.divingCentersState);
  const [page, setPage] = React.useState(1);
  const handleChange = (e, value) => {
    setPage(value);
    // Todo: Fetch data from the server
  };
  return (
    <Paper className={classes.paper}>
      {/* <Typography variant="h2" gutterBottom>
        Our Famous locations
      </Typography> */}
      {/* Enhanced promotions section with cards */}
      <div className={classes.tripContainer}>
        <Grid container spacing={2} className={classes.tripContainer}>
          {divingCenters.map((center) => (
            <Grid item xs={12} sm={6} md={4} key={center._id}>
              <DivingTripCard trip={center} />
            </Grid>
          ))}
        </Grid>
        <Stack className={classes.pagination} spacing={2}>
          <Pagination
            count={numOfPages}
            color="primary"
            onChange={handleChange}
          />
        </Stack>
      </div>
      <br />
      <br />
      {/* <Button variant="contained" color="primary">
        View All Promotions
      </Button> */}
    </Paper>
  );
};

export default PromotionsSection;
