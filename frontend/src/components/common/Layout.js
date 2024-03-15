import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    textDecoration: 'none', // Remove underline from link
    color: 'inherit', // Inherit color from parent
  },
  toolbar: {
    justifyContent: 'space-between', // Align items to the start and end of the toolbar
  },
  button: {
    marginLeft: theme.spacing(2),
    textTransform: 'none', // Preserve button text case
  },
}));

const CustomLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" component={Link} to="/" className={classes.title}>
            DiveConnect
          </Typography>
          <div>
            <Button component={Link} to="/login" className={classes.button} color="inherit">Login</Button>
            <Button component={Link} to="/register" className={classes.button} color="inherit">Register</Button>
          </div>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

CustomLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomLayout;
