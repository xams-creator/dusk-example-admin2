import React, { useContext, useEffect, useMemo, useState } from 'react';

import { ClearOutlined, FolderFilled, FolderOpenFilled, SettingOutlined } from '@ant-design/icons';
import { useDusk } from '@xams-framework/dusk';
import { useCreation, useReactive } from 'ahooks';
import { Layout } from 'antd';
import { isEmpty } from 'lodash';

import NavigationBar from '@/business/pages/home/components/navigation-bar';
import Workspace, { useWorkspaceService } from '@/business/pages/home/components/workspace';
import { listToTree } from '@/common/utils';
import { DynamicComponent } from '@/examples/dynamic-component/dusk-plugin-dynamic-component';
import { useViewModel } from '@/examples/use-data-model';

import Header from './components/header';
import './index.scss';

export default function HomeContainer() {
    const { open, close, activeKey, reset, updateOne } = useWorkspaceService();
    const state = useReactive({
        activeKey,
    });
    return (
        <Layout className={'app-layout'} style={{ background: 'linear-gradient(to right bottom, #ddd6f3, #faaca8)' }}>
            <Layout.Header className={'app-layout-header'} style={{ height: 106, lineHeight: 106 }}>
                <Header
                    organization={{
                        logoUrl: `${process.env.PUBLIC_URL}/static/images/logo.png`,
                        name: '测试组织',
                    }}
                    user={{
                        avatar: `${process.env.PUBLIC_URL}/static/images/avatar.svg`,
                        name: '张三',
                    }}
                    dropdown={{
                        menu: {
                            items: [
                                {
                                    key: 'setting',
                                    icon: <SettingOutlined />,
                                    label: <span style={{ marginLeft: 8 }}>系统设置</span>,
                                    onClick: () => {
                                        // dispatch(app.$setting.actions.open());
                                    },
                                },
                                {
                                    key: 'clear',
                                    icon: <ClearOutlined />,
                                    label: <span style={{ marginLeft: 8 }}>清除缓存</span>,
                                    onClick: () => {
                                        sessionStorage.clear();
                                    },
                                },
                            ],
                        },
                    }}
                />
            </Layout.Header>
            <NavigationBar.Tree
                tree={{
                    selectedKeys: [activeKey as string],
                    treeData: listToTree(
                        data.map(item => {
                            const key = `${item.tid}/${item.oid}/${item.id}`;
                            return {
                                ...item,
                                key,
                                navigation: item,
                            };
                        })
                    ),
                    fieldNames: { key: 'key', title: 'name' },
                    icon: (props: any) => {
                        if (props.isLeaf) {
                            return null;
                        }
                        return props.expanded ? <FolderOpenFilled /> : <FolderFilled />;
                    },
                    onClick(event, node) {
                        if (node.isLeaf) {
                            open(node);
                        }
                        state.activeKey = node.key as string;
                    },
                }}
            />
            <Layout.Content className={'app-layout-content'} style={{ padding: 0, top: 106 }}>
                <Workspace
                    className={'xams-body-scrolled'}
                    render={pane => {
                        return <VMDynamicComponent navigation={pane.navigation} />;
                    }}
                />
            </Layout.Content>
        </Layout>
    );
}

const data = [
    {
        id: '1',
        name: '目录1',
        isLeaf: false,
        parentId: '0',
    },
    {
        id: '101',
        name: '订单',
        isLeaf: true,
        tid: 'ttx.wso.bill',
        oid: 'order',
        parentId: '1',
    },
    {
        id: '102',
        name: '入库单',
        isLeaf: true,
        tid: 'ttx.wso.bill',
        oid: 'receipt_header',
        parentId: '1',
    },
    {
        id: '201',
        name: '组织',
        isLeaf: true,
        tid: 'ttx.wso.bill',
        oid: 'organization',
        parentId: '0',
    },
    {
        id: '301',
        name: '用户',
        isLeaf: true,
        tid: 'ttx.wso.bill',
        oid: 'user',
        parentId: '0',
    },
    {
        id: '401',
        name: '角色',
        isLeaf: true,
        tid: 'ttx.wso.bill2',
        oid: 'rule',
        parentId: '0',
    },
] as any;

interface VMDynamicComponentProps {
    navigation: any;
}

export function VMDynamicComponent<T>(props: VMDynamicComponentProps) {
    const app = useDusk();
    const vm = useViewModel<T>(props.navigation.tid, props.navigation.oid);
    const Actions = useActionJs(vm);
    const actions = useCreation(() => {
        const actions = {};
        Actions.forEach(Action => {
            actions[Action.name] = new Action(app, vm);
        });
        return actions;
    }, [Actions, app]);
    return !isEmpty(vm) ? (
        <VMContext.Provider value={vm}>
            <VMActionsContext.Provider value={actions}>
                <DynamicComponent
                    type={props.navigation.tid}
                    props={{
                        navigation: props.navigation,
                        $app: app,
                    }}
                />
            </VMActionsContext.Provider>
        </VMContext.Provider>
    ) : null;
}

export interface VMContextValue<T> {
    vm: T;
}

export const VMContext = React.createContext<any>({
    vm: {},
});

export function useVMContext<T = any>(): T {
    return useContext(VMContext);
}

export interface VMActionsContextValue<T> {
    actions: Record<string, any>;
}

export const VMActionsContext = React.createContext<any>({
    actions: {},
});

export function useVMActionsContext() {
    return useContext(VMActionsContext);
}

function useActionJs(vm: any): any[] {
    return useMemo(() => {
        const actionJs = vm.actionJs;
        if (!actionJs) {
            return [];
        }

        const rets: any[] = [];
        actionJs.forEach(js => {
            const module = require(`@/${js}`).default;
            rets.push(module);
        });
        return rets;
    }, [vm.actionJs]);
}
