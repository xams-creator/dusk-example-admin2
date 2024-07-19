import ViewModelAction from '@/business/inject/actions/oms/page.action';
import { BillViewModel } from '@/examples/dynamic-component/bill';

export default class VideoAction extends ViewModelAction<BillViewModel> {
    play() {
        console.log('play 55');
        this.vm.reactive.activeKey = 'detail';
    }
}
