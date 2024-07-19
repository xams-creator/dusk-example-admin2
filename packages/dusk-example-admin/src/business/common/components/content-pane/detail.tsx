import React, { CSSProperties } from 'react';

import { PageHeader } from '@ant-design/pro-layout';
import { Col, Row, Spin } from 'antd';

import { Actions, ActionsProps } from '@/business/common/components/action';

import './detail.scss';

export interface ContentPaneDetailProps {
    loading?: boolean;
    isEditing?: boolean;
    title?: string | React.ReactNode;

    headerExtra?: React.ReactNode;
    headerActions?: ActionsProps<any>;
    children: React.ReactNode;

    bodyStyle?: CSSProperties;

    showHeader?: boolean;
}

export default function ContentPaneDetail(props: ContentPaneDetailProps) {
    const { loading = false, title, headerExtra, headerActions, bodyStyle, showHeader = true } = props;
    return (
        <div className={'app-page-detail'}>
            <Spin spinning={loading}>
                <Row style={{ height: '100%', flexDirection: 'column' }}>
                    {showHeader && (
                        <Col flex="58px">
                            <PageHeader
                                ghost={false}
                                title={title}
                                extra={headerExtra || <Actions {...headerActions} />}
                            />
                        </Col>
                    )}
                    <Col flex="1" style={{ padding: 12, overflow: 'auto', ...bodyStyle }}>
                        {props.children}
                    </Col>
                </Row>
            </Spin>
        </div>
    );
}
