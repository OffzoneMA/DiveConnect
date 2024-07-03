import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/users/userSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    maxWidth: 400,
    margin: "auto",
    marginTop: theme.spacing(8),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
  socialButton: {
    marginTop: theme.spacing(2),
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Login = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.userState);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login
  };

  const handleGoogleLogin = () => {
    // Handle Google login
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [user]);
  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
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
          Login
        </Button>
      </form>
      <div className={classes.socialButton}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<FacebookIcon />}
          onClick={handleFacebookLogin}
        >
          Login with Facebook
        </Button>
      </div>
      <div className={classes.socialButton}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button>
      </div>
      <Typography variant="body2" align="center" gutterBottom>
        Don't have an account? <Link to="/register">Register here</Link>
      </Typography>
    </div>
  );
};

export default Login;
