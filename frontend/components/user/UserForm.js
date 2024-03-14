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

const UserForm = ({ onSubmit }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
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
      <CustomInput label="Email" name="email" value={formData.email} onChange={handleChange} />
      <CustomInput label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
      <CustomInput label="Role" name="role" value={formData.role} onChange={handleChange} />
      <CustomButton type="submit" color="primary" variant="contained">
        Submit
      </CustomButton>
    </form>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default UserForm;
