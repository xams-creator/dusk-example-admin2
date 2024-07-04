import React from 'react';
import { Link, Navigate, Outlet, createHashRouter } from 'react-router-dom';

export default createHashRouter(
    [
        {
            path: '/',
            element: (
                <div>
                    hash app
                    <ul>
                        <li>
                            <Link to={'/'}>home</Link>
                        </li>
                        <li>
                            <Link to={'/page1'}>page1</Link>
                        </li>
                        <li>
                            <Link to={'/page2'}>page2</Link>
                        </li>
                    </ul>
                    <Outlet />
                </div>
            ),
            children: [
                {
                    path: 'page1',
                    element: <div>page1</div>,
                },
                {
                    path: 'page2',
                    element: <div>page2</div>,
                },
                {
                    path: '*',
                    element: <div>Not Found</div>,
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
