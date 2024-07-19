import React from 'react';
import { Link, Navigate, Outlet, createBrowserRouter } from 'react-router-dom';

import Page1 from 'src/business/pages/page1';

export default createBrowserRouter(
    [
        {
            path: '/',
            element: (
                <div>
                    <Link to={'page2'}>page2</Link>
                    <Link to={'page3'}>page3</Link>
                    <Outlet />
                </div>
            ),
            children: [
                {
                    path: 'page2',
                    element: (
                        <div>
                            <input />
                        </div>
                    ),
                },
                {
                    path: 'page3',
                    element: <div>3</div>,
                },
            ],
        },
        {
            path: '/page1',
            element: <Page1 />,
        },
        {
            path: '*',
            element: <Navigate to={'/'} />,
        },
    ],
    {
        basename: getBaseName(),
    }
);

function getBaseName() {
    if (window.__MICRO_APP_ENVIRONMENT__) {
        return window.__MICRO_APP_BASE_ROUTE__ || '/';
    }
    return process.env.PUBLIC_URL || '/';
}
