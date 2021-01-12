/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled, { ThemeProps, DefaultTheme, css } from 'styled-components';
import { retrieveComponentStyles, DEFAULT_THEME, getColor } from '@zendeskgarden/react-theming';

console.log(Range, '<-- look');

const COMPONENT_ID = '{{component}}.example';

export interface IFoo extends ThemeProps<DefaultTheme> {
  isCompact?: boolean;
}

export const StyledPreviewBox = styled.div.attrs<IFoo>({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})<any>`
  flex-shrink: 0;
  margin-top: 4px;
  border: 1px solid #000;
  background-color: ${props =>
      `rgba(${props.rgb.red}, ${props.rgb.green}, ${props.rgb.blue}, ${props.rgb.alpha})`}
    ${props => retrieveComponentStyles(COMPONENT_ID, props)};
  width: 32px;
  height: 32px;
`;

StyledPreviewBox.defaultProps = {
  theme: DEFAULT_THEME
};
