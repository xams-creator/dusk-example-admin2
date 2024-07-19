import { createDuskModel } from '@xams-framework/dusk';
import { TabPaneProps } from 'antd';
import { get, merge } from 'lodash';

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

export default createDuskModel({
    namespace: 'home/workspace',
    initialState: {
        panes: [],
        activeKey: undefined,
    } as WorkspaceState,
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
    },
});
