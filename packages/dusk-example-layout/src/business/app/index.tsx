import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import router from '@/configuration/router';

export default function App() {
    return (
        <ConfigProvider
            componentSize="middle"
            button={{
                autoInsertSpace: true,
            }}
            tree={{
                className: 'cbt-bi-tree',
            }}
            warning={{
                strict: false,
            }}
            theme={{
                token: {
                    colorPrimary: '#5072e0',
                    colorPrimaryBg: '#f0f6ff',
                    fontSizeHeading1: 28,
                    fontSizeHeading2: 24,
                    fontSizeHeading3: 22,
                    fontSize: 14,
                },
            }}
        >
            <RouterProvider router={router} />
        </ConfigProvider>
    );
}
