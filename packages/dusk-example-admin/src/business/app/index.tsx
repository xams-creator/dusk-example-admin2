import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import utc from 'dayjs/plugin/utc';

import router from '@/configuration/router';

dayjs.extend(utc);
dayjs.locale('zh-cn');

export default function App() {
    return (
        <ConfigProvider
            componentSize="middle"
            locale={zhCN}
            button={{
                autoInsertSpace: true,
            }}
            getPopupContainer={triggerNode => {
                return !triggerNode ? document.body : (document.fullscreenElement as any) || document.body;
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
