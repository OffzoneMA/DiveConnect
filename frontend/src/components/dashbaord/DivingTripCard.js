import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleChange } from "../../features/divingCenters/divingCentersSlice";
const trips = [
  "https://images.pexels.com/photos/3926382/pexels-photo-3926382.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/1647731/pexels-photo-1647731.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/754826/pexels-photo-754826.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/61125/pexels-photo-61125.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/191593/pexels-photo-191593.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/2897075/pexels-photo-2897075.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
];
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const DivingTripCard = ({ trip }) => {
  const classes = useStyles();
  console.log(trip);
  // Placeholder trip data
  const placeholderTrip = {
    imageUrl: "https://via.placeholder.com/345x140", // Placeholder image URL
    title: "Trip Title", // Placeholder title
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Ut in geometria, prima si dederis, danda sunt omnia.", // Placeholder description
    price: 1000, // Placeholder price
  };

  // Use trip data if provided, otherwise use placeholder data
  const tripData = trip || placeholderTrip;
  const random = Math.floor(Math.random() * trips.length);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(handleChange({ name: "selectedCenter", value: trip }));
    history.push("/deviseForm");
  };
  return (
    <Card className={classes.root} onClick={handleNavigate}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={trips[random]}
          title={tripData.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {tripData.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {tripData.adress}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            ville : {tripData.city}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DivingTripCard;
