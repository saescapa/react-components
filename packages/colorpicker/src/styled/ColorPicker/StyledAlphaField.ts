/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import { Field } from '@zendeskgarden/react-forms';
import { retrieveComponentStyles, DEFAULT_THEME } from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'colorpicker.alpha.field';

export const StyledAlphaField = styled(Field).attrs({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})`
  top: ${props => props.theme.space.base / 2}px;

  input {
    position: absolute;
    /* stylelint-disable-next-line declaration-no-important */
    margin-top: 0 !important;
    height: ${props => props.theme.space.base * 3}px;
  }

  /* stylelint-disable-next-line */
  @media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none) {
    top: -10px;

    input {
      top: -10px;
      z-index: 1;
      height: ${props => props.theme.space.base * 8}px;
    }
  }

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledAlphaField.defaultProps = {
  theme: DEFAULT_THEME
};
