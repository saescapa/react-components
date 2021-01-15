/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState, useRef } from 'react';
import { ColorPicker, IRGBColor } from '../';
import {
  StyledButton,
  StyledFauxInput,
  StyledDialogPreview,
  StyledTooltipModal,
  StyledTooltipBody
} from '../styled';
import { IColorPickerProps } from './ColorPicker';

export interface IColorDialogProps extends IColorPickerProps {
  onClose?: (selectedColor: string | IRGBColor) => void;
  // placement
  // hasArrow
}

export const ColorDialog: React.FC<IColorDialogProps> = ({ color, onClose }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState(color);
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>();

  const onBlur = () => {
    setTimeout(() => {
      if (document.activeElement && document.activeElement.tagName === 'BODY') {
        setReferenceElement(null);
        onClose && onClose(selectedColor);
      }
    });
  };

  return (
    <>
      <StyledFauxInput tabIndex={-1}>
        <StyledButton
          ref={buttonRef}
          onClick={() => {
            if (referenceElement) {
              setReferenceElement(null);
            } else {
              setReferenceElement(buttonRef.current);
            }
          }}
        >
          <StyledDialogPreview backgroundColor={color} />
        </StyledButton>
      </StyledFauxInput>

      <StyledTooltipModal
        referenceElement={referenceElement}
        onClose={() => {
          setReferenceElement(null);
          onClose && onClose(selectedColor);
        }}
        placement="top"
      >
        <StyledTooltipBody>
          <ColorPicker
            color={color}
            onBlur={onBlur}
            onChange={setSelectedColor}
            ref={colorPickerRef}
          />
        </StyledTooltipBody>
      </StyledTooltipModal>
    </>
  );
};
