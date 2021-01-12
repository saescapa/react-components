/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { HTMLAttributes } from 'react';
import throttle from 'lodash.throttle';
import { hsl2hsv } from '../utils/conversion';

export const Saturation = ({ hue, saturation, lightness, onChange }: any) => {
  const container = React.useRef();
  const hsv = hsl2hsv(hue, saturation, lightness);
  const [pos, setPos] = React.useState<any>({});
  const throttledChange = throttle(e => {
    const data = calculateChange(e, hsv, container.current);
    setPos(getNextSaturationValue(e, container.current));
    onChange(data);
  }, 50);

  const initialTop = `${100 - hsv.v}%`;
  const initialLeft = `${hsv.s}%`;
  const topPosition = pos.v ? `${100 - pos.v}%` : initialTop;
  const leftPosition = pos.s ? `${pos.s}%` : initialLeft;

  const handleMouseUp = () => {
    throttledChange.cancel();
    window.removeEventListener('mousemove', handleChange);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = (e: any) => {
    handleChange(e);
    window.addEventListener('mousemove', handleChange);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleChange = (e: any) => throttledChange(e);

  const styles = {
    color: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: `hsl(${hue}, 100%, 50%)`,
      borderRadius: '2px',
      fontSize: '100px'
    },
    white: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      borderRadius: '2px'
    },
    black: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    pointer: {
      position: 'absolute',
      top: topPosition,
      left: leftPosition,
      cursor: 'default'
    },
    circle: {
      width: '4px',
      height: '4px',
      boxShadow: `0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),
          0 0 1px 2px rgba(0,0,0,.4)`,
      borderRadius: '50%',
      cursor: 'hand',
      transform: 'translate(-2px, -2px)'
    }
  };

  return (
    <div
      style={styles.color as any}
      ref={container as any}
      onMouseDown={handleMouseDown}
      onTouchMove={handleChange}
      onTouchStart={handleChange}
    >
      <style>{`
        .saturation-white {
          background: -webkit-linear-gradient(to right, #fff, rgba(255,255,255,0));
          background: linear-gradient(to right, #fff, rgba(255,255,255,0));
        }
        .saturation-black {
          background: -webkit-linear-gradient(to top, #000, rgba(0,0,0,0));
          background: linear-gradient(to top, #000, rgba(0,0,0,0));
        }
      `}</style>
      <div style={styles.white as any} className="saturation-white">
        <div style={styles.black as any} className="saturation-black" />
        <div style={styles.pointer as any}>
          <div style={styles.circle} />
        </div>
      </div>
    </div>
  );
};

function calculateChange(e: any, hsl: any, container: any) {
  const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
  const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
  const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
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

  const hsv = {
    h: hsl.h,
    s: saturation,
    v: bright
  };

  return hsv;
}

function getNextSaturationValue(ev: any, root: any) {
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
