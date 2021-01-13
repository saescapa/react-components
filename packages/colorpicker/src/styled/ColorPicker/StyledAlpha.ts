/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { Range } from '@zendeskgarden/react-forms';
import { IRGBColor } from '../../elements/ColorPicker/reducer';
import styled, { ThemeProps, DefaultTheme } from 'styled-components';
import { retrieveComponentStyles, DEFAULT_THEME } from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'colorpicker.alpha';

export interface IStyledAlphaProps extends ThemeProps<DefaultTheme> {
  rgb: IRGBColor;
}

export const StyledAlpha = styled(Range).attrs<IStyledAlphaProps>({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})<IStyledAlphaProps>`
  /* stylelint-disable-next-line declaration-no-important */
  margin-top: ${props => props.theme.space.base}px !important;
  /* stylelint-disable-next-line declaration-no-important */
  height: 0 !important;

  &::-webkit-slider-runnable-track {
    border-radius: 0;
    height: ${props => props.theme.space.base * 3}px;
    ${props => `
      background: linear-gradient(
        to right,
        rgba(${props.rgb.red}, ${props.rgb.green}, ${props.rgb.blue}, 0) 0%,
        rgb(${props.rgb.red}, ${props.rgb.green}, ${props.rgb.blue}, 1) 100%
      );
    `}
  }

  &::-moz-range-track {
    border-radius: 0;
    height: ${props => props.theme.space.base * 3}px;
    ${props => `
      background: linear-gradient(
        to right,
        rgba(${props.rgb.red}, ${props.rgb.green}, ${props.rgb.blue}, 0) 0%,
        rgb(${props.rgb.red}, ${props.rgb.green}, ${props.rgb.blue}, 1) 100%
      );
    `}
  }

  &::-moz-range-progress {
    opacity: 0;
  }

  &::-webkit-slider-thumb {
    margin-top: -4px;
  }

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledAlpha.defaultProps = {
  theme: DEFAULT_THEME
};
