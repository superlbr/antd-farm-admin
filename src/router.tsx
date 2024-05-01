import React from 'react' // don't delete this line
import { createBrowserRouter } from 'react-router-dom';
import lazyload from './utils/lazyload'
import Layout from './layout'

import Login from './pages/login';
import User from './pages/user';

const Dashboard = lazyload(() => import('./pages/dashboard'));
import NotFoundPage from './pages/404';

const routes = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <Layout />,
        children: [
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