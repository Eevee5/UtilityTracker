import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Dashboard" component={Dashboard} />
        {/* <Route path="/Signup" component={Dashboard} />
        <Route path="/Dashboard" component={Dashboard} /> */}
      </Switch>
    </Router>
  );
};

export default AppRouter;
