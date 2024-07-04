import { createDuskModel } from '@xams-framework/dusk';
import { TabPaneProps } from 'antd';
import { get, merge } from 'lodash';

import { data } from '@/business/pages/home/data';

export interface WorkspaceState {
    panes: WorkspacePane[];
    activeKey: string | undefined;
}

export interface WorkspacePane extends TabPaneProps {
    key: string;
    type: string;
    name: string;
    title: string;
}

const model = createDuskModel({
    namespace: 'home/workspace',
    initialState: (): WorkspaceState => {
        const local = localStorage.getItem('workspace.state');
        if (local) {
            const state = JSON.parse(local);
            const newPanes: any[] = [];
            const panes = state.panes.forEach(pane => {
                const newItem = data.find(item => {
                    return item.id === pane.id;
                });
                if (newItem) {
                    pane.navigation = newItem;
                    newPanes.push(pane);
                }
            });
            return {
                panes: newPanes,
                activeKey: state.activeKey,
            };
        }
        return {
            panes: [],
            activeKey: undefined,
        };
    },
    reducers: {
        reset(state) {
            state.panes = [];
            state.activeKey = undefined;
        },
        open(state, { payload: pane }) {
            state.activeKey = String(pane.key);
            state.panes.push(pane);
        },
        close(state, { payload: targetKey }) {
            const closeKey = String(targetKey || state.activeKey);
            const panes = state.panes.filter(pane => {
                return pane.key !== closeKey;
            });
            state.panes = panes;
            state.activeKey =
                closeKey === state.activeKey
                    ? panes.length > 0
                        ? panes[panes.length - 1].key
                        : undefined
                    : state.activeKey;
        },
        closeOther(state, { payload }) {
            state.activeKey = payload;
            const pane = state.panes.find(pane => {
                return pane.key === payload;
            });
            state.panes = pane ? [pane] : [];
        },
        change(state, { payload }) {
            const key = String(payload);
            const pane = state.panes.find(pane => {
                return pane.key === key;
            });
            state.activeKey = pane ? key : state.activeKey;
        },
        setActiveKey(state, { payload }) {
            state.activeKey = payload;
        },
        updateOne(state, { payload }) {
            const index = state.panes.findIndex(pane => pane.id === payload.id);
            merge(get(state.panes, [index]), payload);
        },
    },
    effects: {
        reload(dispatch, state, action, { model }) {
            const key = state.activeKey;
            const pane = state.panes.find(pane => {
                return pane.key === key;
            });
            dispatch(model.actions.close(key));
            setTimeout(() => dispatch(model.actions.open(pane)));
        },
        setInitializationData(dispatch, state, action, { app }) {},
    },
    onStateChange(oldState, newState) {
        localStorage.setItem('workspace.state', JSON.stringify(newState));
    },
});

export default model;
