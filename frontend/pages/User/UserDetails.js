import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CustomLayout from '../components/common/Layout';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const UserDetails = ({ user }) => {
  const classes = useStyles();

  return (
    <CustomLayout>
      <h1>User Details</h1>
      <div className={classes.root}>
        {/* Add your user details components here */}
      </div>
    </CustomLayout>
  );
};

UserDetails.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserDetails;
