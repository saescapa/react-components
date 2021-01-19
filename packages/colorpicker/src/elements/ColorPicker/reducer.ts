/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { parseToHsl, parseToRgb, rgb as rgbToString } from 'polished';
import { hsv2hsl, rgbToHsl, hsl2rgb } from '../../utils/conversion';

export interface IColorPickerState {
  hex: string;
  hue: number;
  saturation: number;
  lightness: number;
  red: number;
  green: number;
  blue: number;
  alpha: number;
  redInput: number | string;
  greenInput: number | string;
  blueInput: number | string;
  alphaInput: number | string;
}

export const SATURATION_CHANGE = 'saturation change';
export const HUE_CHANGE = 'hue slider change';
export const ALPHA_SLIDER_CHANGE = 'alpha slider change';
export const HEX_CHANGE = 'hex change';
export const RED_CHANGE = 'red change';
export const GREEN_CHANGE = 'green change';
export const BLUE_CHANGE = 'blue change';
export const ALPHA_CHANGE = 'alpha change';

export interface IHSVColor {
  h: number;
  s: number;
  v: number;
}

export interface IHSLColor {
  h: number;
  s: number;
  l: number;
  a?: number;
}

export interface IRGBColor {
  red: number;
  green: number;
  blue: number;
  alpha?: number;
}

export interface ISaturationChange {
  type: typeof SATURATION_CHANGE;
  payload: IHSVColor;
}

export interface IHueSliderChange {
  type: typeof HUE_CHANGE;
  payload: string;
}
export interface IAlphaSliderChange {
  type: typeof ALPHA_SLIDER_CHANGE;
  payload: string;
}

export interface IHexChange {
  type: typeof HEX_CHANGE;
  payload: string;
}

export interface IRedChange {
  type: typeof RED_CHANGE;
  payload: string;
}

export interface IGreenChange {
  type: typeof GREEN_CHANGE;
  payload: string;
}

export interface IBlueChange {
  type: typeof BLUE_CHANGE;
  payload: string;
}

export interface IAlphaChange {
  type: typeof ALPHA_CHANGE;
  payload: string;
}

export type ColorPickerActionTypes =
  | ISaturationChange
  | IHueSliderChange
  | IAlphaSliderChange
  | IHexChange
  | IRedChange
  | IGreenChange
  | IBlueChange
  | IAlphaChange;

export type ReducerType = (
  state: IColorPickerState,
  action: ColorPickerActionTypes
) => IColorPickerState;

export function getInitialState(initialColor: IRGBColor | string) {
  if (typeof initialColor === 'string') {
    const { hue, saturation, lightness } = parseToHsl(initialColor);
    const { red, green, blue } = parseToRgb(initialColor);

    return {
      hue,
      saturation: saturation * 100,
      lightness: lightness * 100,
      red,
      green,
      blue,
      redInput: red,
      greenInput: green,
      blueInput: blue,
      alpha: 100,
      alphaInput: 100,
      hex: initialColor
    };
  }
  const { red, green, blue, alpha = 100 } = initialColor;
  const hex = rgbToString({ red, green, blue });
  const { hue, saturation, lightness } = parseToHsl(hex);

  return {
    hue,
    saturation: saturation * 100,
    lightness: lightness * 100,
    red,
    green,
    blue,
    redInput: red,
    greenInput: green,
    blueInput: blue,
    alpha,
    alphaInput: 100,
    hex
  };
}

export const reducer: ReducerType = (state, action) => {
  switch (action.type) {
    case 'saturation change': {
      const hsl = hsv2hsl(action.payload.h, action.payload.s * 100, action.payload.v * 100);
      const rgb = hsl2rgb(state.hue, hsl.s, hsl.l);
      const hex = rgbToString(rgb.r, rgb.g, rgb.b);

      return {
        ...state,
        saturation: hsl.s,
        lightness: hsl.l,
        hex,
        red: rgb.r,
        green: rgb.g,
        blue: rgb.b,
        redInput: rgb.r,
        greenInput: rgb.g,
        blueInput: rgb.b
      };
    }
    case 'hue slider change': {
      const hue = Number(action.payload);
      const rgb = hsl2rgb(hue, state.saturation, state.lightness);
      const hex = rgbToString({
        red: rgb.r,
        green: rgb.g,
        blue: rgb.b
      });

      return {
        ...state,
        hue,
        hex,
        red: rgb.r,
        green: rgb.g,
        blue: rgb.b,
        redInput: rgb.r,
        greenInput: rgb.g,
        blueInput: rgb.b
      };
    }
    case 'alpha slider change': {
      return {
        ...state,
        alpha: Number(action.payload) * 100,
        alphaInput: Math.round(Number(action.payload) * 100)
      };
    }
    case 'hex change': {
      const validHex = /^#([0-9A-F]{3}){1,2}$/i.test(action.payload);

      if (validHex) {
        const rgb = parseToRgb(action.payload);
        const hsl = rgbToHsl(rgb.red, rgb.green, rgb.blue);

        return {
          ...state,
          hue: hsl.h,
          saturation: hsl.s,
          lightness: hsl.l,
          hex: action.payload,
          red: rgb.red,
          green: rgb.green,
          blue: rgb.blue,
          redInput: rgb.red,
          greenInput: rgb.green,
          blueInput: rgb.blue
        };
      }

      return {
        ...state,
        hex: action.payload
      };
    }
    case 'red change': {
      const red = Number(action.payload);

      if (isNaN(red)) return state;
      if (red > 255) return state;

      const hsl = rgbToHsl(red, state.green, state.blue);
      const hex = rgbToString(red, state.green, state.blue);

      return {
        ...state,
        hex,
        red: action.payload === '' ? state.red : red,
        redInput: action.payload,
        hue: hsl.h,
        lightness: hsl.l,
        saturation: hsl.s
      };
    }
    case 'green change': {
      const green = Number(action.payload);

      if (isNaN(green)) return state;
      if (green > 255) return state;

      const hsl = rgbToHsl(state.red, green, state.blue);
      const hex = rgbToString(state.red, green, state.blue);

      return {
        ...state,
        hex,
        green: action.payload === '' ? state.green : green,
        greenInput: action.payload,
        hue: hsl.h,
        lightness: hsl.l,
        saturation: hsl.s
      };
    }
    case 'blue change': {
      const blue = Number(action.payload);

      if (isNaN(blue)) return state;
      if (blue > 255) return state;

      const hsl = rgbToHsl(state.red, state.green, blue);
      const hex = rgbToString(state.red, state.green, blue);

      return {
        ...state,
        hex,
        blue: action.payload === '' ? state.blue : blue,
        blueInput: action.payload,
        hue: hsl.h,
        lightness: hsl.l,
        saturation: hsl.s
      };
    }
    case 'alpha change': {
      const alpha = Number(action.payload);

      if (isNaN(alpha)) return state;

      return {
        ...state,
        alpha,
        alphaInput: action.payload
      };
    }
    default:
      throw new Error('Unknown reducer case.');
  }
};
