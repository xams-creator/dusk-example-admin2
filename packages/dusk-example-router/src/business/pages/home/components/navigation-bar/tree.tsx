import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { DownOutlined } from '@ant-design/icons';
import { Tree, TreeProps } from 'antd';
import { DirectoryTreeProps } from 'antd/lib/tree/DirectoryTree';

import './tree.scss';

export interface NavigationDirectoryTreeProps {
    mode?: 'fixed' | 'initial';
    tree?: DirectoryTreeProps;
    data?: any[];
    className?: string;
    onClick?: (e: React.MouseEvent, item: any) => void;

    children?: React.ReactNode;
}

const InternalNavigationTree: React.ForwardRefRenderFunction<unknown, NavigationDirectoryTreeProps> = (props, ref) => {
    const {
        mode = 'fixed',
        tree,
        data = [],
        className,
        // loading = false,
        // type,
        // danger,
        // shape = 'default',
        // size: customizeSize,

        children,
        ...rest
    } = props;
    const [shrink, setShrink] = useState(false); // 是否需要收缩到侧边，默认不需要
    const handleOnMouseOver = useCallback(() => {
        if (mode === 'fixed') {
            setShrink(true);
        }
    }, [mode]);
    const handleOnMouseLeave = useCallback(() => {
        if (mode === 'fixed') {
            setShrink(false);
        }
    }, [mode]);

    const classNames = [
        'xams-navigation',
        'xams-navigation-tree',
        `xams-navigation-mode-${mode}`,
        className,
        !shrink && 'xams-side-shrink',
    ]
        .filter(Boolean)
        .join(' ');

    // const store = useRef<any>({}).current;
    // const handleMenuClick = (e) => {
    //     const { onClick } = props;
    //     onClick?.(e, store[e.key]);
    //     // (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e, store[e.key]);
    // };

    // useEffect(() => {
    //     const items = [];
    //
    //     function addTreeNode(data: any[], items) {
    //         data.forEach((navigation) => {
    //             store[navigation.id] = navigation;
    //             const item = {
    //                 key: navigation.id,
    //                 label: navigation.name,
    //                 title: navigation.name,
    //                 disabled: !navigation.status,
    //                 // ...navigation,
    //                 navigation: navigation,
    //                 // closable: navigation.closable,
    //                 // children: navigation.children,
    //                 // icon: navigation.icon,
    //             };
    //             if (navigation.children && navigation.children.length > 0) {
    //                 item['children'] = [];
    //                 addTreeNode(navigation.children, item['children']);
    //             }
    //             items.push(item);
    //         });
    //     }
    //
    //     addTreeNode(data, items);
    //     setItems(items);
    // }, [store, data]);

    return (
        <div className={classNames} onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave}>
            <Tree.DirectoryTree
                allowDrop={() => true}
                blockNode={true}
                virtual={false}
                switcherIcon={<DownOutlined />}
                {...tree}
                // style={{ height: '100%' }}
                // mode={'inline'}
                // theme={'light'}
                // selectedKeys={[this.state.current]}
                // onClick={handleMenuClick}
            />
        </div>
    );
};

export const NavigationTree = React.forwardRef<unknown, NavigationDirectoryTreeProps>(InternalNavigationTree);
NavigationTree.displayName = 'NavigationTree';

export default NavigationTree;
