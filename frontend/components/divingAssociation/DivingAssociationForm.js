import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CustomInput from '../common/Input';
import CustomButton from '../common/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50%',
    },
  },
}));

const DivingAssociationForm = ({ onSubmit }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <CustomInput label="Name" name="name" value={formData.name} onChange={handleChange} />
      <CustomInput label="Address" name="address" value={formData.address} onChange={handleChange} />
      <CustomInput label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      <CustomButton type="submit" color="primary" variant="contained">
        Submit
      </CustomButton>
    </form>
  );
};

DivingAssociationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default DivingAssociationForm;
