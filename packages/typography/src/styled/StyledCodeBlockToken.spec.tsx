/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render } from 'garden-test-utils';
import { StyledCodeBlockToken } from './StyledCodeBlockToken';

describe('StyledCodeBlockToken', () => {
  it('renders the expected element', () => {
    const { container } = render(<StyledCodeBlockToken />);

    expect(container.firstChild!.nodeName).toBe('SPAN');
  });
});
