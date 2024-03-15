import React, { useState } from 'react';
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
  const [selectedTypes, setSelectedTypes] = useState([]);

  const fetchDivingTrips = async () => {
    try {
      const response = await axios.get('https://api.example.com/diving-trips');
      setDivingTrips(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching diving trips:', error);
    }
  };

  const handleFilterChange = (selectedTypes) => {
    setSelectedTypes(selectedTypes);
  };

  const handleSubmit = () => {
    // You can perform any action with the selected types here
    console.log('Selected Types:', selectedTypes);
  };

  return (
    <CustomLayout>
      <h1>Dashboard</h1>
      <Paper className={classes.paper}>
        <DivingTypeAutocomplete onSubmit={handleSubmit} />
      </Paper>
      {selectedTypes.length > 0 && (
        <Paper className={classes.paper}>
          <Typography variant="h6">Selected Diving Trip Types:</Typography>
          <ul>
            {selectedTypes.map((type, index) => (
              <li key={index}>{type}</li>
            ))}
          </ul>
        </Paper>
      )}
      <Grid container spacing={2}>
        {/* Render diving trip cards here */}
      </Grid>
    </CustomLayout>
  );
};

export default Dashboard;
