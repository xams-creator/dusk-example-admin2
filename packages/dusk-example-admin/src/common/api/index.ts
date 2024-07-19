import { axios } from '@xams-framework/dusk';

export function loadEaiData() {
    return axios.get('/mock/198/hello_world');
    // return axios.get('https://yapi.loghub.com/mock/198/hello_world');
}
