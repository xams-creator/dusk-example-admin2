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
        id: 'cbt-web-custom',
        name: 'cbt-web-custom',
        isLeaf: true,
        parentId: 'outer',
        micro: true,
        props: {
            micro: {
                name: 'cbt-web-custom',
                iframe: false,
                url: 'http://localhost:8003',
            },
        },
    },
    {
        id: 'cbt',
        name: 'cbt',
        isLeaf: false,
        parentId: '0',
    },
    {
        id: 'wms-remote',
        name: 'wms-remote',
        isLeaf: true,
        parentId: 'cbt',
        micro: true,
        props: {
            micro: {
                name: 'wms-remote',
                iframe: true,
                url: 'http://localhost:8001',
            },
        },
    },
    {
        id: 'wms-remote2',
        name: 'wms-remote2',
        isLeaf: true,
        parentId: 'cbt',
        micro: true,
        props: {
            micro: {
                name: 'wms-remote2',
                iframe: true,
                url: 'http://localhost:8001/index.html',
            },
        },
    },
    {
        id: 'wms-remote3',
        name: 'wms-remote3',
        isLeaf: true,
        parentId: 'cbt',
        micro: true,
        props: {
            micro: {
                name: 'wms-remote3',
                iframe: false,
                inline: true,
                url: 'http://localhost:8002',
            },
        },
    },
    {
        id: 'studio',
        name: 'cbt-studio',
        isLeaf: true,
        parentId: 'cbt',
        micro: true,
        props: {
            micro: {
                name: 'cbt-studio',
                baseroute: '/apps/studio',
                url: 'http://localhost:8004/cbt-studio',
            },
        },
    },
    {
        id: 'dojo',
        name: 'dojo',
        isLeaf: false,
        parentId: '0',
    },
    {
        id: 'dojo-hello-world',
        name: 'dojo hello world',
        isLeaf: true,
        parentId: 'dojo',
        micro: true,
        props: {
            micro: {
                name: 'dojo-hello-world',
                url: 'http://localhost:1341/',
                micro: true,
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
        id: 'dusk-react',
        isLeaf: false,
        parentId: '0',
        name: 'react',
    },
    {
        id: 'dusk-react17-hash',
        isLeaf: true,
        parentId: 'dusk-react',
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
        parentId: 'dusk-react',
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
