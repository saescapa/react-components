/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */
import React from 'react';
import { IHSVColor } from '../elements/ColorPicker/reducer';

export function calculateChange(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  hsv: IHSVColor,
  container: HTMLDivElement
): IHSVColor {
  const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
  const x = typeof e.pageX === 'number' ? e.pageX : ((e as unknown) as TouchEvent).touches[0].pageX;
  const y = typeof e.pageY === 'number' ? e.pageY : ((e as unknown) as TouchEvent).touches[0].pageY;

  let left = x - (container.getBoundingClientRect().left + window.pageXOffset);
  let top = y - (container.getBoundingClientRect().top + window.pageYOffset);

  if (left < 0) {
    left = 0;
  } else if (left > containerWidth) {
    left = containerWidth;
  }

  if (top < 0) {
    top = 0;
  } else if (top > containerHeight) {
    top = containerHeight;
  }

  const saturation = left / containerWidth;
  const bright = 1 - top / containerHeight;

  getNextSaturationValue(e, container);

  return {
    h: hsv.h,
    s: saturation,
    v: bright
  };
}

export function getNextSaturationValue(
  ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
  root: HTMLElement
) {
  const rectSize = root.getBoundingClientRect();
  const sPercentage = (ev.clientX - rectSize.left) / rectSize.width;
  const vPercentage = (ev.clientY - rectSize.top) / rectSize.height;

  const s = limit(Math.round(sPercentage * 100), 100);
  const v = limit(Math.round(100 - vPercentage * 100), 100);

  return { s, v };
}

function limit(value: number, max: number, min = 0) {
  return value < min ? min : value > max ? max : value;
}
