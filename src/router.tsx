import React from 'react' // don't delete this line
import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Index'

import Login from './pages/login';
import User from './pages/user';
import Dashboard from './pages/dashboard';

import NotFoundPage from './pages/404';

const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'user', element: <User /> },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage />
    }
];

export const router = createBrowserRouter(routes);