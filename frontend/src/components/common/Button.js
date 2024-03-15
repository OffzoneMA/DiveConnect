import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 20, // Adjust border radius as needed
    padding: theme.spacing(1.5, 4), // Adjust padding as needed
    fontWeight: 'bold',
    boxShadow: 'none', // Remove box shadow
    '&:hover': {
      backgroundColor: theme.palette.primary.dark, // Darken background color on hover
    },
  },
}));

const CustomButton = ({ children, onClick, color, variant, disabled }) => {
  const classes = useStyles();

  return (
    <Button
      onClick={onClick}
      color={color}
      variant={variant}
      disabled={disabled}
      className={classes.button}
    >
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
};

CustomButton.defaultProps = {
  onClick: null,
  color: 'primary',
  variant: 'contained',
  disabled: false,
};

export default CustomButton;
