/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { parseToHsl, parseToRgb, rgb as rgbToString } from 'polished';
import { hsv2hsl, rgbToHsl, hsl2rgb } from '../../utils/conversion';

// TODO: Refactor
export function getInitialState(initialColor: any) {
  const isHex = typeof initialColor === 'string' && initialColor.includes('#');

  if (isHex) {
    const { hue, saturation, lightness } = parseToHsl(initialColor);
    const { red, green, blue } = parseToRgb(initialColor);

    return {
      hue,
      saturation: saturation * 100,
      lightness: lightness * 100,
      red,
      green,
      blue,
      redInput: String(red),
      greenInput: String(green),
      blueInput: String(blue),
      alpha: 1,
      hex: initialColor
    };
  } else {
    const { red, green, blue, alpha = 1 } = initialColor;
    const hex = rgbToString({ red, green, blue });
    const { hue, saturation, lightness } = parseToHsl(hex);

    return {
      hue,
      saturation: saturation * 100,
      lightness: lightness * 100,
      red,
      green,
      blue,
      redInput: String(red),
      greenInput: String(green),
      blueInput: String(blue),
      alpha,
      hex
    };
  }
}

export function reducer(state: any, action: any) {
  switch (action.type) {
    case 'hue change': {
      const hue = action.payload;
      const nextRgb = hsl2rgb(hue, state.saturation, state.lightness);
      const hex = rgbToString({
        red: nextRgb.r,
        green: nextRgb.g,
        blue: nextRgb.b
      } as any);
      return {
        ...state,
        hue,
        hex,
        red: nextRgb.r,
        green: nextRgb.g,
        blue: nextRgb.b,
        redInput: nextRgb.r,
        greenInput: nextRgb.g,
        blueInput: nextRgb.b
      };
    }
    case 'saturation block change': {
      const hsl = hsv2hsl(action.payload.h, action.payload.s * 100, action.payload.v * 100);
      const rgbFromHsl = hsl2rgb(state.hue, hsl.s, hsl.l);
      const nextHex = rgbToString(rgbFromHsl.r, rgbFromHsl.g, rgbFromHsl.b);
      return {
        ...state,
        saturation: hsl.s,
        lightness: hsl.l,
        hex: nextHex,
        red: rgbFromHsl.r,
        green: rgbFromHsl.g,
        blue: rgbFromHsl.b,
        redInput: rgbFromHsl.r,
        greenInput: rgbFromHsl.g,
        blueInput: rgbFromHsl.b
      };
    }
    case 'hex change': {
      const validHex = /^#([0-9A-F]{3}){1,2}$/i.test(action.payload);
      if (validHex) {
        const nextRgb = parseToRgb(action.payload);
        const nextHsl = rgbToHsl(nextRgb.red, nextRgb.green, nextRgb.blue);
        return {
          ...state,
          hue: nextHsl.h,
          saturation: nextHsl.s,
          lightness: nextHsl.l,
          hex: action.payload,
          red: nextRgb.red,
          green: nextRgb.green,
          blue: nextRgb.blue,
          redInput: nextRgb.red,
          greenInput: nextRgb.green,
          blueInput: nextRgb.blue
        };
      } else {
        return {
          ...state,
          hex: action.payload
        };
      }
    }
    case 'red change': {
      const red = Number(action.payload);

      if (isNaN(red)) return state;

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
      return {
        ...state,
        alpha: action.payload
      };
    }
    default:
      throw new Error();
  }
}
