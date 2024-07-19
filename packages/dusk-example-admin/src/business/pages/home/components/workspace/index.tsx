import React, { useCallback, useMemo } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useNamespacedSelector } from '@xams-framework/dusk';
import { Alert, Dropdown, Tabs, TabsProps } from 'antd';
import { Tab } from 'rc-tabs/es/interface';

import model, { WorkspaceState } from '@/business/inject/models/workspace.model';

import './workspace.scss';

interface WorkspaceProps extends TabsProps {
    render?: (pane: any) => React.ReactNode;
    onChange?: (activeKey: string) => void;
}

export default function Workspace({ render, onChange, ...props }: WorkspaceProps) {
    const { change, close, reload, panes, activeKey, closeAll, closeOther } = useWorkspaceService();

    const items: Tab[] = useMemo(() => {
        return (panes || []).map(pane => {
            return {
                key: pane.key,
                // children: <Outlet />,
                // children: <ChartViewDetail />,
                className: 'wso',
                children: <Alert.ErrorBoundary>{render ? render(pane) : null}</Alert.ErrorBoundary>,
                label: (
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: 'close',
                                    label: '关闭当前',
                                    onClick: () => {
                                        close(pane.key);
                                    },
                                },
                                {
                                    key: 'closeOther',
                                    label: '关闭其他',
                                    onClick: () => {
                                        closeOther(pane.key);
                                    },
                                },
                                {
                                    key: 'reload',
                                    label: '重新打开',
                                    onClick: () => {
                                        reload(pane.key);
                                    },
                                },
                                {
                                    key: 'closeAll',
                                    label: '关闭全部',
                                    onClick: () => {
                                        closeAll();
                                    },
                                },
                            ],
                        }}
                        trigger={['contextMenu']}
                    >
                        <div style={{ minWidth: 40, userSelect: 'none' }}>{pane.name}</div>
                    </Dropdown>
                ),
            };
        });
    }, [panes, close, closeOther, reload, closeAll, render]);
    const onEdit = useCallback(
        (targetKey, action) => {
            switch (action) {
                case 'add':
                    break;
                case 'remove':
                    close(targetKey);
                    break;
                default:
                    break;
            }
        },
        [close]
    );

    const onTabChange = useCallback(
        activeKey => {
            change({ key: activeKey });
            onChange?.(activeKey);
        },
        [change, onChange]
    );

    const classNames = ['bi-workspace', 'xams-body', props.className].join(' ');
    return (
        <div className={classNames}>
            <Tabs
                {...props}
                // destroyInactiveTabPane
                type="editable-card"
                hideAdd
                activeKey={activeKey}
                items={items}
                onChange={onTabChange}
                onEdit={onEdit}
            />
        </div>
    );
}

export function useWorkspaceService() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { panes, activeKey }: WorkspaceState = useNamespacedSelector(model.namespace);
    const store = useStore();

    const getState = useCallback((): WorkspaceState => {
        return (store.getState() as any)[model.namespace];
    }, [store]);

    const exist = useCallback(
        key => {
            const { panes } = getState();
            return panes.some(pane => {
                return String(key) === String(pane.key);
            });
        },
        [getState]
    );

    const change = useCallback(
        pane => {
            const { key } = pane;
            const state = getState();
            if (exist(key) && state.activeKey !== key) {
                dispatch(model.actions.change(key));
                navigate(key, { replace: true });
            }
        },
        [getState, exist, navigate, dispatch]
    );

    const open = useCallback(
        pane => {
            const { key } = pane;
            if (!exist(key)) {
                dispatch(model.actions.open(pane));
                navigate(key + location.search, { replace: true });
            } else {
                change(pane);
            }
        },
        [exist, navigate, dispatch, change]
    );

    const select = useCallback(
        pane => {
            const { key } = pane;
            dispatch(model.actions.setActiveKey(String(key)));
        },
        [dispatch]
    );

    const close = useCallback(
        key => {
            dispatch(model.actions.close(key));
            const state = getState();
            navigate(state.activeKey || '.', { replace: true });
        },
        [getState, navigate, dispatch]
    );

    const reset = useCallback(() => {
        dispatch(model.actions.reset());
    }, [dispatch]);

    const closeAll = useCallback(() => {
        reset();
        setTimeout(() => {
            navigate('.', { replace: true });
        }, 0);
    }, [navigate, reset]);

    const closeOther = useCallback(
        key => {
            dispatch(model.actions.closeOther(key));
            navigate(key || '.', { replace: true });
        },
        [dispatch, navigate]
    );

    const reload = useCallback(
        key => {
            const state = getState();
            const pane = state.panes.find(pane => {
                return pane.key === key;
            });
            close(key);
            setTimeout(() => open(pane));
        },
        [getState, close, open]
    );

    const updateOne = useCallback(
        pane => {
            dispatch(model.actions.updateOne(pane));
        },
        [dispatch]
    );

    return {
        reset,
        open,
        close,
        closeAll,
        change,
        select,
        closeOther,
        reload,
        activeKey,
        panes,
        updateOne,
    };
}
