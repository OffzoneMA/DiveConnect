import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

const CustomInput = ({ label, name, type, value, onChange, error }) => {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error}
      fullWidth
    />
  );
};

CustomInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default CustomInput;
