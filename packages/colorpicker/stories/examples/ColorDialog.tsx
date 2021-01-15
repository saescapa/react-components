/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ColorDialog, IRGBColor } from '@zendeskgarden/react-colorpicker';

export default {
  title: 'Components/ColorDialog',
  component: ColorDialog
} as Meta;

export const Dialog: Story = () => {
  const [color, setColor] = React.useState<string | IRGBColor>({
    red: 23,
    green: 73,
    blue: 77,
    alpha: 100
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ColorDialog color={color} onClose={setColor} />
    </div>
  );
};
