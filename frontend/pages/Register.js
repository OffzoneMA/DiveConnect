import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CustomInput from '../components/common/Input';
import CustomButton from '../components/common/Button';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50%',
    },
  },
}));

const Register = ({ setShowRegister }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { register } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(name, email, password);
      history.push('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <CustomInput label="Name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <CustomInput label="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <CustomInput label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <CustomButton type="submit" color="primary" variant="contained">
        Register
      </CustomButton>
      <Button onClick={() => setShowRegister(false)}>
        Login
      </Button>
    </form>
  );
};

Register.propTypes = {
  setShowRegister: PropTypes.func.isRequired,
};

export default Register;
