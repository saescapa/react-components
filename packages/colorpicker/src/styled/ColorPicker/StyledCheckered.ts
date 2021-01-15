/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import { retrieveComponentStyles, DEFAULT_THEME } from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'colorpicker.checkered';

export const StyledCheckered = styled.div.attrs({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})`
  position: absolute;
  z-index: 0;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(135deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(135deg, transparent 75%, #ccc 75%);
  background-position: 0 0, 6px 0, 6px -6px, 0 6px;
  background-size: ${props => `${props.theme.space.base * 3}px ${props.theme.space.base * 3}px`};
  width: 100%;
  height: ${props => props.theme.space.base * 3}px;

  /* stylelint-disable-next-line */
  @-moz-document url-prefix() {
    z-index: -1;
  }

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledCheckered.defaultProps = {
  theme: DEFAULT_THEME
};
