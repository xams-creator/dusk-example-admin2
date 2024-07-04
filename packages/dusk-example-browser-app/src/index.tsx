// import './public-path'
import { createApp } from '@xams-framework/dusk';

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

app.startup(<App />);

window.app = app;
