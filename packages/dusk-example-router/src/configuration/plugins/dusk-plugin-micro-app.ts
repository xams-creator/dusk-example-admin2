import microApp from '@micro-zoe/micro-app';
import { definePlugin } from '@xams-framework/dusk';
import createDuskContextWebpack from '@xams-framework/dusk-plugin-context-webpack';

export default function createDuskMicroApp() {
    return definePlugin({
        name: 'dusk-plugin-micro-app',
        setup(app: any) {
            app.use(createDuskContextWebpack());
            /*
             *   search: url内容最长，最稳，刷新页面后可以保存路由位置
             *   native: url最好看，但是容易出现 hash / browser 路径冲突，刷新页面后可以保存路由位置
             *   pure:   url最简短 刷新页面后不保存路由位置 适合子应用 hash
             *   state: url最简短，刷新页面后记录路由位置 适合子应用 hash
             * */
            microApp.start({
                'router-mode': 'native',
                // 'keep-router-state': true,
                // 'disable-memory-router': true,
                // shadowDOM: false,
                // disableSandbox: true,
            });
            app.$micro = microApp;
        },
    });
}
declare module '@xams-framework/dusk' {
    interface DuskApplication {
        $micro: typeof microApp;
    }
}
