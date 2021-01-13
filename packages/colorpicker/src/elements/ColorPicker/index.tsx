/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Saturation } from '../Saturation';
import {
  StyledHue,
  StyledFlex,
  StyledInput,
  StyledLabel,
  StyledAlpha,
  StyledSliders,
  StyledHexField,
  StyledRGBAField,
  StyledInputGroup,
  StyledPreview,
  StyledSaturation,
  StyledColorPicker,
  StyledCheckered
} from '../../styled';
import { Field, Label } from '@zendeskgarden/react-forms';
import { getInitialState, reducer, IRGBColor, IHSVColor, IColorPickerState } from './reducer';
import styled from 'styled-components';

const StyledAlphaField = styled(Field)`
  input {
    position: relative;
    z-index: 1;
  }
`;

interface IColorPickerProps {
  /** Apply compact styling */
  color: string | IRGBColor;
  onChange?: (state: IColorPickerState, event: any) => void;
}

/**
 * Accepts all `<div>` attributes and events
 */
export const ColorPicker = React.forwardRef<HTMLDivElement, IColorPickerProps>(
  ({ color, onChange }, ref) => {
    const [state, dispatch] = React.useReducer(reducer, getInitialState(color));
    const [event, setEvent] = React.useState<Event>();

    React.useEffect(() => {
      onChange && onChange(state, event);
    }, [state, event, onChange]);

    return (
      <StyledColorPicker>
        <StyledSaturation>
          <Saturation
            hue={state.hue}
            saturation={state.saturation}
            lightness={state.lightness}
            onChange={(hsv: IHSVColor, e: Event) => {
              dispatch({
                type: 'saturation change',
                payload: hsv
              });
              setEvent(e);
            }}
          />
        </StyledSaturation>

        <StyledFlex>
          <StyledPreview
            rgb={{ red: state.red, green: state.green, blue: state.blue, alpha: state.alpha }}
          />
          <StyledSliders>
            <Field>
              <Label hidden>Hue Slider</Label>
              <StyledHue
                step={1}
                max={359}
                value={state.hue}
                onChange={e => {
                  dispatch({ type: 'hue slider change', payload: e.target.value });
                }}
              />
            </Field>

            <StyledAlphaField>
              <Label hidden>Alpha Slider</Label>
              <StyledAlpha
                max={1}
                step={0.01}
                value={state.alpha / 100}
                rgb={{ red: state.red, green: state.green, blue: state.blue }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch({ type: 'alpha slider change', payload: e.target.value });
                }}
              />
              <StyledCheckered />
            </StyledAlphaField>
          </StyledSliders>
        </StyledFlex>

        <StyledInputGroup>
          <StyledHexField>
            <StyledLabel>Hex</StyledLabel>
            <StyledInput
              isCompact
              maxLength={7}
              value={state.hex}
              onChange={e => {
                dispatch({ type: 'hex change', payload: e.target.value });
              }}
            />
          </StyledHexField>
          <StyledRGBAField>
            <StyledLabel>R</StyledLabel>
            <StyledInput
              isCompact
              maxLength={3}
              value={state.redInput}
              onChange={e => {
                dispatch({ type: 'red change', payload: e.target.value });
              }}
            />
          </StyledRGBAField>
          <StyledRGBAField>
            <StyledLabel>G</StyledLabel>
            <StyledInput
              isCompact
              maxLength={3}
              value={state.greenInput}
              onChange={e => {
                dispatch({ type: 'green change', payload: e.target.value });
              }}
            />
          </StyledRGBAField>
          <StyledRGBAField>
            <StyledLabel>B</StyledLabel>
            <StyledInput
              isCompact
              maxLength={3}
              value={state.blueInput}
              onChange={e => {
                dispatch({ type: 'blue change', payload: e.target.value });
              }}
            />
          </StyledRGBAField>
          <StyledRGBAField>
            <StyledLabel>A</StyledLabel>
            <StyledInput
              isCompact
              type="number"
              min="0"
              max="100"
              value={state.alphaInput}
              onChange={e => {
                dispatch({
                  type: 'alpha change',
                  payload: e.target.value
                });
              }}
            />
          </StyledRGBAField>
        </StyledInputGroup>
      </StyledColorPicker>
    );
  }
);

ColorPicker.displayName = 'ColorPicker';

ColorPicker.propTypes = {
  color: PropTypes.any
};