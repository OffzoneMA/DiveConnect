import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { clearStore, logoutUser } from "../../features/users/userSlice";
import { useDispatch } from "react-redux";
import ContactSection from "../dashbaord/ContactSection";
import Footer from "./footer";
import ProtectedRoute from "../ProtectedRoute";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    textDecoration: "none", // Remove underline from link
    color: "inherit", // Inherit color from parent
  },
  toolbar: {
    justifyContent: "space-between", // Align items to the start and end of the toolbar
    margin: "0 ",
  },
  button: {
    marginLeft: theme.spacing(2),
    textTransform: "none", // Preserve button text case
  },
}));

const CustomLayout = ({ children }) => {
  const classes = useStyles();
  const { user } = useSelector((store) => store.userState);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearStore());
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            className={classes.title}
          >
            DiveConnect
          </Typography>
          {user ? (
            <>
              <p>{user.name}</p>
              <Button
                className={classes.button}
                color="inherit"
                onClick={handleLogout}
              >
                <LogoutIcon />
              </Button>
            </>
          ) : (
            <div>
              <Button
                component={Link}
                to="/login"
                className={classes.button}
                color="inherit"
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                className={classes.button}
                color="inherit"
              >
                Register
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
      <ContactSection />
      <Footer />
    </div>
  );
};

CustomLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomLayout;
