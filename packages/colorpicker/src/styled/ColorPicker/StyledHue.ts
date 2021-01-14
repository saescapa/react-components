/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import { Range } from '@zendeskgarden/react-forms';
import { retrieveComponentStyles, DEFAULT_THEME } from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'styled.hue';

export const StyledHue = styled(Range).attrs({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})`
  &::-moz-range-track {
    margin: 0;
    border-radius: 0;
    /* stylelint-disable */
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
    /* stylelint-enable */
    height: ${props => props.theme.space.base * 3}px;
  }

  &::-webkit-slider-runnable-track {
    margin: 0;
    border-radius: 0;
    /* stylelint-disable */
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
    /* stylelint-enable */
    height: ${props => props.theme.space.base * 3}px;
  }

  &::-ms-track {
    margin: 0;
    border-radius: 0;
    /* stylelint-disable */
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
    /* stylelint-enable */
    height: ${props => props.theme.space.base * 3}px;
  }

  &::-moz-range-progress {
    opacity: 0;
  }

  &::-ms-fill-lower {
    opacity: 0;
  }

  &::-webkit-slider-thumb {
    margin-top: -4px;
  }

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledHue.defaultProps = {
  theme: DEFAULT_THEME
};
