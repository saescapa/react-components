/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import throttle from 'lodash.throttle';
import { hsl2hsv } from '../utils/conversion';
import { IHSVColor } from '../elements/ColorPicker/reducer';
import { calculateChange, getNextSaturationValue } from '../utils/saturation';

export interface ISaturationProps {
  hue: number;
  saturation: number;
  lightness: number;
  onChange: (hsv: IHSVColor, event: React.MouseEvent<any>) => void;
}

export const Saturation: React.FC<ISaturationProps> = ({
  hue,
  saturation,
  lightness,
  onChange
}) => {
  const container = React.useRef<HTMLDivElement>(null);
  const hsv = hsl2hsv(hue, saturation, lightness);
  const [pos, setPos] = React.useState<{ s: number; v: number }>({ s: 0, v: 0 });

  const throttledChange = throttle(e => {
    if (container.current) {
      const data = calculateChange(e, hsv, container.current);
      setPos(getNextSaturationValue(e, container.current));
      onChange(data, e);
    }
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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
      ref={container}
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
