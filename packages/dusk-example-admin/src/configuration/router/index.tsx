import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import HomeContainer from '@/business/pages/home';

export default createBrowserRouter(
    [
        {
            path: '/',
            element: <Navigate to={'/apps'} />,
        },
        {
            path: '/apps',
            element: <HomeContainer />,
            children: [
                {
                    path: 'app001',
                    element: <div>app001基座路由</div>,
                },
                {
                    path: 'app002',
                    element: <div>app002基座路由-通过path</div>,
                },
                {
                    path: '*',
                    element: <span />,
                },
            ],
        },
        {
            path: '*',
            element: <Navigate to={'/'} />,
        },
    ],
    {
        basename: process.env.PUBLIC_URL || '/',
    }
);
