import React, { useCallback, useContext, useMemo } from 'react';

import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useReactive } from 'ahooks';
import { Button, Card, Col, Divider, Form, Modal, Row, TableProps, Tabs, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { get } from 'lodash';

import { Actions } from '@/business/common/components/action';
import { ContentPaneList } from '@/business/common/components/content-pane';
import Table from '@/business/common/components/table';
import { useVMActionsContext, useVMContext } from '@/business/pages/home';
import App from '@/examples/table';
import { useViewModel } from '@/examples/use-data-model';

export interface ViewModel {
    readonly tid: string;
    readonly oid: string;
}

export interface BillViewModel extends ViewModel {
    count: number;
    reactive: {
        activeKey?: string;
    };

    list: {
        actions: {
            items: [];
        };
        fields: any[];
        grid: {
            actions: any;
            structure: [];
        };
    };
}

export default function Bill(props) {
    const vm = useVMContext<BillViewModel>();
    const state = useReactive({
        count: 0,
        activeKey: 'list',
    });
    console.log(vm, props);
    window.vm = vm;
    window.state = state;
    return (
        <BillContext.Provider
            value={{
                vm: state,
            }}
        >
            <Tabs
                type={'line'}
                className={'sub-tabs'}
                hideAdd
                size={'small'}
                onChange={(activeKey: string) => {
                    vm.reactive.activeKey = activeKey;
                }}
                activeKey={vm.reactive.activeKey}
                items={[
                    {
                        key: 'list',
                        label: <div style={{ minWidth: 80, userSelect: 'none', textAlign: 'center' }}>列表</div>,
                        closable: false,
                        className: 'sub-wso',
                        children: <ContentPaneList1 />,
                    },
                    {
                        key: 'bill',
                        label: <div style={{ minWidth: 80, userSelect: 'none', textAlign: 'center' }}>单据</div>,
                        closable: false,
                        children: <div>123</div>,
                    },
                    {
                        key: 'detail',
                        label: <div style={{ minWidth: 80, userSelect: 'none', textAlign: 'center' }}>详情</div>,
                        closable: false,
                        children: <ContentPane />,
                    },
                ]}
            />
        </BillContext.Provider>
    );
}

export interface BillContextValue {
    vm: BillViewModel & any;
}

export const BillContext = React.createContext<BillContextValue>({
    vm: {},
});

export function useBillContext(): BillContextValue {
    return useContext(BillContext);
}

function ContentPane(props) {
    const { vm: state } = useBillContext();
    const vm = useVMContext<BillViewModel>();
    return (
        <Row>
            <Col span={12}>
                <pre>
                    <code>{JSON.stringify(props.navigation, null, 4)}</code>
                </pre>

                <pre>
                    <code>{JSON.stringify(vm, null, 4)}</code>
                </pre>
            </Col>
            <Col span={12}>
                <pre>
                    <code>{JSON.stringify(state, null, 4)}</code>
                </pre>

                <pre>
                    <code>{JSON.stringify(vm.reactive, null, 4)}</code>
                </pre>
                <Divider />
                <Button onClick={() => state.count++}>ADD</Button>

                <Button onClick={() => state.count--}>MINUS</Button>
                <Card style={{ marginTop: 12 }}>
                    <span style={{ fontSize: 40 }}>{state.count}</span>
                </Card>
            </Col>
        </Row>
    );
}

interface ContentPaneListProps {}

function ContentPaneList1(props: ContentPaneListProps) {
    const vm = useVMContext<BillViewModel>();
    const actions = useVMActionsContext();
    const initialValues = {
        valueType: 'string',
    };
    const state = useReactive<any>({
        open: false,
        selectedRowKeys: [],
        dataSource: null,
    });
    const [form] = Form.useForm();
    const query = useCallback(
        (pagination?, b?, c?, d?, e?) => {
            (async () => {
                try {
                    state.loading = true;
                    // state.pagination.pageSize = pagination.pageSize;
                    // state.pagination.current = pagination.current;
                    // const res = await api.pagingQueryDashboardVariables({
                    //     ...(pagination || state.pagination),
                    //     query: form.getFieldsValue(),
                    // });
                    state.dataSource = [
                        {
                            variableName: 'a',
                        },
                    ];
                    // state.dataSource = res.data.records;
                    // state.pagination.current = res.data.current;
                    // state.pagination.total = res.data.total;
                } catch (e) {
                } finally {
                    state.loading = false;
                }
            })();
        },
        [state]
    );

    const columns: TableProps<any>['columns'] = useMemo(() => {
        return [
            {
                title: '操作人',
                dataIndex: 'createBy',
                key: 'createBy',
                width: 120,
            },
            {
                title: '操作时间',
                dataIndex: 'createTime',
                key: 'createTime',
                render: text => {
                    if (text) {
                        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
                    }
                    return text;
                },
                width: 180,
            },
            {
                title: '操作类型',
                dataIndex: 'operationGroup',
                key: 'operationGroup',
                width: 120,
            },
            {
                title: '内容',
                dataIndex: 'operationContent',
                key: 'operationContent',
                ellipsis: true,
                width: 220,
                render: text => {
                    return (
                        <Tooltip placement="topLeft" title={text}>
                            {text}
                        </Tooltip>
                    );
                },
            },
            {
                title: '操作名称',
                dataIndex: 'operationType',
                key: 'operationType',
                width: 120,
            },
        ];
    }, []);

    window.vm = vm;
    return (
        <ContentPaneList
            adaptive
            loading={state.loading}
            form={form}
            fields={vm.list.fields}
            fieldsProps={{
                column: 4,
            }}
            actions={{
                events: actions,
                items: vm.list.actions.items,
            }}
        >
            <App />
            {/*<Table*/}
            {/*    scroll={{*/}
            {/*        x: 'max-content',*/}
            {/*    }}*/}
            {/*    rowSelection={{*/}
            {/*        onChange: (selectedRowKeys: any[]) => {*/}
            {/*            state.selectedRowKeys = selectedRowKeys;*/}
            {/*        },*/}
            {/*        selectedRowKeys: state.selectedRowKeys,*/}
            {/*    }}*/}
            {/*    rowKey={'id'}*/}
            {/*    dataSource={state.dataSource}*/}
            {/*    columns={columns}*/}
            {/*    pagination={{*/}
            {/*        ...{*/}
            {/*            pageSize: 50,*/}
            {/*            defaultPageSize: 50,*/}
            {/*            showSizeChanger: false,*/}
            {/*            pageSizeOptions: [50],*/}
            {/*            responsive: true,*/}
            {/*        },*/}
            {/*        // showSizeChanger: false,*/}
            {/*        // showTotal: (total) => {*/}
            {/*        //     return `总计 ${total} 条`;*/}
            {/*        // },*/}
            {/*        // ...pagination,*/}
            {/*    }}*/}
            {/*    onChange={(pagination, filters, sorters, extra) => {*/}
            {/*        // const sorts = Array.isArray(sorters) ? sorters : [sorters];*/}
            {/*        return query(pagination);*/}
            {/*    }}*/}
            {/*/>*/}
        </ContentPaneList>
    );
}
