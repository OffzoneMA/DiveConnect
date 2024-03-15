import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, TextField, Button, Link } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    maxWidth: 400,
    margin: 'auto',
    marginTop: theme.spacing(8),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
}));

const Register = ({ setShowRegister }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle registration submission
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Register
        </Button>
      </form>
      <Typography variant="body2" align="center" gutterBottom>
        Already have an account? <Link href="/login">Login here</Link>
      </Typography>
    </div>
  );
};

export default Register;
