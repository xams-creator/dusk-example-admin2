import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

import { useMount } from 'ahooks';
import { Table as AntdTable, TableProps } from 'antd';
import { debounce } from 'lodash';

export default function Table<T = any>(props: TableProps<T> & { ref?: any }) {
    const tableRef = useRef(props?.ref);
    const scrollY = useAntdTableAutoScrollY(tableRef);
    const { scroll, ...rest } = props;
    return (
        <AntdTable<any>
            ref={tableRef}
            size={'small'}
            scroll={{
                y: scrollY,
                x: scroll?.x || 'auto',
            }}
            {...rest}
            onHeaderRow={data => {
                return {
                    onClick() {},
                };
            }}
        />
    );
}

export function useAntdTableAutoScrollY(
    ref: MutableRefObject<HTMLDivElement | null> | undefined,
    { extraHeight }: { extraHeight: number } = { extraHeight: -80 }
) {
    const [scrollY, setScrollY] = useState<any>(1);
    const calc = useCallback(() => {
        if (!ref || !ref.current) {
            return;
        }
        // @ts-ignore
        const header = ref.current.nativeElement.getElementsByClassName('ant-table-thead')[0];
        let windowTopToTableHeaderHeight = header.getBoundingClientRect().bottom;
        setScrollY(window.innerHeight - windowTopToTableHeaderHeight + extraHeight);
    }, [extraHeight, ref]);

    useEffect(() => {
        let observer, element;
        observer = new ResizeObserver(
            debounce(() => {
                calc();
            }, 50)
        );
        element = document.getElementById('root') || document.body;
        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [calc]);
    return scrollY;
}
