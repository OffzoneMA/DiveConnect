import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const DivingCenterCard = ({ divingCenter }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {divingCenter.name}
        </Typography>
        <Typography variant="body1">
          {divingCenter.address}
        </Typography>
        <Typography variant="body1">
          {divingCenter.phoneNumber}
        </Typography>
      </CardContent>
    </Card>
  );
};

DivingCenterCard.propTypes = {
  divingCenter: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
};

export default DivingCenterCard;
