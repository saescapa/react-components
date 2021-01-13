/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ColorPicker, IColorPickerState } from '@zendeskgarden/react-colorpicker';

export default {
  title: 'Components/ColorPicker',
  component: ColorPicker
} as Meta;

export interface RGBColor {
  a?: number;
  b: number;
  g: number;
  r: number;
  source?: string;
}

export const Default: Story<any> = () => {
  const magentaRGB = { red: 255, green: 0, blue: 255, alpha: 50 };
  const magentaRGB2 = { r: 255, g: 0, b: 0, a: 1 };
  // const blueRGBString = 'rgb(0,2,255)';
  // const blueRGBString = { h: 240, s: 100, l: 50, a: 1 };
  const lime = '#b4da55';
  const [color, setColor] = React.useState(lime);
  const [color1, setColor1] = React.useState<any>(magentaRGB);
  const [color2, setColor2] = React.useState<any>(magentaRGB);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <ColorPicker
        color={magentaRGB}
        onChange={(state: IColorPickerState) => {
          console.log(state);
        }}
      />
    </div>
  );
};
