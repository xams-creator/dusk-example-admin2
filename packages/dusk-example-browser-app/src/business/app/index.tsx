import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import router from '@/configuration/router';

dayjs.locale('zh-cn');

export default function App() {
    return (
        <ConfigProvider
            componentSize="middle"
            locale={zhCN}
            button={{
                autoInsertSpace: true,
            }}
        >
            <RouterProvider router={router} />
        </ConfigProvider>
    );
}
