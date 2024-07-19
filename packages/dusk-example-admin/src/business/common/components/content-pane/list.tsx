import React, { CSSProperties } from 'react';

import { Card, CardProps, Col, Form, FormInstance, FormProps, Row, Spin } from 'antd';

import { Actions, ActionsProps } from '@/business/common/components/action';
import { AutoFields, SimpleFieldDefinition } from '@/business/common/components/field';

import './list.scss';

export interface ContentPaneListProps {
    loading?: boolean;
    title?: string;
    header?: React.ReactNode;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    style?: CSSProperties;
    cardProps?: CardProps;
    className?: string;

    adaptive?: boolean;

    form?: FormInstance;
    formProps?: FormProps;
    fields?: SimpleFieldDefinition[];
    fieldsProps?: any;

    actions?: ActionsProps<any>;
}

export default function ContentPaneList(props: ContentPaneListProps) {
    const {
        loading = false,
        adaptive = false,
        title,
        header,
        children,
        footer,
        style,
        className = '',
        form,
        formProps,
        fields = [],
        fieldsProps,
    } = props;
    const classNames = ['app-page-list', className, adaptive ? 'app-page-list-adaptive' : ''].join(' ');

    return (
        <div className={classNames} style={style}>
            <Spin spinning={loading}>
                <Row style={{ height: '100%' }}>
                    <Col span={24} style={{ height: '100%' }}>
                        <Card
                            bordered={false}
                            style={{ height: '100%' }}
                            title={title}
                            bodyStyle={{
                                paddingBottom: 0,
                            }}
                            {...props.cardProps}
                        >
                            {form && (
                                <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} {...formProps}>
                                    <AutoFields column={4} definitions={fields} {...fieldsProps} />
                                </Form>
                            )}
                            <Actions {...props.actions} style={{ paddingBottom: 12 }} />
                            {header}
                            {children}
                            {footer}
                        </Card>
                    </Col>
                </Row>
            </Spin>
        </div>
    );
}
