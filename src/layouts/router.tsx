import React from 'react' // don't delete this line
import { createBrowserRouter } from 'react-router-dom';
import BaseLayout from './BaseLayout'

import Login from '../pages/login';
import User from '../pages/user';
import NotFoundPage from '../pages/404';

const routes = [
    {
        path: '/',
        element: <BaseLayout />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'user', element: <User /> },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage />
    }
];

export const router = createBrowserRouter(routes);