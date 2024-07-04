import { createApp } from '@xams-framework/dusk';

import App from '@/business/app';
import createDuskMicroApp from '@/configuration/plugins/dusk-plugin-micro-app';

import router from './configuration/router';
import './index.scss';

const app = createApp({
    container: '#root',
    redux: {
        logger: {
            collapsed: true,
        },
    },
});

app.use(createDuskMicroApp())
    .router(router)
    .startup(<App />);

window.app = app;
