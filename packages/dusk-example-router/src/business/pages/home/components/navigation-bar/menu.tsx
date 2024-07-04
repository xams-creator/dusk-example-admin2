import * as React from 'react';
import { useCallback, useState } from 'react';

import { Menu, MenuProps } from 'antd';

import './index.scss';

export interface NavigationMenuProps {
    mode?: 'fixed' | 'initial';
    menu?: MenuProps;
    data?: any[];
    className?: string;
    onClick?: (e: React.MouseEvent, item: any) => void;

    children?: React.ReactNode;
}

const InternalNavigationMenu: React.ForwardRefRenderFunction<unknown, NavigationMenuProps> = (props, ref) => {
    const {
        mode = 'fixed',
        menu,
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
    const [items, setItems] = useState([]);
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
        'xams-navigation-menu',
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
            <Menu
                style={{ height: '100%' }}
                mode={'inline'}
                theme={'light'}
                {...menu}
                // selectedKeys={[this.state.current]}
                // onClick={handleMenuClick}
            />
        </div>
    );
};

export const NavigationMenu = React.forwardRef<unknown, NavigationMenuProps>(InternalNavigationMenu);
NavigationMenu.displayName = 'NavigationMenu';

export default NavigationMenu;
