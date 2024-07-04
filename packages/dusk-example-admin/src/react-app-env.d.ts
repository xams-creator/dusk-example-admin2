/// <reference types="react-scripts" />
import { DuskApplication } from '@xams-framework/dusk';
import { AxiosInstance } from 'axios';

declare global {
    interface Window {
        [index: string]: any;

        app: DuskApplication;
        axios: AxiosInstance;
    }
}
