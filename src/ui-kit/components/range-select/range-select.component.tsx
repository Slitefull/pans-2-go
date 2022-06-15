import React, { FC, useCallback, useEffect, useState } from "react";

import { Label } from "@/ui-kit/components/input-label/input-label.component";

import "./range-select.styles.scss";


export interface RangeSelectProps {
  min: number;
  max: number;
  value: number;
  step?: number;
  label?: string;
  onChange: (value: number) => void;
}

export const RangeSelect: FC<RangeSelectProps> = ({
                                                    min,
                                                    max,
                                                    value = 0,
                                                    step,
                                                    label,
                                                    onChange,
                                                  }) => {
  let [internalValue, setInternalValue] = useState(value);

  const handleClick = useCallback((action: boolean) => {
    if (step && action) {
      onChange(internalValue += step);
    } else if (step && !action) {
      onChange(internalValue -= step);
    }
  }, [internalValue]);

  useEffect(() => {
    setInternalValue((value > 0) ? value : 0);
  }, [value]);

  const input = (
    <div className="rangeInput_wrapper">
      <button onClick={() => handleClick(false)} className="rangeInput_leftBtn">-</button>
      <div className="rangeInput__value">{internalValue} miles</div>
      <button onClick={() => handleClick(true)} className="rangeInput_rightBtn">+</button>
    </div>
  );

  return label ? <Label label={label}>{input}</Label> : input;
};

export default RangeSelect;
