/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { Range } from '@zendeskgarden/react-forms';
import { IRGBColor } from '../elements/ColorPicker/reducer';
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
  border-radius: 0;
  /* stylelint-disable-next-line declaration-no-important */
  height: 0 !important;

  &::-webkit-slider-runnable-track {
    height: ${props => props.theme.space.base * 3}px;
    ${props => {
      const { red, green, blue } = props.rgb;
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
    margin-top: -${props => props.theme.space.base / 2}px;
    width: ${props => props.theme.space.base * 4}px;
    height: ${props => props.theme.space.base * 4}px;
  }

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledAlpha.defaultProps = {
  theme: DEFAULT_THEME
};
