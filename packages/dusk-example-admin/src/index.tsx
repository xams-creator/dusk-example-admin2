import { createApp } from '@xams-framework/dusk';
import createDuskContextWebpack from '@xams-framework/dusk-plugin-context-webpack';

import App from '@/business/app';

import './index.scss';

const app = createApp({
    container: '#root',
    redux: {
        logger: {
            collapsed: true,
        },
    },
});

app.use(createDuskContextWebpack()).startup(<App />);

window.app = app;
