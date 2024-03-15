import React from 'react';
import { makeStyles } from '@mui/styles';
import { Paper, Typography, Button, Grid } from '@mui/material';
import DivingTripCard from './DivingTripCard'; // Import the DivingTripCard component

const trips = [
  {
    id: 3,
    title: 'Maldives Underwater Paradise',
    description: 'Indulge in the beauty of the Maldives with our luxury diving packages. Dive into crystal-clear waters and swim alongside colorful fish and coral formations.',
    price: 1800,
    imageUrl: 'https://images.pexels.com/photos/3926382/pexels-photo-3926382.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    id: 4,
    title: 'Hawaiian Island Expedition',
    description: 'Experience the enchanting underwater world of Hawaii. Encounter sea turtles, dolphins, and tropical fish as you explore the Hawaiian coastline.',
    price: 1600,
    imageUrl: 'https://images.pexels.com/photos/1647731/pexels-photo-1647731.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    id: 5,
    title: 'Egyptian Red Sea Adventure',
    description: 'Journey to the depths of the Red Sea in Egypt. Discover ancient ruins and vibrant marine life in one of the world\'s most renowned diving destinations.',
    price: 1400,
    imageUrl: 'https://images.pexels.com/photos/754826/pexels-photo-754826.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },

    {
      id: 1,
      title: 'Ocean Adventure in the Caribbean',
      description: 'Embark on an unforgettable ocean adventure in the Caribbean. Explore pristine waters, sandy beaches, and vibrant marine life.',
      price: 1500,
      imageUrl: 'https://images.pexels.com/photos/61125/pexels-photo-61125.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },

    {
      id: 3,
      title: 'Exploring the Great Barrier Reef',
      description: 'Experience the wonders of the Great Barrier Reef. Dive into the world\'s largest coral reef system and encounter diverse marine species.',
      price: 1800,
      imageUrl: 'https://images.pexels.com/photos/191593/pexels-photo-191593.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      id: 4,
      title: 'Diving Adventure in Hawaii',
      description: 'Embark on a diving adventure in Hawaii. Explore underwater caves, lava formations, and encounter marine creatures unique to the Hawaiian islands.',
      price: 1600,
      imageUrl: 'https://images.pexels.com/photos/2897075/pexels-photo-2897075.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },

  ];



const useStyles = makeStyles(() => ({
  paper: {
    padding: '20px',
    marginBottom: '50px',
  },
  tripContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
}));

const PromotionsSection = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h2" gutterBottom>
        Our Famous locations
      </Typography>
      {/* Enhanced promotions section with cards */}
      <div className={classes.tripContainer}>
      <Grid container spacing={2} className={classes.tripContainer}>
        {trips.map((trip) => (
          <Grid item xs={12} sm={6} md={4} key={trip.id}>
            <DivingTripCard trip={trip} />
          </Grid>
        ))}
      </Grid>
      </div>
      <br/>
      <br/>
      <Button variant="contained" color="primary">
        View All Promotions
      </Button>
    </Paper>
  );
};

export default PromotionsSection;