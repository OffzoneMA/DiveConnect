import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

const CustomButton = ({ children, onClick, color, variant, disabled }) => {
  return (
    <Button onClick={onClick} color={color} variant={variant} disabled={disabled}>
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
