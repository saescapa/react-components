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
  StyledCheckered,
  StyledAlphaField,
  StyledHueField
} from '../../styled';
import { Label } from '@zendeskgarden/react-forms';
import { getInitialState, reducer, IRGBColor, IHSVColor, IColorPickerState } from './reducer';

export interface IColorPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'onChange'> {
  /** Apply compact styling */
  color: string | IRGBColor;
  onChange?: (state: IColorPickerState) => void;
}

/**
 * Accepts all `<div>` attributes and events
 */
export const ColorPicker = React.forwardRef<HTMLDivElement, IColorPickerProps>(
  ({ color, onChange, onBlur }, ref) => {
    const [state, dispatch] = React.useReducer(reducer, getInitialState(color));

    React.useEffect(() => {
      onChange && onChange(state);
    }, [state, onChange]);

    return (
      <StyledColorPicker ref={ref}>
        <StyledSaturation>
          <Saturation
            hue={state.hue}
            saturation={state.saturation}
            lightness={state.lightness}
            onChange={(hsv: IHSVColor) => {
              dispatch({
                type: 'saturation change',
                payload: hsv
              });
            }}
          />
        </StyledSaturation>

        <StyledFlex>
          <StyledPreview
            rgb={{ red: state.red, green: state.green, blue: state.blue, alpha: state.alpha }}
          />
          <StyledSliders>
            <StyledHueField>
              <Label hidden>Hue Slider</Label>
              <StyledHue
                step={1}
                max={359}
                value={state.hue}
                onChange={e => {
                  dispatch({ type: 'hue slider change', payload: e.target.value });
                }}
                onBlur={onBlur}
              />
            </StyledHueField>

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
                onBlur={onBlur}
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
              onBlur={onBlur}
            />
          </StyledHexField>
          <StyledRGBAField>
            <StyledLabel>R</StyledLabel>
            <StyledInput
              isCompact
              type="number"
              min="0"
              max="255"
              maxLength={3}
              value={state.redInput}
              onChange={e => {
                dispatch({ type: 'red change', payload: e.target.value });
              }}
              onBlur={onBlur}
            />
          </StyledRGBAField>
          <StyledRGBAField>
            <StyledLabel>G</StyledLabel>
            <StyledInput
              isCompact
              type="number"
              min="0"
              max="255"
              maxLength={3}
              value={state.greenInput}
              onChange={e => {
                dispatch({ type: 'green change', payload: e.target.value });
              }}
              onBlur={onBlur}
            />
          </StyledRGBAField>
          <StyledRGBAField>
            <StyledLabel>B</StyledLabel>
            <StyledInput
              isCompact
              type="number"
              min="0"
              max="255"
              maxLength={3}
              value={state.blueInput}
              onChange={e => {
                dispatch({ type: 'blue change', payload: e.target.value });
              }}
              onBlur={onBlur}
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
              onBlur={onBlur}
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
