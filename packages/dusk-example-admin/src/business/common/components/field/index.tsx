import React, { useMemo, useRef } from 'react';

import {
    Checkbox,
    Col,
    DatePicker,
    Form,
    FormItemProps,
    Input,
    InputNumber,
    Radio,
    Row,
    RowProps,
    Select,
    Slider,
    Switch,
    TreeSelect,
} from 'antd';
import { merge } from 'lodash';

// import ColorPicker from '@/business/common/components/field/color-picker';
import InputSlider from '@/business/common/components/field/input-slider';

export type FieldType =
    | string
    | 'radio'
    | 'select'
    | 'input'
    | 'input.number'
    | 'slider'
    | 'input.slider'
    | 'input.password'
    | 'color'
    | 'switch'
    | 'input.textarea'
    | 'datetime'
    | 'datetime.range'
    | 'tree.select'
    | 'color-picker'
    | 'checkbox'
    | 'checkbox-group'
    | 'custom';

// type WidgetProps =
//     Omit<RadioProps, 'options'> &
//     Omit<RadioGroupProps, 'options'> &
//     Omit<SelectProps, 'options'> &
//     InputProps &
//     TextAreaProps &
//     PasswordProps &
//     InputNumberProps &
//     SwitchProps &
//     DatePickerProps &
//     TimePickerProps &
//     RangePickerProps &
//     WeekPickerProps &
//     MonthPickerProps &
//     CheckboxProps &
//     ColorPickerProps<any> &
//     {
//         options?: any
//         treeData?: any
//     }

export interface SimpleFieldDefinition {
    id?: string;
    field?: string | number | (string | number)[];
    label?: string;
    type: FieldType;
    itemProps?: FormItemProps;
    widgetProps?: any;
    hidden?: boolean;
    required?: boolean;
    render?: (props: SimpleFieldDefinition) => React.ReactNode;
    wrap?: boolean;
    layout?: {
        span: number;
    };
}

// const widgets = {
//     'radio': <Radio.Group />,
//     'select': <Select allowClear />,
//     'color-picker': <ColorPicker />,
//     'color': <Input type='color' />,
//     'input': <Input />,
//     'input.number': <InputNumber style={{ width: '100%' }} />,
//     'input.search': <Input.Search style={{ width: '100%' }} />,
//     'tree.select': <TreeSelect showSearch treeDefaultExpandAll allowClear />,
//     'input.password': <Input.Password />,
//     'input.textarea': <Input.TextArea />,
//     'switch': <Switch />,
//     'datetime': <DatePicker style={{ width: '100%' }} showTime />,
// };
// React.cloneElement(widget, widgetProps);

export default function Field(props: SimpleFieldDefinition) {
    const widget = useMemo(() => {
        let widget;
        switch (props.type) {
            case 'input.slider':
                widget = <InputSlider {...props.widgetProps} />;
                break;
            case 'slider':
                widget = <Slider {...props.widgetProps} />;
                break;
            case 'radio':
                widget = <Radio.Group {...props.widgetProps} />;
                break;
            case 'select':
                widget = <Select allowClear {...props.widgetProps} />;
                break;
            // case 'color-picker':
            //     widget = <ColorPicker {...props.widgetProps} />;
            //     break;
            case 'color':
                widget = <Input {...props.widgetProps} type={'color'} />;
                break;
            case 'input':
            case 'string':
                widget = <Input allowClear {...props.widgetProps} />;
                break;
            case 'input.number':
                widget = <InputNumber style={{ width: '100%' }} {...props.widgetProps} />;
                break;
            case 'input.search':
                widget = <Input.Search style={{ width: '100%' }} {...props.widgetProps} />;
                break;
            case 'tree.select':
                widget = <TreeSelect showSearch treeDefaultExpandAll allowClear {...props.widgetProps} />;
                break;
            case 'input.password':
                widget = <Input.Password {...props.widgetProps} />;
                break;
            case 'input.textarea':
                widget = <Input.TextArea {...props.widgetProps} />;
                break;
            case 'switch':
                widget = <Switch {...props.widgetProps} />;
                break;
            case 'datetime':
                widget = <DatePicker style={{ width: '100%' }} showTime {...props.widgetProps} />;
                break;
            case 'datetime.range':
                widget = <DatePicker.RangePicker style={{ width: '100%' }} showTime {...props.widgetProps} />;
                break;
            case 'checkbox':
                widget = <Checkbox {...props.widgetProps} />;
                break;
            case 'checkbox-group':
                widget = <Checkbox.Group {...props.widgetProps} />;
                break;
            case 'custom':
                if (props.render) {
                    widget = props.render(props);
                }
                break;
            default:
                console.error(`未实现的组件${props.type}`);
                widget = null;
                break;
        }

        return widget;
    }, [props]);
    const rules = useMemo(() => {
        const required = !!props.required;
        const rules = props.itemProps?.rules || [];
        if (required) {
            const defaultRule = {
                required: true,
                whitespace: true,
            };
            if (rules.length === 0) {
                rules.push(defaultRule);
            } else {
                const rule = rules.find(rule => {
                    // @ts-ignore
                    return rule.required === true;
                });
                if (!rule) {
                    rules.unshift(defaultRule);
                }
            }
        }
        return rules;
    }, [props.itemProps, props.required]);

    return (
        <Form.Item
            hidden={props.hidden}
            name={props.field}
            label={props.label || ''}
            required={!!props.required}
            rules={rules}
            {...props.itemProps}
        >
            {widget}
        </Form.Item>
    );
}

export function Fields(props: { definitions: SimpleFieldDefinition[]; itemProps?: FormItemProps }) {
    return (
        <React.Fragment>
            {props.definitions.map((field, index) => {
                const p = merge({}, field, {
                    itemProps: props.itemProps,
                });
                return <Field {...p} key={field.id || index} />;
            })}
        </React.Fragment>
    );
}

export function AutoFields(props: {
    definitions: SimpleFieldDefinition[];
    itemProps?: FormItemProps;
    column: number | string;
    rowProps?: RowProps;
}) {
    const { column = 1 } = props;
    const indexRef = useRef<{
        [key: string]: number;
    }>({});
    const rows = useMemo(() => {
        indexRef.current = {};
        let rows: SimpleFieldDefinition[][] = [];
        let fields: Array<SimpleFieldDefinition> = [];
        let index = 0;
        for (const def of props.definitions) {
            // @ts-ignore
            indexRef.current[def.id || def.field] = index;
            index++;
            if (['h1', 'h2', 'textarea', 'input.textarea'].includes(def.type)) {
                if (fields.length > 0) {
                    rows.push(fields);
                    fields = [];
                }
                rows.push([def]);
                continue;
            }
            if (['1', 1, true].includes(def.wrap as any)) {
                if (fields.length > 0) {
                    rows.push(fields);
                    fields = [];
                }
                fields.push(def);
                continue;
            }
            fields.push(def);
        }
        if (fields.length > 0) {
            rows.push(fields);
            fields = [];
        }
        return rows;
    }, [indexRef, props.definitions]);

    return (
        <React.Fragment>
            {rows.map((fields: SimpleFieldDefinition[], rowIndex) => {
                return (
                    <Row key={rowIndex} gutter={4} {...props.rowProps}>
                        {fields
                            // .filter(item => !item.hidden)
                            .map((field, index) => {
                                let internalNode;
                                let widget;
                                let itemProps: FormItemProps = {};
                                switch (field.type) {
                                    case 'h1':
                                    case 'h2':
                                        break;
                                    default:
                                        let colSpan = 24 / Number(props.column);
                                        let colWidth = 100 / Number(props.column);
                                        const layoutSpan = (field as any).layout?.span || 1;
                                        let style: React.CSSProperties = {
                                            width: `${colWidth * layoutSpan}%`,
                                        };
                                        itemProps = {};
                                        if (layoutSpan) {
                                            if (layoutSpan >= props.column) {
                                                colSpan = 24;
                                                style.width = '100%';
                                            } else {
                                                colSpan = colSpan * layoutSpan;
                                            }
                                        }
                                        if (['textarea', 'input.textarea'].includes(field.type)) {
                                            colSpan = 24;
                                            style.width = '100%';
                                        }
                                        if (field.hidden) {
                                            colSpan = 0;
                                            style.display = 'none';
                                        }
                                        const p = merge({}, field, {
                                            itemProps: props.itemProps,
                                        });
                                        internalNode = <Field {...field} {...p} />;
                                        widget = (
                                            <Col
                                                // span={colSpan}
                                                // ts-ignored
                                                key={`${rowIndex}-${index}`}
                                                // key={indexRef.current[field.id]}
                                                style={style}
                                            >
                                                {internalNode}
                                            </Col>
                                        );
                                        break;
                                }

                                return widget;
                            })}
                    </Row>
                );
            })}
        </React.Fragment>
    );
}
