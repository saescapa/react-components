/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import { retrieveComponentStyles, DEFAULT_THEME } from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'colorpicker.flex';

export const StyledFlex = styled.div.attrs({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})`
  display: flex;
  justify-content: space-between;
  margin-top: 3px;

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledFlex.defaultProps = {
  theme: DEFAULT_THEME
};
