import React from 'react';

import { definePlugin, useDusk } from '@xams-framework/dusk';

import Bill from './bill';

export default function createDuskDynamicComponent() {
    return definePlugin({
        name: 'dusk-plugin-dynamic-component',
        setup(app) {
            app.$components = {
                metadata: new Map(),
                elements: new Map(),
                actions: new Map(),
                define(key, element) {
                    this.elements.set(key, element);
                },
                get(key) {
                    return this.elements.get(key);
                },
                provide(key, action) {
                    this.actions.set(key, action);
                },
                use(key) {
                    return this.actions.get(key);
                },
            };
        },
        onReady({ app }) {
            app.$components.define('ttx.wso.bill', <Bill foo={123} />);
            app.$components.define('ttx.wso.bill2', <Bill2 />);
        },
    });
}

type ComponentOptions = {
    element: JSX.Element;
    props?: Record<string, any>;
};

declare module '@xams-framework/dusk' {
    interface DuskApplication {
        $components: {
            metadata: Map<string, ComponentOptions>;

            elements: Map<String, JSX.Element>;
            define(key: string, element: JSX.Element): void;
            get(key: string);

            actions: Map<String, any>;
            provide(key: string, action);
            use(key: string);
        };
    }
}

interface DynamicComponentProps<P = any> {
    type: string;
    props: P | any;
    fallback?: NonNullable<JSX.Element>;
}

export function DynamicComponent<P = any>({ type, props, fallback }: DynamicComponentProps<P>) {
    const app = useDusk();
    const element = app.$components.elements.get(type);
    if (!element) {
        return fallback ? React.cloneElement(fallback, props) : null;
    }
    return React.cloneElement(element, props);
}

/*
 *
 * **/

// export function Bill(props) {
//     const state = useReactive<any>({
//         vm: null,
//     });
//     useEffect(() => {
//         state.vm = props.vm;
//         return () => {
//             state.vm = null;
//         };
//     }, [props.vm, state]);
//
//     const action = props.action;
//     useEffect(() => {
//         action?.onInitialization(state);
//         return () => {
//             action?.onDestroy(state);
//         };
//     }, [action, state]);
//
//     return (
//         <div>
//             ttx.wso.bill
//             <br />
//             {!isEmpty(state.vm) && (
//                 <pre>
//                     <code>{JSON.stringify(state.vm, null, 4)}</code>
//                 </pre>
//             )}
//             <pre>
//                 <code>{JSON.stringify(props.navigation, null, 4)}</code>
//             </pre>
//         </div>
//     );
// }

class Bill2 extends React.Component<any, any> {
    componentDidMount() {
        console.log(this.props.$app);
    }

    render() {
        return <div>bill2</div>;
    }
}

export function DynamicActionComponent<P = any>({ type, props }: DynamicComponentProps<P>) {
    const action = useActions(type);
    return (
        <DynamicComponent
            type={type}
            props={{
                ...props,
                action,
            }}
        />
    );
}

export function useActions(type): any {
    const app = useDusk();
    return app.$components.actions.get(type);
}
