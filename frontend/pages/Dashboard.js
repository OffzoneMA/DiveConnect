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

const Dashboard = () => {
  const classes = useStyles();

  return (
    <CustomLayout>
      <h1>Dashboard</h1>
      <div className={classes.root}>
        {/* Add your dashboard components here */}
      </div>
    </CustomLayout>
  );
};

export default Dashboard;
