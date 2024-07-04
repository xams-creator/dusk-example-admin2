import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import React16 from '@/business/pages/apps/react16';
import React17 from '@/business/pages/apps/react17';
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
                // {
                //     path: 'app1',
                //     element: (
                //         <micro-app name={'app1'} url='http://localhost:1341/' />
                //     ),
                // },
                // {
                //     path: 'app2',
                //     element: <micro-app name={'app2'} url="http://localhost:3000" style={{ height: '100%' }} />,
                // },
                // {
                //     path: 'app3',
                //     element: (
                //         <micro-app name={'app3'} iframe={true} url='http://localhost:1342' style={{ height: '100%' }} />
                //     ),
                // },
                // {
                //     path: 'app4',
                //     element: (
                //         <micro-app name={'app4'} iframe url='http://192.168.110.30:9010' style={{ height: '100%' }} />
                //     ),
                // },
                // {
                //     path: 'react16',
                //     element: <React16 />,
                // },
                {
                    path: 'react17-browser',
                    element: <React17 />,
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
