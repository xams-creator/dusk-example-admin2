import { Link, Outlet } from '@xams-framework/dusk';

export default function Examples() {
    const examples = [
        {
            link: 'basic-component',
            label: '基础组件',
        },
        {
            link: 'action',
            label: '动作',
        },
        {
            link: 'lifecycle',
            label: '生命周期',
        },
        {
            link: 'dynamic-component',
            label: '动态组件',
        },
    ];

    return (
        <div>
            examples
            <ol>
                {examples.map(({ label, link }) => {
                    return (
                        <li>
                            <Link to={link}>{label}</Link>
                        </li>
                    );
                })}
            </ol>
            <Outlet />
        </div>
    );
}
