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
import { Avatar, Col, DropDownProps, Dropdown, Row, theme } from 'antd';

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
            <Row style={{ margin: 8 }}>
                <Col xs={0} sm={0} md={6} xl={6} xxl={6}>
                    <div>
                        <div className={'logo'}>
                            <img alt="logo" src={props.organization?.logoUrl} />
                            <span style={{ paddingRight: 12 }}>{props.title}</span>
                            <span style={{ paddingRight: 12 }}>{props.organization?.name}</span>
                        </div>
                    </div>
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
