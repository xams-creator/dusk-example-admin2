import React from 'react';
import { Navigate, RouteObject, createBrowserRouter, useParams } from 'react-router-dom';

import { LoaderFunctionArgs } from '@remix-run/router/dist/utils';
import { Alert } from 'antd';
import { forEach, isFunction } from 'lodash';

import HomeContainer, { VMDynamicComponent } from '@/business/pages/home';
import Examples from '@/examples';
import { DynamicComponent } from '@/examples/dynamic-component/dusk-plugin-dynamic-component';

type Route = Omit<RouteObject, 'children'> & {
    children?: Route[];
    meta?: {
        title: string | ((route: Route, args: LoaderFunctionArgs) => string);
    };
};

function ExampleTidOid() {
    const { tid, oid } = useParams();
    console.log(tid, oid);
    return (
        <div className={'wso-example'}>
            <Alert.ErrorBoundary>
                <VMDynamicComponent navigation={{ tid, oid }} />
            </Alert.ErrorBoundary>
        </div>
    );
}

function routes(): RouteObject[] {
    function setLoader(route: Route) {
        const meta = route.meta;
        if (meta) {
            route.loader = args => {
                document.title = isFunction(meta.title) ? (document.title = meta.title?.(route, args)) : meta.title;
                return null;
            };
            route.shouldRevalidate = () => true;
        }
        if (route.children && route.children.length > 0) {
            forEach(route.children, setLoader);
        }
    }

    const pane = {
        id: '201',
        key: 'ttx.wso.bill/organization/201',
        name: '组织',
        isLeaf: true,
        tid: 'ttx.wso.bill',
        oid: 'organization',
        navigation: { id: '201', tid: 'ttx.wso.bill', oid: 'organization', parentId: '0' },
        parentId: '0',
    };
    // const pane = window.microApp.getData();
    // console.log(pane);
    const routes: Route[] = [
        {
            path: '/',
            element: <Navigate to={'/home'} replace={true} />,
        },
        {
            path: '/example',
            element: <VMDynamicComponent navigation={pane.navigation} />,
        },
        {
            path: '/example/:tid/:oid',
            element: <ExampleTidOid />,
        },
        {
            path: '/home',
            element: <HomeContainer />,
            meta: {
                title() {
                    return '首页';
                },
            },
            children: [
                // {
                //     path: '',
                //     element: <HomeRouteCards />,
                // },
                // {
                //     path: 'workspaces/:workspaceId',
                //     element: <HomeNavigate />,
                // },
                // {
                //     path: 'workspaces/:workspaceId/sources',
                //     element: <AuthenticationRoute roles={['admin']} children={<SourcesContainer />} />,
                //     meta: {
                //         title: '首页-数据源',
                //     },
                //     children: [
                //         {
                //             meta: {
                //                 title: '首页-数据源-详情',
                //             },
                //             path: ':id',
                //             element: <SourceDetail />,
                //         },
                //     ],
                // },
                // {
                //     path: 'workspaces/:workspaceId/setting',
                //     element: <AuthenticationRoute roles={['admin', 'developer']} children={<SettingContainer />} />,
                //     meta: {
                //         title: '首页-设置',
                //     },
                //     children: [
                //         {
                //             path: 'schedules',
                //             element: <ScheduleList />,
                //             meta: {
                //                 title: '首页-设置-计划任务',
                //             },
                //         },
                //         {
                //             path: 'schedules/:id',
                //             element: <ScheduleDetail />,
                //             meta: {
                //                 title: '首页-设置-计划任务-详情',
                //             },
                //         },
                //         {
                //             path: 'variables',
                //             element: <VariableList />,
                //             meta: {
                //                 title: '首页-设置-变量',
                //             },
                //         },
                //         {
                //             path: 'dashboard-variables',
                //             element: <DashboardVariableList />,
                //             meta: {
                //                 title: '首页-设置-看板变量',
                //             },
                //         },
                //         {
                //             path: 'warns',
                //             element: <WarnList />,
                //             meta: {
                //                 title: '首页-设置-预警任务',
                //             },
                //         },
                //         {
                //             path: 'warns/:id',
                //             element: <WarnDetail />,
                //             meta: {
                //                 title: '首页-设置-预警任务-详情',
                //             },
                //         },
                //         {
                //             path: 'users',
                //             element: <UserList />,
                //             meta: {
                //                 title: '首页-设置-用户',
                //             },
                //         },
                //         {
                //             path: 'logs',
                //             element: <LogList />,
                //             meta: {
                //                 title: '首页-设置-操作日志',
                //             },
                //         },
                //     ],
                // },
                // {
                //     path: 'workspaces/:workspaceId/editors/',
                //     element: <EditorsContainer />,
                //     meta: {
                //         title: '首页-编辑器',
                //     },
                //     children: [
                //         {
                //             path: '',
                //             element: <EditorCards />,
                //         },
                //         {
                //             path: 'widget/:id?',
                //             element: <WidgetEditor />,
                //             meta: {
                //                 title: '首页-编辑器-组件编辑器',
                //             },
                //         },
                //         {
                //             path: 'dashboard',
                //             element: <DashboardEditor />,
                //             meta: {
                //                 title: '首页-编辑器-看板编辑器',
                //             },
                //         },
                //     ],
                // },
                {
                    path: ':tid/*',
                    element: <span />,
                    // Component: Bill
                    meta: {
                        title: '详情',
                    },
                    // element: <ViewDetail />,
                },
                // {
                //     path: 'workspaces/:workspaceId/charts',
                //     element: <AuthenticationRoute roles={['admin', 'developer']} children={<WidgetsContainer />} />,
                //     meta: {
                //         title: '首页-数据组件',
                //     },
                //     children: [
                //         {
                //             path: ':id',
                //             element: <span />,
                //             meta: {
                //                 title: '首页-数据组件-详情',
                //             },
                //             // element: <ViewDetail />,
                //         },
                //     ],
                // },
                // {
                //     path: 'workspaces/:workspaceId/dashboards',
                //     element: <AuthenticationRoute children={<DashboardsContainer />} />,
                //     meta: {
                //         title: '首页-数据看板',
                //     },
                //     children: [
                //         {
                //             path: ':id',
                //             element: <span />,
                //             meta: {
                //                 title: '首页-数据看板-详情',
                //             },
                //             // element: <ViewDetail />,
                //         },
                //     ],
                // },
                // {
                //     path: '403',
                //     element: <Forbidden />,
                //     meta: {
                //         title: '首页',
                //     },
                // },
                // {
                //     path: '404',
                //     element: <NotFound />,
                //     meta: {
                //         title: '首页',
                //     },
                // },
                // {
                //     path: '*',
                //     element: (
                //         <AuthorizationCheckNavigate
                //             to={isLoggedIn => {
                //                 return isLoggedIn ? '/home/404' : '/login';
                //             }}
                //         />
                //     ),
                //     meta: {
                //         title: '首页',
                //     },
                // },
            ],
        },
        {
            path: '/examples',
            element: <Examples />,
            children: [
                // {
                //     path: 'dynamic-component',
                //     element: <DynamicComponentExample />,
                // },
                {
                    path: '*',
                    element: <Navigate to={'/examples'} replace={true} />,
                },
            ],
        },
        {
            path: '*',
            element: <Navigate to={'/'} replace={true} />,
        },
    ];
    forEach(routes, setLoader);
    return routes as RouteObject[];
}

export default createBrowserRouter(routes(), {
    basename: process.env.PUBLIC_URL || '/',
});
