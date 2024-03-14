import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DivingCenterCard from '../../components/divingCenter/DivingCenterCard';
import CustomLayout from '../../components/common/Layout';
import { useDivingCenters } from '../../contexts/DivingCenterContext';

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

const DivingCenterList = () => {
  const classes = useStyles();
  const { divingCenters } = useDivingCenters();

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

export default DivingCenterList;
