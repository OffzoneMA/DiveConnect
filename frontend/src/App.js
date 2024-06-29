import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/diving-center" component={DivingCenterList} />
        <Route path="/diving-center/list" component={DivingCenterList} />
        <Route path="/diving-center/new" component={DivingCenterNew} />
        <Route path="/diving-center/:id" component={DivingCenterDetails} />
        <Route path="/diving-association" component={DivingAssociationList} />
        <Route
          path="/diving-association/list"
          component={DivingAssociationList}
        />
        <Route
          path="/diving-association/new"
          component={DivingAssociationNew}
        />
        <Route
          path="/diving-association/:id"
          component={DivingAssociationDetails}
        />
        <Route path="/user/list" component={UserList} />
        <Route path="/user/new" component={UserNew} />
        <Route path="/user/:id" component={UserDetails} />
        <Route path="/deviseForm" component={DeviseForm} />
      </Switch>
    </Router>
  );
}

export default App;
