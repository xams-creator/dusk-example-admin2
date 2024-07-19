// console.log(module.id);
import { DuskApplication } from '@xams-framework/dusk';

export default abstract class ViewModelAction<VM = any> {
    app: DuskApplication;
    vm: VM;

    constructor(app: DuskApplication, vm: VM) {
        this.app = app;
        this.vm = vm;
        this.initialization(vm);
    }

    initialization(vm: VM) {}
}
