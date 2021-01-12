/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled, { ThemeProps, DefaultTheme, css } from 'styled-components';
import { retrieveComponentStyles, DEFAULT_THEME, getColor } from '@zendeskgarden/react-theming';
import { Range } from '@zendeskgarden/react-forms';

const COMPONENT_ID = '{{component}}.example';

export interface IStyledAlphaProps extends ThemeProps<DefaultTheme> {
  isCompact?: boolean;
}

export const StyledAlpha = styled(Range).attrs<any>({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})<any>`
  margin-top: 4px !important;
  height: 0 !important;

  &::-webkit-slider-runnable-track {
    height: 12px;
    ${props => {
      const { red, green, blue } = props.color;
      return `
      background: linear-gradient(
        to right,
        rgba(${red}, ${green}, ${blue}, 0) 0%,
        rgb(${red}, ${green}, ${blue}, 1) 100%
      );
    `;
    }}
  }

  &::-webkit-slider-thumb {
    margin-top: -2px;
    width: 16px;
    height: 16px;
  }

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledAlpha.defaultProps = {
  theme: DEFAULT_THEME
};
