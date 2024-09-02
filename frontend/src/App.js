import * as React from "react";
import "./style.css";

import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex
import "primereact/resources/primereact.css"; //core css
import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import DivingCenterList from "./pages/DivingCenter/DivingCenterList";
import DivingCenterDetails from "./pages/DivingCenter/DivingCenterDetails";
import DivingCenterNew from "./pages/DivingCenter/DivingCenterNew";


import Stats from "./pages/Stats.js";


import UserList from "./pages/User/UserList";
import UserNew from "./pages/User/UserNew";
import UserDetails from "./pages/User/UserDetails";

import DeviseForm from "./pages/DeviseForm";
import CustomLayout from "./components/common/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { element } from "prop-types";
import Centers from "./components/dashbaord/crud/Centers/Centers";
import SharedLayer from "./components/dashbaord/crud/SharedLayer";
import CenterEdit from "./components/dashbaord/crud/Centers/CenterEdit";
import Bookings from "./components/dashbaord/crud/Bookings/Bookings";
import ContactUs from "./pages/ContactUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <DivingCenterList />,
        path: "/diving-center/list",
      },
      {
        element: <ContactUs />,
        path: "/contact-us",
      },
      {
        element: <DivingCenterNew />,
        path: "/diving-center/new",
      },
      {
        element: <DivingCenterDetails />,
        path: "/diving-center/:id",
      },
      {
        element: <UserList />,
        path: "/user/list",
      },
      {
        element: <UserNew />,
        path: "/user/new",
      },
      {
        element: <UserDetails />,
        path: "/user/:id",
      },
      {
        element: <Stats />,
        path: "/stats",
      },
      {
        element: (
          <ProtectedRoute>
            <DeviseForm />
          </ProtectedRoute>
        ),
        path: "/deviseForm",
      },
    ],
  },
  {
    element: <SharedLayer />,
    path: "/dashboard",
    children: [
      { element: <Centers />, path: "centers" },
      {
        element: <CenterEdit />,
        path: "center",
      },
      { element: <Bookings />, path: "bookings" },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
