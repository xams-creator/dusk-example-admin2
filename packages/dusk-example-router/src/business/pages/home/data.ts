import config from '@/business/pages/apps/config';

export const data = [
    // {
    //     id: '1',
    //     name: '目录1',
    //     isLeaf: false,
    //     parentId: '0',
    // },
    // {
    //     id: '1-101',
    //     name: '订单',
    //     isLeaf: true,
    //     tid: 'ttx.wso.bill',
    //     oid: 'order',
    //     parentId: '1',
    // },
    // {
    //     id: '1-102',
    //     name: '入库单',
    //     isLeaf: true,
    //     tid: 'ttx.wso.bill',
    //     oid: 'receipt_header',
    //     parentId: '1',
    // },
    {
        id: 'router',
        name: '基座',
        isLeaf: false,
        parentId: '0',
    },
    {
        id: 'app001',
        name: '基座页面001',
        isLeaf: true,
        parentId: 'router',
    },
    {
        id: 'app002',
        name: '基座页面002',
        isLeaf: true,
        parentId: 'router',
        path: '/apps/app002',
    },
    {
        id: 'outer',
        name: '外部站点',
        isLeaf: false,
        parentId: '0',
    },
    {
        id: 'docs',
        name: 'dusk文档',
        isLeaf: true,
        parentId: 'outer',
        micro: true,
        props: {
            micro: {
                name: 'dusk-docs',
                iframe: true,
                'router-mode': 'state',
                url: 'https://xams-creator.github.io/docs/',
            },
        },
    },
    {
        id: 'okr',
        name: 'dusk-okr',
        isLeaf: true,
        parentId: 'outer',
        micro: true,
        props: {
            micro: {
                name: 'dusk-okr',
                url: 'https://xams-creator.github.io/dusk-example-okr/',
            },
        },
    },
    {
        id: 'dusk-example-vite-react',
        name: 'dusk-example-vite-react',
        isLeaf: true,
        parentId: 'outer',
        micro: true,
        props: {
            micro: {
                name: 'dusk-example-vite-react',
                url: 'https://xams-creator.github.io/dusk-example-vite-react/',
                iframe: true,
            },
        },
    },
    {
        id: 'admin',
        isLeaf: false,
        parentId: '0',
        name: 'admin管理系统',
    },
    {
        id: 'organization',
        isLeaf: true,
        parentId: 'admin',
        micro: true,
        name: '组织',
        tid: 'ttx.wso.bill',
        oid: 'organization',
        props: {
            micro: {
                url: 'http://localhost:3000/example/ttx.wso.bill/organization',
                name: 'admin',
                iframe: true,
            },
        },
    },
    {
        id: 'admin-app',
        isLeaf: true,
        parentId: 'admin',
        micro: true,
        name: 'admin-app',
        props: {
            micro: {
                url: 'http://localhost:3000/',
                name: 'admin-app',
                iframe: true,
            },
        },
    },
    {
        id: 'react',
        isLeaf: false,
        parentId: '0',
        name: 'react',
    },
    {
        id: 'dusk-react17-hash',
        isLeaf: true,
        parentId: 'react',
        micro: true,
        name: 'dusk-react17-hash',
        props: {
            micro: {
                url: `http://localhost:1401`,
                name: 'dusk-react17-hash',
            },
        },
    },
    {
        id: 'dusk-react17-browser',
        isLeaf: true,
        parentId: 'react',
        micro: true,
        name: 'dusk-react17-browser',
        props: {
            micro: {
                url: `http://localhost:1402`,
                iframe: true,
                baseroute: '/apps/dusk-react17-browser',
                name: 'dusk-react17-browser',
                // 'keep-alive':true,
            },
        },
    },
] as any;
