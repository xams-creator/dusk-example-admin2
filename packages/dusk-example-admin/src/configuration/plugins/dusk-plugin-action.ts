import Dusk, { definePlugin } from '@xams-framework/dusk';

const DUSK_APPS_ACTIONS = 'dusk.apps.@actions';
Reflect.defineMetadata(DUSK_APPS_ACTIONS, [], Dusk);

export default function createDuskAction() {
    return definePlugin({
        name: 'dusk-plugin-action',
        setup(app) {
            console.log(Reflect.getMetadataKeys(Dusk));
        },
    });
}

declare module '@xams-framework/dusk' {
    interface DuskApplication {}
}
