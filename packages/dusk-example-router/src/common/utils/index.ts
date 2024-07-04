export function isDevelopment() {
    return ['development', 'test'].includes(process.env.NODE_ENV);
}

export function isProduction() {
    return process.env.NODE_ENV === 'production';
}

export function getRandomArrayIndex(length: number) {
    if (length === 0) {
        throw Error('array not need get random index');
    }
    return Math.round(Math.random() * (length - 1));
}

export function remove(arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item);
        if (index > -1) {
            return arr.splice(index, 1);
        }
    }
}

export const downloadFile = (filename, blob) => {
    const inBrowser = typeof window !== 'undefined';
    if (inBrowser && 'msSaveOrOpenBlob' in window.navigator) {
        // @ts-ignore
        const { msSaveOrOpenBlob } = window.navigator;
        // @ts-ignore
        msSaveOrOpenBlob(blob, filename);
        return;
    }
    const url = URL.createObjectURL(blob);
    downloadUrl(filename, url);
};

export const downloadUrl = (filename, url) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

export function resize(delay: number | null = null) {
    const { dispatchEvent } = window;

    function run() {
        dispatchEvent(new Event('resize'));
    }

    if (!!dispatchEvent) {
        delay ? setTimeout(run, delay) : run();
    }
}

// 列表转树函数
export function listToTree(list: any[] = [], parentId: null | string = '0', cb?: (node) => void) {
    return list
        .filter(item => item.parentId === parentId)
        .map(item => {
            const node = { ...item, children: listToTree(list, item.id, cb) };
            if (!node.children.length) delete node.children; // 如果没有子节点，则不包含 children 属性
            cb?.(node);
            return node;
        });
}

// 树转列表函数
export function treeToList(tree, parentId: null | string = '0', flatList: any[] = []) {
    tree.forEach(node => {
        const { id, children, ...rest } = node; // 使用 rest 参数代替 children 属性
        // @ts-ignore
        flatList.push({ id, parentId, ...rest, children: [] }); // 插入列表元素时，不包含 children 属性
        if (children) {
            treeToList(children, id, flatList);
        }
    });
    return flatList;
}
