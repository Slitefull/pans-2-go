import React, { FC, } from "react";

import "./checkbox.styles.scss";


export interface CheckboxProps {
  label: string | React.ReactNode;
  isChecked: boolean;
  setIsChecked: () => void;
  classPrefix?: string;
}

export const Checkbox: FC<CheckboxProps> = (
  {
    label,
    isChecked,
    setIsChecked,
    classPrefix,
  }): JSX.Element => {

  return (
    <div className={`checkbox ${classPrefix}`}>
      <input
        type="checkbox"
        className="checkbox-input"
        checked={isChecked}
        onChange={setIsChecked}
      />
      <label className="checkbox-label">
        {label}
      </label>
    </div>
  );
};
