/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

export function hsl2hsv(h: number, s: number, l: number) {
  s *= (l < 50 ? l : 100 - l) / 100;
  const v = l + s;

  return {
    h: h,
    s: v === 0 ? 0 : ((2 * s) / v) * 100,
    v: v
  };
}

export function hsv2hsl(h: number, s: number, v: number) {
  s /= 100;
  v /= 100;

  let l = (2 - s) * v;
  let sl = s * v;
  sl /= l <= 1 ? l : 2 - l;
  sl = sl || 0;
  l /= 2;

  return { h: h, s: sl * 100, l: l * 100 };
}

export function rgb2hsv(r: number, g: number, b: number) {
  let h = NaN;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  // hue
  if (delta === 0) {
    h = 0;
  } else if (r === max) {
    h = ((g - b) / delta) % 6;
  } else if (g === max) {
    h = (b - r) / delta + 2;
  } else if (b === max) {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  // saturation
  const s = Math.round((max === 0 ? 0 : delta / max) * 100);

  // value
  const v = Math.round((max / 255) * 100);

  return { h, s, v };
}

export function hsv2rgb(h: number, s: number, v: number) {
  s = s / 100;
  v = v / 100;

  let rgb: any = [];

  const c = v * s;
  const hh = h / 60;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  const m = v - c;

  switch (Math.floor(hh)) {
    case 0:
      rgb = [c, x, 0];
      break;

    case 1:
      rgb = [x, c, 0];
      break;

    case 2:
      rgb = [0, c, x];
      break;

    case 3:
      rgb = [0, x, c];
      break;

    case 4:
      rgb = [x, 0, c];
      break;

    case 5:
      rgb = [c, 0, x];
      break;

    default:
  }

  return {
    r: Math.round(255 * (rgb[0] + m)),
    g: Math.round(255 * (rgb[1] + m)),
    b: Math.round(255 * (rgb[2] + m))
  };
}

export function hsl2rgb(h: number, s: number, l: number) {
  const hsv = hsl2hsv(h, s, l);

  return hsv2rgb(hsv.h, hsv.s, hsv.v);
}

export function rgbToHsl(r: number, g: number, b: number) {
  const hsv = rgb2hsv(r, g, b);

  return hsv2hsl(hsv.h, hsv.s, hsv.v);
}
