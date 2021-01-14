/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import { Field } from '@zendeskgarden/react-forms';
import { retrieveComponentStyles, DEFAULT_THEME } from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'colorpicker.hue.field';

export const StyledHueField = styled(Field).attrs({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})`
  input {
    /* stylelint-disable-next-line declaration-no-important */
    margin-top: -${props => props.theme.space.base}px !important;
    height: ${props => props.theme.space.base * 3}px;
  }

  /* stylelint-disable-next-line */
  @media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none) {
    top: -5px;

    input {
      height: ${props => props.theme.space.base * 8}px;
    }
  }

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledHueField.defaultProps = {
  theme: DEFAULT_THEME
};
