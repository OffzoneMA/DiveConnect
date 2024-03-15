import React from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

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

  // Placeholder trip data
  const placeholderTrip = {
    imageUrl: 'https://via.placeholder.com/345x140', // Placeholder image URL
    title: 'Trip Title', // Placeholder title
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Ut in geometria, prima si dederis, danda sunt omnia.', // Placeholder description
    price: 1000, // Placeholder price
  };

  // Use trip data if provided, otherwise use placeholder data
  const tripData = trip || placeholderTrip;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={tripData.imageUrl}
          title={tripData.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {tripData.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {tripData.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price: ${tripData.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DivingTripCard;