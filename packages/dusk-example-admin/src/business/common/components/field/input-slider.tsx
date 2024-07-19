import { useCallback } from 'react';

import { InputNumber, Slider, Space } from 'antd';

interface InputSliderProps {
    value?: number;
    onChange?: (value: number) => void;

    min?: number;
    max?: number;
}

export default function InputSlider(props: InputSliderProps) {
    const { onChange, value, min = 0, max = 100 } = props;
    const update = useCallback(
        values => {
            onChange?.(values);
        },
        [onChange]
    );

    return (
        <Space.Compact style={{ width: '100%' }}>
            <Slider onChange={update} value={value} style={{ width: '85%' }} min={min} max={max} />
            <InputNumber onChange={update} value={value} style={{ marginLeft: 10 }} min={min} max={max} />
        </Space.Compact>
    );
}
