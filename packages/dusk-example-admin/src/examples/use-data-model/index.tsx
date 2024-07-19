import { useCallback } from 'react';

import { useMount, useReactive } from 'ahooks';
import { cloneDeep, merge } from 'lodash';

const api = {
    getViewModel: async function (tid: string, oid: string) {
        let ret: any = { tid, oid };
        switch (tid) {
            case 'ttx.wso.bill':
                switch (oid) {
                    case 'organization':
                    case 'user':
                        ret = cloneDeep({
                            tid,
                            oid,
                            reactive: {
                                activeKey: 'list',
                            },
                            actionJs: [
                                'business/inject/actions/oms/brand.action',
                                'business/inject/actions/oms/video.action',
                            ],
                            name: '组织',
                            list: {
                                actions: {
                                    actionsExportId: 'list',
                                    items: [
                                        {
                                            action: 'BrandAction.query',
                                            id: 'query',
                                            name: '查询' + oid,
                                        },
                                        {
                                            action: 'VideoAction.play',
                                            id: 'new',
                                            name: '新增' + oid,
                                        },
                                        {
                                            action: 'delete',
                                            id: 'delete',
                                            name: '删除' + oid,
                                        },
                                        {
                                            action: 'BrandAction.remoteQuery',
                                            id: 'remoteQuery',
                                            name: '远程查询',
                                        },
                                    ],
                                },
                                fields: [
                                    {
                                        field: 'ipAddress',
                                        label: 'IP',
                                        table: 'ttx_blacklist',
                                        type: 'string',
                                        args: {},
                                        layout: {},
                                    },
                                    {
                                        field: 'port',
                                        label: '端口',
                                        type: 'select',
                                        args: {},
                                        layout: {},
                                        table: 'ttx_blacklist',
                                    },
                                ],
                                grid: {
                                    actions: {
                                        actionsExportId: 'bills',
                                        items: [
                                            {
                                                colorTheme: 'primary',
                                                action: ':query',
                                                id: 'query',
                                                name: '查询',
                                            },
                                            {
                                                colorTheme: 'success',
                                                action: ':new',
                                                id: 'new',
                                                name: '新增',
                                            },
                                            {
                                                colorTheme: 'danger',
                                                action: ':delete',
                                                id: 'delete',
                                                name: '删除',
                                            },
                                            {
                                                accept: '.xls,.xlsx',
                                                action: 'imoprt',
                                                id: 'import',
                                                name: '导入',
                                                type: 'upload',
                                                sizeLimit: 3000000,
                                                url: 'import/excel/xlst/ttx_blacklist',
                                            },
                                            {
                                                action: ':exportRestGridXls',
                                                id: 'exportRestGridXls',
                                                name: '导出',
                                            },
                                        ],
                                    },
                                    name: '列表',
                                    structure: [
                                        {
                                            field: 'ipAddress',
                                            id: 'ipAddress',
                                            name: 'IP',
                                            type: 'string',
                                        },
                                        {
                                            field: 'userCode',
                                            id: 'userCode',
                                            name: '账号3',
                                            type: 'string',
                                            sortable: false,
                                            headerFilter: {},
                                        },
                                        {
                                            field: 'remark',
                                            id: 'remark',
                                            name: '备注',
                                            type: 'string',
                                        },
                                        {
                                            field: 'created',
                                            id: 'created',
                                            name: '创建时间',
                                            type: 'datetime',
                                        },
                                        {
                                            field: 'createdBy',
                                            id: 'createdBy',
                                            name: '创建用户',
                                            type: 'string',
                                        },
                                        {
                                            field: 'lastUpdated',
                                            id: 'lastUpdated',
                                            name: '更新时间',
                                            type: 'datetime',
                                        },
                                        {
                                            field: 'lastUpdatedBy',
                                            id: 'lastUpdatedBy',
                                            name: '更新用户',
                                            type: 'string',
                                        },
                                    ],
                                },
                            },
                        });
                        break;
                    default:
                        break;
                }

                break;
            default:
                break;
        }
        return ret;
    },
};

export function useViewModel<VM = Record<string, any>, DVM = Record<string, any>>(
    tid: string,
    oid: string,
    defaultViewModel?: DVM
): VM & DVM {
    const state = useReactive<{ vm: VM }>({
        // @ts-ignore
        vm: {},
    });
    const getViewModel = useCallback(() => {
        api.getViewModel(tid, oid)
            .then(vm => {
                state.vm = cloneDeep(merge({}, defaultViewModel, vm));
            })
            .finally(() => {});
    }, [tid, oid, state, defaultViewModel]);
    useMount(() => {
        getViewModel();
    });
    return state.vm as VM & DVM;
}
