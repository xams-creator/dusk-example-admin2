import React, { useMemo } from 'react';

import { Button, ButtonProps, Space, SpaceProps, Tooltip, TooltipProps } from 'antd';
import { get } from 'lodash';

export type ActionType = string | 'custom' | null;

export type ActionWidgetProps = ButtonProps;

export interface ActionDefinition {
    id?: string;
    name?: string | React.ReactNode;

    type?: ActionType;
    title?: string | React.ReactNode;
    action?: string;
    onAction?: (item: ActionDefinition, ...args: any[]) => void;

    tooltip?: TooltipProps;
    args?: ActionWidgetProps;
    render?: (props: ActionDefinition) => React.ReactNode;

    hidden?: boolean;
    disabled?: boolean;
    loading?: boolean;

    separator?: boolean;
}

export default function Action(props: ActionDefinition) {
    let widget;

    const { disabled, loading, hidden } = useMemo(() => {
        return {
            disabled: get(props, ['args', 'disabled'], props.disabled),
            loading: get(props, ['args', 'loading'], props.loading),
            hidden: get(props, ['args', 'hidden'], props.hidden),
        };
    }, [props]);

    switch (props.type) {
        case 'custom':
            if (props.render) {
                widget = props.render(props);
            }
            break;
        default:
            widget = (
                <Button
                    {...props.args}
                    children={props.name}
                    onClick={() => {
                        props.onAction?.(props);
                    }}
                    disabled={disabled}
                    loading={loading}
                />
            );
            break;
    }

    if (hidden) {
        return null;
    }

    return (
        <Tooltip title={props.tooltip?.title} {...props.tooltip}>
            {widget}
        </Tooltip>
    );
}

export interface ActionsProps<E extends Record<string, (item: ActionDefinition, ...args: any[]) => void>> {
    events?: E;
    items?: ActionDefinition[];
    className?: string;
    args?: SpaceProps;
    style?: React.CSSProperties;
    group?: boolean; // 是否启用按钮组
}

// const ActionsContext = React.createContext<any>({
//     events: {},
// });
//
// function useActionsContext(): any {
//     return useContext(ActionsContext);
// }

export function Actions<E extends Record<string, (item: ActionDefinition, ...args: any[]) => void>>(
    props: ActionsProps<E>
) {
    const { items = [], className, group = false, style } = props;

    const classNames = [className].filter(Boolean).join(' ');
    const events = useMemo(() => {
        return props.events || {};
    }, [props.events]);

    const children = useMemo(() => {
        if (group) {
            const groups: any[] = [];
            let startIndex = 0;
            items.forEach((item, index) => {
                if (item.separator) {
                    groups.push(items.slice(startIndex, index));
                    startIndex = index + 1;
                }
            });
            groups.push(items.slice(startIndex, items.length));

            return groups.map((items, index) => {
                return (
                    <Space.Compact key={index}>
                        <Actions items={items} key={index} events={events} args={{ size: 0 }} />
                    </Space.Compact>
                );
            });
        }

        return items
            .filter(item => !item?.hidden)
            .map((item, index) => {
                const action = get(item, ['action'], '');
                const paths = action.split('.');
                const method = get(events, paths, () => {
                    console.error(`action: [${action}] is not exits`, events, item);
                });

                return (
                    <Action
                        key={item.id || index}
                        // @ts-ignore
                        onAction={method?.bind(paths.length <= 1 ? events : events[paths.at(0)])}
                        {...item}
                    />
                );
            });
    }, [items, events, group]);

    return (
        <Space
            // wrap
            size={[12, 12]}
            style={style}
            {...props.args}
            className={classNames}
        >
            {children}
        </Space>
    );
}
