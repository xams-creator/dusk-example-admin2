import { Layout } from 'antd';

import Header from '@/business/common/components/header';

import './index.scss';

export default function Page1() {
    return (
        <Layout className={'app-layout'} style={{ background: 'linear-gradient(to right bottom, #ddd6f3, #faaca8)' }}>
            <Layout.Header
                className={'app-layout-header'}
                // style={{ height: 106, lineHeight: '106px' }}
                style={{ height: 64, lineHeight: '64px' }}
            >
                <Header
                    organization={{
                        logoUrl: `${process.env.PUBLIC_URL}/static/images/logo.png`,
                        name: '测试组织',
                    }}
                    user={{
                        avatar: `${process.env.PUBLIC_URL}/static/images/avatar.svg`,
                        name: '张三',
                    }}

                />
            </Layout.Header>
        </Layout>
    );
}
