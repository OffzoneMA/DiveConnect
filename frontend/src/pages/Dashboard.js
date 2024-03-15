import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Typography, CircularProgress, Paper } from '@mui/material';
import CustomLayout from '../components/common/Layout';
import axios from 'axios';
import PromotionsSection from '../components/dashbaord/promotionsSection';

import ContactSection from '../components/dashbaord/ContactSection';


import BackgroundSection from '../components/dashbaord/BackgroundSection';
import Button from '../components/common/Button';
import Footer from '../components/common/footer.js';

const Dashboard = () => {
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
        setLoading(false); // Handle error by setting loading to false
      }
    };

    fetchDivingTrips();
  }, []);

  const handleFilterChange = (selectedTypes) => {
    // Implement filtering logic based on selected types
    console.log('Selected Types:', selectedTypes);
  };

  return (
    <CustomLayout>
      <BackgroundSection handleFilterChange={handleFilterChange} />
      <PromotionsSection />
      <ContactSection />
      <Footer />
    </CustomLayout>
  );
};

export default Dashboard;
