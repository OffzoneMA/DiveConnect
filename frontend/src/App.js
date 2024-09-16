import React from "react";
import "./style.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DivingCenterList from "./pages/DivingCenter/DivingCenterList";
import DivingCenterDetails from "./pages/DivingCenter/DivingCenterDetails";
import DivingCenterNew from "./pages/DivingCenter/DivingCenterNew";
import DivingCenterRegister from "./pages/DivingCenter/DivingCenterRegister.js";
import Stats from "./pages/Stats.js";
import UserList from "./pages/User/UserList";
import UserNew from "./pages/User/UserNew";
import UserDetails from "./pages/User/UserDetails";
import DeviseForm from "./pages/DeviseForm";
import ContactUs from "./pages/ContactUs";
import Requests from "./pages/Requests";

import CustomLayout from "./components/common/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Centers from "./components/dashboard/Centers/Centers.js";
import SharedLayer from "./components/dashboard/SharedLayer.js";
import CenterEdit from "./components/dashboard/Centers/CenterEdit.js";
import Bookings from "./components/dashboard/Bookings/Bookings.js";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<CustomLayout />}>
      <Route index element={<Home />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="requests" element={<Requests />} />
      <Route path="diving-center/list" element={<DivingCenterList />} />
      <Route path="diving-center/new" element={<DivingCenterNew />} />
      <Route path="diving-center/details/:id" element={<DivingCenterDetails />} />
      <Route path="diving-center/register/:id" element={<DivingCenterRegister />} />
      <Route path="user/list" element={<UserList />} />
      <Route path="user/new" element={<UserNew />} />
      <Route path="user/:id" element={<UserDetails />} />
      <Route path="stats" element={<Stats />} />
      <Route path="deviseForm" element={
        <ProtectedRoute>
          <DeviseForm />
        </ProtectedRoute>
      } />
    </Route>
    
    <Route path="/dashboard" element={<SharedLayer />}>
      <Route path="centers" element={<Centers />} />
      <Route path="center" element={<CenterEdit />} />
      <Route path="bookings" element={<Bookings />} />
    </Route>

    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
);

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;