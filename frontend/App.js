import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import DivingCenter from './pages/DivingCenter';
import DivingAssociation from './pages/DivingAssociation';
import User from './pages/User';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/diving-center" component={DivingCenter} />
        <Route path="/diving-center/list" component={DivingCenter.List} />
        <Route path="/diving-center/new" component={DivingCenter.New} />
        <Route path="/diving-center/:id" component={DivingCenter.Details} />
        <Route path="/diving-association" component={DivingAssociation} />
        <Route path="/diving-association/list" component={DivingAssociation.List} />
        <Route path="/diving-association/new" component={DivingAssociation.New} />
        <Route path="/diving-association/:id" component={DivingAssociation.Details} />
        <Route path="/user" component={User} />
        <Route path="/user/list" component={User.List} />
        <Route path="/user/new" component={User.New} />
        <Route path="/user/:id" component={User.Details} />
      </Switch>
    </Router>
  );
}

export default App;
