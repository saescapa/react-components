/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ColorPicker } from '@zendeskgarden/react-colorpicker';

export default {
  title: 'Components/ColorPicker',
  component: ColorPicker
} as Meta;

export const Default: Story = () => {
  const [color] = React.useState('#17494D');
  // const [color] = React.useState({ red: 255, green: 0, blue: 255, alpha: 50 });

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ColorPicker color={color} onChange={action('onChange')} />
    </div>
  );
};
