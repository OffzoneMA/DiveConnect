import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Paper, Grid, Typography } from '@mui/material';
import CustomLayout from '../components/common/Layout';
import theme from '../style/theme';
import DivingTypeAutocomplete from '../components/DivingTypeAutocomplete';
import DivingTripCard from '../components/DivingTripCard';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [divingTrips, setDivingTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDivingTrips = async () => {
      try {
        const response = await axios.get('https://api.example.com/diving-trips');
        setDivingTrips(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching diving trips:', error);
      }
    };

    fetchDivingTrips();
  }, []);

  const handleFilterChange = (selectedTypes) => {
    // Implement filtering logic based on selected types
    console.log('Selected Types:', selectedTypes);
  };

  const renderDivingTrips = () => {
    if (loading) {
      return <Typography>Loading...</Typography>;
    }

    if (divingTrips.length === 0) {
      return <Typography>No diving trips available.</Typography>;
    }

    return divingTrips.map((trip) => <DivingTripCard key={trip.id} trip={trip} />);
  };

  return (
    <CustomLayout>
      <h1>Dashboard</h1>
      <Paper className={classes.paper}>
        <DivingTypeAutocomplete onChange={handleFilterChange} />
      </Paper>
      <Grid container spacing={2}>
        {renderDivingTrips()}
      </Grid>
    </CustomLayout>
  );
};

export default Dashboard;
