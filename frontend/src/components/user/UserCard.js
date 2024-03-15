import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const UserCard = ({ user }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {user.name}
        </Typography>
        <Typography variant="body1">
          {user.email}
        </Typography>
        <Typography variant="body1">
          {user.role}
        </Typography>
      </CardContent>
    </Card>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserCard;
