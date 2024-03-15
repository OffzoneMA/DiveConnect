import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const DivingAssociationCard = ({ divingAssociation }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {divingAssociation.name}
        </Typography>
        <Typography variant="body1">
          {divingAssociation.address}
        </Typography>
        <Typography variant="body1">
          {divingAssociation.phoneNumber}
        </Typography>
      </CardContent>
    </Card>
  );
};

DivingAssociationCard.propTypes = {
  divingAssociation: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
};

export default DivingAssociationCard;
