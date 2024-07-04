import React from 'react';
import { Link, Navigate, Outlet, createBrowserRouter, createHashRouter } from 'react-router-dom';

import { DatePicker } from 'antd';

export default createBrowserRouter(
    [
        {
            path: '/',
            element: (
                <div>
                    browser app
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
                        <img src={`/logo192-1.png`} alt={''} />
                        <DatePicker.RangePicker showTime />
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
        basename: getBaseName(),
    }
);

function getBaseName() {
    if (window.__MICRO_APP_ENVIRONMENT__) {
        return window.__MICRO_APP_BASE_ROUTE__ || '/';
    }
    return process.env.PUBLIC_URL || '/';
}
