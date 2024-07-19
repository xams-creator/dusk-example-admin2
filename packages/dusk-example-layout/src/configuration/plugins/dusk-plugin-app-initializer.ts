import { definePlugin } from '@xams-framework/dusk';
import createDuskContextWebpack from '@xams-framework/dusk-plugin-context-webpack';
import createDuskLoading from '@xams-framework/dusk-plugin-loading';

export default function createDuskAppInitializer() {
    return definePlugin({
        name: 'dusk-plugin-app-initializer',
        setup(app) {
            app.use(createDuskContextWebpack()).use(createDuskLoading());
        },
    });
}

declare module '@xams-framework/dusk' {
    interface DuskApplication {}
}
