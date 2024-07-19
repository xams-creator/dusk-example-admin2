// console.log(module.id);
import { Modal, message } from 'antd';
import { merge, set } from 'lodash';



import ViewModelAction from '@/business/inject/actions/oms/page.action';
import { loadEaiData } from '@/common/api';
import { BillViewModel } from '@/examples/dynamic-component/bill';


let count = 0;

class BrandAction extends ViewModelAction<BillViewModel> {
    count = 0;

    async query() {
        // console.log(item, b, c);
        // item.name = '123';
        this.vm.list.fields[0].label = String(++count);
        console.log(++this.count, count);
    }

    async remoteQuery() {
        const { data } = await loadEaiData();
        Modal.info({
            content: (
                <pre>
                    <code>{JSON.stringify(data, null, 4)}</code>
                </pre>
            ),
        });
    }

    initialization(vm: BillViewModel): void {
        this.vm.list.fields[0].label = String(count);

        console.log(this.vm.list.fields[1]);
        merge(this.vm.list.fields[1], {
            itemProps: {
                initialValue: 1,
            },
            widgetProps: {
                options: [
                    {
                        label: '测试',
                        value: 1,
                    },
                    {
                        label: '实测',
                        value: 2,
                    },
                ],
                onChange(a, b, c) {
                    console.log(a, b, c);
                },
            },
        });
    }
}

export default BrandAction;

// // @ts-ignore
// if (module.hot) {
//     // @ts-ignore
//     module.hot.accept();
//     // @ts-ignore
//     module.hot.dispose(() => {
//         const REG = /\.(tsx|ts|js|jsx)/;
//         const paths = module.id.split('/');
//         const path = paths[paths.length - 1].replace(REG, '');
//         import('./' + path).then((module) => {
//             const app = window.__DUSK_PLUGIN_HMR_APP_RUNTIME__;
//             if (app && module) {
//                 const Action = module.default;
//                 if (Action) {
//                     // console.log(Action);
//                     // const action = new Action();
//                     // action.say();
//                     // app._mm.remove(model.namespace);
//                     // app.define(model);
//                 }
//             }
//         });
//     });
// }
