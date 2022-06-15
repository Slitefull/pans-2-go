import React, { FC } from "react";
import { useForm } from "react-hook-form";

import "./forms-radio.styles.scss";


interface FormsInputRadioProps {
  name: `${string}`;
  value: string;
  label?: string;
  checked?: boolean;
  onClickHandler: (value: string) => void;
}

export const FormsInputRadio: FC<FormsInputRadioProps> = (
  {
    name,
    value,
    label,
    checked,
    onClickHandler,
  }): JSX.Element => {
  const { register } = useForm();

  return (
    <div className="forms-input-radio">
      <input
        {...register(name)}
        type="radio"
        className="forms-input-radio__input"
        value={value}
        checked={checked}
        onClick={() => onClickHandler(value)}
      />
      {label && (
        <label className="forms-input-radio__label">
          {label}
        </label>
      )}
    </div>
  );
};
