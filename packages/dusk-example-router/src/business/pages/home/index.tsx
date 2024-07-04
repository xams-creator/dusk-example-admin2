import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { ClearOutlined, FolderFilled, FolderOpenFilled, SettingOutlined } from '@ant-design/icons';
import microApp from '@micro-zoe/micro-app';
import { useNavigate } from '@xams-framework/dusk';
import { useReactive } from 'ahooks';
import { Layout, Spin } from 'antd';

import NavigationBar from '@/business/pages/home/components/navigation-bar';
import Workspace, { useWorkspaceService } from '@/business/pages/home/components/workspace';
import { listToTree } from '@/common/utils';

import Header from './components/header';
import { data } from './data';
import './index.scss';

export default function HomeContainer() {
    const { open, close, activeKey, reset, updateOne } = useWorkspaceService();
    const state = useReactive({
        activeKey,
    });
    // const navigate = useNavigate();
    // const defaultSelectedKeys = useSegmentedLocationPathNames();

    const treeData = useMemo(() => {
        return listToTree(
            data.map(item => {
                const key = `${item.id}`;
                return {
                    ...item,
                    key,
                    navigation: item,
                };
            })
        );
    }, []);
    return (
        <Layout className={'app-layout'} style={{ background: 'linear-gradient(to right bottom, #ddd6f3, #faaca8)' }}>
            <Layout.Header className={'app-layout-header'} style={{ height: 106, lineHeight: 106 }}>
                <Header
                    organization={{
                        logoUrl: '/static/images/logo.png',
                        name: '测试组织',
                    }}
                    user={{
                        avatar: '/static/images/avatar.svg',
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
                    treeData,
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
                // menu={{
                //     selectedKeys: [defaultSelectedKeys.at(-1) || ''],
                //     items: [
                //         {
                //             key: 'apps',
                //             label: '应用管理',
                //             children: apps,
                //         },
                //     ],
                //     onClick(node: any) {
                //         console.log(node);
                //         open({
                //             key: node.key,
                //             name: node.label || '组织',
                //             isLeaf: true,
                //             tid: 'ttx.wso.bill',
                //             oid: 'organization',
                //         });
                //     },
                // }}
            />
            <Layout.Content className={'app-layout-content'} style={{ padding: 0, top: 106 }}>
                {/*<div className={'xams-body-scrolled bi-workspace xams-body'}>*/}
                {/*    <Outlet />*/}
                {/*</div>*/}
                <Workspace
                    className={'xams-body-scrolled'}
                    render={pane => {
                        const navigation = pane.navigation;
                        if (!navigation.micro) {
                            return <Outlet />;
                        }
                        const micro = navigation.props.micro;
                        microApp.setData(micro.name, navigation);
                        return (
                            <React.Suspense fallback={<Spin spinning />}>
                                <micro-app
                                    {...micro}
                                    // name={navigation.appName + navigation.id}
                                    style={{ height: '100%' }}
                                />
                            </React.Suspense>
                        );
                    }}
                />
            </Layout.Content>
        </Layout>
    );
}

function useSegmentedLocationPathNames() {
    const location = useLocation();
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState(['']);
    useEffect(() => {
        setDefaultSelectedKeys(location.pathname.split('/'));
    }, [location.pathname]);
    return defaultSelectedKeys;
}

const apps = [
    {
        key: 'app0',
        label: '基座',
    },
    {
        key: 'app1',
        label: 'React子应用',
    },
    {
        key: 'app2',
        label: 'app2',
    },
    {
        key: 'app3',
        label: 'Vite子应用',
    },
];
