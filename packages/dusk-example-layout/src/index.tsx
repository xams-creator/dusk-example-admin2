import React from 'react';

import { createApp } from '@xams-framework/dusk';

import App from '@/business/app';
import createDuskAppInitializer from '@/configuration/plugins/dusk-plugin-app-initializer';

import './index.scss';

const app = createApp({
    container: '#root',
    redux: {
        logger: {
            collapsed: true,
        },
    },
});

app.use(createDuskAppInitializer())
    .startup(<App />);

window.app = app;
