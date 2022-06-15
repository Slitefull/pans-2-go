import React, { FC, useCallback, useEffect, useState } from "react";

import { Label } from "@/ui-kit/components/input-label/input-label.component";

import "./range-input.styles.scss";


export interface RangeInputProps {
  min: number;
  max: number;
  value: number;
  step?: number;
  label?: string;
  onChange: (value: number) => void;
}

export const RangeInput: FC<RangeInputProps> = ({
                                                  min,
                                                  max,
                                                  value,
                                                  step,
                                                  label,
                                                  onChange,
                                                }) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(Number(event.target.value));
      // onChange(Number(event.target.value));
    },
    [setInternalValue]
  );

  const handleMouseUp = useCallback(() => {
    onChange(internalValue);
  }, [onChange, internalValue]);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const input = (
    <div>
      <div className="rangeInput__value">{internalValue}</div>
      <input
        className="rangeInput"
        type="range"
        min={min}
        max={max}
        value={internalValue}
        step={step}
        onChange={handleChange}
        onMouseUp={handleMouseUp}
      />
    </div>
  );

  return label ? <Label label={label}>{input}</Label> : input;
};

export default RangeInput;
