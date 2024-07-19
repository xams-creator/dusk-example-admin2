import React, { CSSProperties } from 'react';

import {
    BellOutlined,
    ClearOutlined,
    ClusterOutlined,
    KeyOutlined,
    LogoutOutlined,
    QuestionCircleOutlined,
    SearchOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Col, DropDownProps, Dropdown, Row, Space, theme } from 'antd';

import './index.scss';

export interface HeaderProps {
    title?: string | React.ReactNode;
    organization?: {
        logoUrl?: string;
        name?: string;
    };
    user?: {
        avatar?: string;
        name?: string;
    };
    onLogout?: () => void;
    onSearch?: () => void;
    onHelp?: () => void;

    style?: CSSProperties;

    dropdown?: DropDownProps;
}

export default function Header(props: HeaderProps) {
    const { token } = theme.useToken();
    return (
        <div
            className="xams-header"
            style={{
                backgroundColor: token.colorPrimary,
                ...props.style,
            }}
        >
            <Row style={{ padding: 12 }}>
                <Col xs={0} sm={0} md={6} xl={6} xxl={6}>
                    <Space size={12} className={'logo'}>
                        <Avatar src={props.organization?.logoUrl} size={'large'}/>
                        <span>{props.title}</span>
                        <span>{props.organization?.name}</span>
                    </Space>
                </Col>
                <Col xs={24} sm={24} md={18} xl={18} xxl={18}>
                    <div className={'user-wrapper'}>
                        <span className="action" onClick={props.onSearch}>
                            <SearchOutlined />
                        </span>
                        <span className="action" onClick={props.onHelp}>
                            <QuestionCircleOutlined />
                        </span>
                        {/*<span className='action'>*/}
                        {/*         <BellOutlined />*/}
                        {/*</span>*/}
                        <span className="action">
                            <Dropdown
                                trigger={['click']}
                                placement="bottom"
                                overlayClassName={'user-dropdown'}
                                {...props.dropdown}
                            >
                                <span>
                                    <Avatar size="small" src={props.user?.avatar} />
                                    <span>{`欢迎您，${props.user?.name}`}</span>
                                </span>
                            </Dropdown>
                        </span>
                        <span className="action">
                            <a
                                className={'logout-title'}
                                onClick={() => {
                                    props.onLogout?.();
                                }}
                            >
                                <LogoutOutlined />
                                <span style={{ paddingLeft: 6 }}>退出登录</span>
                            </a>
                        </span>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
