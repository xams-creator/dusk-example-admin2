import { BusinessError } from '@xams-framework/common';
import { definePlugin } from '@xams-framework/dusk';
import createDuskContextWebpack from '@xams-framework/dusk-plugin-context-webpack';
import createDuskHmr from '@xams-framework/dusk-plugin-hmr';
import createDuskLoading from '@xams-framework/dusk-plugin-loading';
import { message } from 'antd';

import createDuskAction from '@/configuration/plugins/dusk-plugin-action';
import createDuskDynamicComponent from '@/examples/dynamic-component/dusk-plugin-dynamic-component';

export default function createDuskAppInitializer() {
    return definePlugin({
        name: 'dusk-plugin-app-initializer',
        setup(app) {
            // @ts-ignore
            // app.$context = require.context('src/business/inject', true, /\.(tsx|ts|js|jsx)$/);
            app.use(createDuskContextWebpack())
                .use(createDuskHmr() as any)
                .use(
                    createDuskLoading({
                        excludes: [],
                    }) as any
                )
                .use(createDuskDynamicComponent())
                .use(createDuskAction());
            app.$message = message;
        },
        onMounted({ app }) {
            app.$store.dispatch({
                type: 'home/workspace/open',
                payload: {
                    id: '201',
                    key: 'ttx.wso.bill/organization/201',
                    name: '组织',
                    isLeaf: true,
                    tid: 'ttx.wso.bill',
                    oid: 'organization',
                    navigation: {
                        id: '201',
                        tid: 'ttx.wso.bill',
                        oid: 'organization',
                        parentId: '0',
                    },
                    parentId: '0',
                },
            });
        },
        onHmr({ app }) {
            const model = app.models['home/workspace'];
            app.$store.dispatch(model.commands.reload());
        },
        onError({ app }, next, msg, event) {
            if (event.type === 'unhandledrejection') {
                (event as PromiseRejectionEvent).promise.catch(error => {
                    if (error instanceof BusinessError) {
                        message.destroy();
                        const close = message.error({
                            content: msg,
                            onClick() {
                                close();
                            },
                        });
                    }
                });
            }
            // event.preventDefault();
            next();
        },
    });
}

declare module '@xams-framework/dusk' {
    interface DuskApplication {
        $message: typeof message;
        $context: any;
    }
}
