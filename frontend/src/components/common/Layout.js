import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { clearStore, logoutUser } from "../../features/users/userSlice";
import { useDispatch } from "react-redux";
import ContactSection from "../dashbaord/ContactSection";
import Footer from "./footer";
import ProtectedRoute from "../ProtectedRoute";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { styled } from "@mui/system";
import { CssTransition } from "@mui/base/Transitions";
import { PopupContext } from "@mui/base/Unstable_Popup";
import { MenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { CiLock } from "react-icons/ci";
import { useLocation } from "react-router-dom";

const drawerWidth = 240;
const navItems = [
  { name: "Home", lien: "" },
  { name: "Diving Centers", lien: "diving-center/list" },
  { name: "Contact Us", lien: "contact-us" },
  { name: "Requests", lien: "" },
];

function CustomLayout(props) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Logo
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              to={`/${item.lien}`}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const { user } = useSelector((store) => store.userState);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearStore());
  };
  const navigate = useNavigate();
  const createHandleMenuClick = (menuItem) => {
    return () => {
      navigate(menuItem);
    };
  };
  return (
    <section className="w-full">
      <AppBar
        component="nav"
        className={` shadow-none ${isHome ? "bg-transparent" : "bg-gray-700"}`}
      >
        <Toolbar className="flex justify-between items-center h-24 container mx-auto px-6 ">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
            className="block sm:hidden"
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component={Link}
            to="/"
            className="hidden sm:block "
          >
            DiveConnect
          </Typography>
          <div className="sm:flex justify-between items-center gap-10 hidden">
            {navItems.map((item) => (
              <Typography
                component={Link}
                to={item.lien}
                className="text-white"
                // sx={{ fontSize: "1.25rem" }}
              >
                {item.name}
              </Typography>
            ))}
          </div>
          {user ? (
            <>
              {/* <p>{user.name}</p>
              <Button
                className={classes.button}
                color="inherit"
                onClick={handleLogout}
              >
                <LogoutIcon />
              </Button> */}
              <Dropdown>
                <MenuButton sx={{ display: "flex", alignItems: "center" }}>
                  {user.name}
                  <ExpandMoreIcon />{" "}
                </MenuButton>
                <Menu slots={{ listbox: AnimatedListbox }}>
                  <MenuItem onClick={createHandleMenuClick("/profile")}>
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={createHandleMenuClick("/dashboard/centers")}
                  >
                    Mes centres
                  </MenuItem>
                  <MenuItem onClick={createHandleMenuClick("/logout")}>
                    Mes associations
                  </MenuItem>
                  <MenuItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={handleLogout}
                  >
                    Log out
                    <LogoutIcon />
                  </MenuItem>
                </Menu>
              </Dropdown>
            </>
          ) : (
            <div>
              <Button
                component={Link}
                to="/login"
                className=" flex items-center gap-2"
                color="inherit"
              >
                <img
                  src="/image/lock.svg"
                  className="-translate-y-0.5"
                  alt=""
                />
                <div className="capitalize text-lg">Login</div>
              </Button>
              {/* <Button
                component={Link}
                to="/register"
                className={classes.button}
                color="inherit"
              >
                Register
              </Button> */}
            </div>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Outlet />
      {/* <ContactSection /> */}
      <Footer />
    </section>
  );
}

CustomLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default CustomLayout;
const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#99CCF3",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E6",
  700: "#0059B3",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Listbox = styled("ul")(
  ({ theme }) => `

  `
);

const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {
  const { ownerState, ...other } = props;
  const popupContext = React.useContext(PopupContext);

  if (popupContext == null) {
    throw new Error(
      "The `AnimatedListbox` component cannot be rendered outside a `Popup` component"
    );
  }

  const verticalPlacement = popupContext.placement.split("-")[0];

  return (
    <CssTransition
      className={`placement-${verticalPlacement}`}
      enterClassName="open"
      exitClassName="closed"
    >
      <Listbox {...other} ref={ref} />
    </CssTransition>
  );
});

AnimatedListbox.propTypes = {
  ownerState: PropTypes.object.isRequired,
};
