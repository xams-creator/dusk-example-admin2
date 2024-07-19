// import { CSSProperties } from 'react';
// import React from 'react';
// import { Color, GithubPicker, RGBColor, SketchPicker } from 'react-color';
//
// import { Popover } from 'antd';
//
// interface ColorPickerProps {
//     value?: string;
//     onChange?: (value: Color) => void;
//     type?: 'sketch-picker' | 'github-picker';
//     colors?: string[];
//     switchStyle?: CSSProperties;
//     colorStyle?: CSSProperties;
//     valueType?: 'rgb' | 'hex';
//     extraPresetColors?: string[];
// }
//
// function convertRGBColorToString(value: RGBColor) {
//     return `rgba(${value?.r}, ${value?.g}, ${value?.b}, ${value?.a})`;
// }
//
// export default function ColorPicker({
//     value,
//     onChange,
//     type,
//     colors,
//     valueType = 'rgb',
//     switchStyle: customSwitchStyle,
//     colorStyle: customColorStyle,
//     extraPresetColors = [],
// }: ColorPickerProps) {
//     const switchStyle = {
//         padding: 4,
//         background: '#fff',
//         borderRadius: 2,
//         border: '1px solid #dedede',
//         display: 'inline-block',
//         cursor: 'pointer',
//         ...customSwitchStyle,
//     };
//     const colorStyle: CSSProperties = {
//         width: 100,
//         height: 14,
//         borderRadius: 2,
//         backgroundColor: value || 'initial',
//         ...customColorStyle,
//     };
//
//     let picker;
//     let presetColors = colors || [
//         '#FFFFFF',
//         '#D0021B',
//         '#F5A623',
//         '#F8E71C',
//         '#8B572A',
//         '#7ED321',
//         '#417505',
//         '#BD10E0',
//         '#9013FE',
//         '#4A90E2',
//         '#50E3C2',
//         '#B8E986',
//         '#000000',
//         '#000000e0',
//         '#4A4A4A',
//         '#9B9B9B',
//         'TRANSPARENT',
//         ...extraPresetColors,
//     ];
//     switch (type) {
//         case 'github-picker':
//             picker = (
//                 <GithubPicker
//                     width={'240px'}
//                     color={value || '#000000'}
//                     onChange={color => onChange?.(color.hex)}
//                     colors={presetColors}
//                 />
//             );
//             break;
//         default:
//             picker = (
//                 <React.Fragment>
//                     <SketchPicker
//                         width={'240px'}
//                         color={value || '#000000'}
//                         onChange={color =>
//                             onChange?.(valueType === 'rgb' ? convertRGBColorToString(color.rgb) : color.hex)
//                         }
//                         presetColors={presetColors}
//                     />
//                     {/*<div>123</div>*/}
//                 </React.Fragment>
//             );
//             break;
//     }
//
//     return (
//         <Popover
//             trigger="click"
//             placement="bottomLeft"
//             overlayStyle={{ padding: 0 }}
//             overlayInnerStyle={{ padding: 0 }}
//             style={{ padding: 0 }}
//             content={picker}
//         >
//             <div style={switchStyle}>
//                 <div style={colorStyle} />
//             </div>
//         </Popover>
//     );
// }
