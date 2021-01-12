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

export interface IStyledHueProps extends ThemeProps<DefaultTheme> {
  isCompact?: boolean;
}

export const StyledHue = styled(Range).attrs<IStyledHueProps>({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})<IStyledHueProps>`
  margin-top: 0 !important;
  height: 0px !important;

  &::-webkit-slider-runnable-track {
    background: linear-gradient(
      to right,
      #f00 0%,
      #ff0 17%,
      #0f0 33%,
      #0ff 50%,
      #00f 67%,
      #f0f 83%,
      #f00 100%
    );
    height: 12px;
  }

  &::-webkit-slider-thumb {
    margin-top: -2px;
    width: 16px;
    height: 16px;
  }

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledHue.defaultProps = {
  theme: DEFAULT_THEME
};
