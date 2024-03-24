import React from 'react'; 

import ErrorPage from './ErrorPage';
import { createRoot } from 'react-dom/client';


import {
  createBrowserRouter,
  RouterProvider,
 } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import RootLayout from './Routes/RootLayout'; // Import RootLayout component
import Home from './Routes/Home';
import Details from './Routes/Details';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePage from "./Routes/ProfilePage";
import SignInPage from "./Routes/SignInPage";
import SignUpPage from "./Routes/SignUpPage";
import HomePage from './Routes/HomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/Details',
        element: <Details />
      },
      {
        path: "/login",
        element: <SignInPage />,
        noHeaderFooter: true
      },
      {
        path: "/signup",
        element: <SignUpPage />,
        noHeaderFooter: true
      },
      {
        path: "/user",
        element: <HomePage />,
        noHeaderFooter: true
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        noHeaderFooter: true
      },
      
    ]
  }
]);



createRoot(document.getElementById('root')).render(<React.StrictMode>
  <RouterProvider router={router} />
</React.StrictMode>);

reportWebVitals();