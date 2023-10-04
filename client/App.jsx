import React, {useState} from 'react';
import {createBrowserRouter, RouterProvider, } from "react-router-dom";
import Login from './components/Login.jsx';
import SignUp from './components/Signup.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import NewBill from './components/NewBill.jsx';
import Dashboard from './components/Dashboard.jsx';

const App = () => {
  const [bill, setBill] = useState({});
  const router = createBrowserRouter([
    {
      path: '/',
      // element: <Dashboard set={setBill} />,
      element: <Login/>
    },
    {
      path: '/login',
      // element: <Dashboard set={setBill} />,
      element: <Login/>
    },
    {
      // path: '/user/login',
      // element: <Login />,
      path: '/dashboard',
      element: <Dashboard set={setBill} />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/forgotpassword',
      element: <ForgotPassword />,
    },
    {
      path: '/user/newbill',
      element: <NewBill event={bill} />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
export default App;
