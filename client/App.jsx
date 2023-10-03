import React, {useState} from 'React';
import {createBrowserRouter, RouterProvider, } from "react-router-dom";
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
