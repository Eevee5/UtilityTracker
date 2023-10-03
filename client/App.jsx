import React, { useNavigate } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login.jsx';
import SignUp from './components/Signup.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import NewBill from './components/NewBill.jsx';
import Dashboard from './components/Dashboard.jsx';

const App = () => {
  const navigate = useNavigate();
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/user/login' component={Login} />
          <Route path='/user/signup' component={SignUp} />
          <Route path='/user/forgotpassword' component={ForgotPassword} />
          <Route path='/user/newbill' component={NewBill} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
