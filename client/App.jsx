// import React, {useState} from 'react';
// import {createBrowserRouter, RouterProvider, } from "react-router-dom";
// import Login from './components/Login.jsx';
// import SignUp from './components/Signup.jsx';
// import ForgotPassword from './components/ForgotPassword.jsx';
// import NewBill from './components/NewBill.jsx';
// import Dashboard from './components/Dashboard.jsx';
// // import AppRouter from './AppRouter.jsx';

// const App = () => {
//   const [bill, setBill] = useState({});
//   const router = createBrowserRouter([
//     {
//       path: '/',
//       // element: <Dashboard set={setBill} />,
//       element: <Login/>
//     },
//     {
//       path: '/login',
//       // element: <Dashboard set={setBill} />,
//       element: <Login/>
//     },
//     {
//       // path: '/user/login',
//       // element: <Login />,
//       path: '/dashboard',
//       element: <Dashboard set={setBill} />,
//     },
//     {
//       path: '/signup',
//       element: <SignUp />,
//     },
//     {
//       path: '/forgotpassword',
//       element: <ForgotPassword />,
//     },
//     {
//       path: '/user/newbill',
//       element: <NewBill event={bill} />,
//     },
//   ]);
//   return (
//     <div>
//       <RouterProvider router={router} />
//     </div>
//   );
// };
// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login.jsx';
import SignUp from './components/Signup.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import NewBill from './components/NewBill.jsx';
import Dashboard from './components/Dashboard.jsx';

const App = () => {
  const [bill, setBill] = useState({});

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" render={(props) => <Dashboard {...props} set={setBill} />} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/user/newbill" render={(props) => <NewBill {...props} event={bill} />} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
