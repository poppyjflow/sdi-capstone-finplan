import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './css/index.css';
import { ThemeProvider } from '@mui/material/styles';
import RootTheme from './css/RootTheme';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthWrapper from './layouts/AuthWrapper';
import ProtectedRoutes from './layouts/ProtectedRoutes';
import PublicRoutes from './layouts/PublicRoutes';
import ErrorPage from './routes/error-page';
import Root from './routes/Root';
import Register from './routes/Register';
import Login from './routes/Login';
import UserHome from './routes/UserHome';
import loginAction from './actions/loginAction';
import registerAction from './actions/registerAction';
import CreateRequest from './routes/CreateRequest';
import  Settings  from './routes/Settings';
import loadOrgs from './loaders/loadOrgs';


const router = createBrowserRouter([
  {
    element: <AuthWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Root />,
      },
      {
        element: <PublicRoutes />,
        children: [
          {
            path: '/login',
            element: <Login />,
            action: loginAction,
          },
          {
            path: '/register',
            element: <Register />,
            action: registerAction,
          },
        ],
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: '/main',
            element: <UserHome />,
          },
          {
            path: '/new-request',
            element: <CreateRequest />,
            loader: loadOrgs,
          },
          {
            path: '/settings',
            element: <Settings />,
            loader: loadOrgs,
          },
        ]
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={RootTheme} >
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
