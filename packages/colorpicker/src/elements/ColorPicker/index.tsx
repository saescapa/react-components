/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { StyledColorPicker } from '../../styled';
import { Saturation } from '../Saturation';
import { StyledHue, StyledAlpha, StyledPreviewBox } from '../../styled';
import { Field, Label, Range, Input } from '@zendeskgarden/react-forms';
import { getInitialState, reducer } from './reducer';

interface IColorPickerProps extends HTMLAttributes<HTMLDivElement> {
  /** Apply compact styling */
  isCompact?: boolean;
}

/**
 * Accepts all `<div>` attributes and events
 */
export const ColorPicker = React.forwardRef<HTMLDivElement, IColorPickerProps>(
  ({ color, onChange }, ref) => {
    const [state, dispatch] = React.useReducer(reducer, getInitialState(color));

    return (
      <div style={{ width: '312px' }}>
        <div
          style={{
            position: 'relative',
            paddingBottom: '75%',
            overflow: 'hidden'
          }}
        >
          <Saturation
            hue={state.hue}
            saturation={state.saturation}
            lightness={state.lightness}
            onChange={(hsv: any) => {
              dispatch({
                type: 'saturation block change',
                payload: hsv
              });
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
          <StyledPreviewBox
            rgb={{ red: state.red, green: state.green, blue: state.blue, alpha: state.alpha }}
          />
          <div style={{ width: '100%', marginLeft: '8px' }}>
            <Field>
              <Label hidden>Hue Slider</Label>
              <StyledHue
                step={1}
                max={359}
                value={state.hue}
                onChange={e => {
                  dispatch({ type: 'hue change', payload: Number(e.target.value) });
                }}
              />
            </Field>

            <Field>
              <Label hidden>Alpha Slider</Label>
              <StyledAlpha
                color={{ red: state.red, green: state.green, blue: state.blue }}
                step={0.01}
                max={1}
                value={state.alpha}
                onChange={(e: any) => {
                  dispatch({ type: 'alpha change', payload: e.target.value });
                }}
              />
            </Field>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '8px'
          }}
        >
          <Field
            style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: '86px' }}
          >
            <Label style={{ fontWeight: 400 }}>Hex</Label>
            <Input
              style={{
                marginTop: '4px'
              }}
              maxLength={7}
              value={state.hex}
              onChange={e => {
                dispatch({ type: 'hex change', payload: e.target.value });
              }}
            />
          </Field>
          <Field
            style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: '50px' }}
          >
            <Label style={{ fontWeight: 400 }}>R</Label>
            <Input
              style={{
                marginTop: '4px'
              }}
              maxLength={3}
              value={state.redInput}
              onChange={e => {
                dispatch({ type: 'red change', payload: e.target.value });
              }}
            />
          </Field>
          <Field
            style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: '50px' }}
          >
            <Label style={{ fontWeight: 400 }}>G</Label>
            <Input
              style={{
                marginTop: '4px'
              }}
              maxLength={3}
              value={state.greenInput}
              onChange={e => {
                dispatch({ type: 'green change', payload: e.target.value });
              }}
            />
          </Field>
          <Field
            style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: '50px' }}
          >
            <Label style={{ fontWeight: 400 }}>B</Label>
            <Input
              style={{
                marginTop: '4px'
              }}
              maxLength={3}
              value={state.blueInput}
              onChange={e => {
                dispatch({ type: 'blue change', payload: e.target.value });
              }}
            />
          </Field>
          <Field
            style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: '50px' }}
          >
            <Label style={{ fontWeight: 400 }}>A</Label>
            <Input
              style={{
                marginTop: '4px'
              }}
              type="number"
              min="0"
              max="100"
              value={Math.round(state.alpha * 100)}
              onChange={e => {
                dispatch({
                  type: 'alpha change',
                  payload: Number(e.target.value) / 100
                });
              }}
            />
          </Field>
        </div>
      </div>
    );
  }
);

ColorPicker.displayName = 'ColorPicker';

ColorPicker.propTypes = {
  isCompact: PropTypes.bool
};
