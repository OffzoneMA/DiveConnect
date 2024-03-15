import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import DivingCenterCard from './DivingCenterCard';
import CustomLayout from '../common/Layout';

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

const DivingCenterList = ({ divingCenters }) => {
  const classes = useStyles();

  return (
    <CustomLayout>
      <h1>Diving Centers</h1>
      <div className={classes.root}>
        {divingCenters.map((divingCenter) => (
          <DivingCenterCard key={divingCenter._id} divingCenter={divingCenter} />
        ))}
      </div>
    </CustomLayout>
  );
};

DivingCenterList.propTypes = {
  divingCenters: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default DivingCenterList;
