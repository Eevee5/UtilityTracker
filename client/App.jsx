<<<<<<< HEAD
import React, {useState} from 'React';
import {createBrowserRouter, RouterProvider, } from "react-router-dom";
=======
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
>>>>>>> 5de3f8b914d6d24a77aeaca7cab4b299175f1a7e
import Login from './components/Login.jsx';
import SignUp from './components/Signup.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import NewBill from './components/NewBill.jsx';
import Dashboard from './components/Dashboard.jsx';

const App = () => {
  const [bill, setBill] = useState({});
  const router = createBrowerRouter([
    {
      path: '/',
      element: <Dashboard set={setBill} />,
    },
    {
      path: '/user/login',
      element: <Login />,
    },
    {
      path: '/user/signup',
      element: <SignUp />,
    },
    {
      path: '/user/forgotpassword',
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
