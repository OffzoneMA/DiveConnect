import * as React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

import DivingCenterList from "./pages/DivingCenter/DivingCenterList";
import DivingCenterDetails from "./pages/DivingCenter/DivingCenterDetails";
import DivingCenterNew from "./pages/DivingCenter/DivingCenterNew";

import DivingAssociationList from "./pages/DivingAssociation/DivingAssociationList";
import DivingAssociationNew from "./pages/DivingAssociation/DivingAssociationNew";
import DivingAssociationDetails from "./pages/DivingAssociation/DivingAssociationDetails";

import UserList from "./pages/User/UserList";
import UserNew from "./pages/User/UserNew";
import UserDetails from "./pages/User/UserDetails";

import DeviseForm from "./pages/DeviseForm";
import CustomLayout from "./components/common/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { element } from "prop-types";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute children={<CustomLayout></CustomLayout>} />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        element: <DivingCenterList />,
        path: "/diving-center/list",
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
        element: <DivingAssociationList />,
        path: "/diving-association/list",
      },
      {
        element: <DivingAssociationNew />,
        path: "/diving-association/new",
      },
      {
        element: <DivingAssociationDetails />,
        path: "/diving-association/:id",
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
        element: <DeviseForm />,
        path: "/deviseForm",
      },
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
