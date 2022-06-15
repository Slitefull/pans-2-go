import React, { FC } from "react";
import { Controller } from "react-hook-form";
import InputMask from 'react-input-mask';

import './forms-masked-input.styles.scss';


interface FormsMaskedInputProps {
  name: string;
  control: any;
  error?: string;
  mask?: string;
}

export const FormsMaskedInput: FC<FormsMaskedInputProps> = (
  {
    name,
    control,
    error,
    mask,
  }) => (
  <div className="forms-masked-input">
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <>
          <InputMask
            className="masked-input"
            mask={mask ?? "**** **** ****"}
            onChange={(option: any) => onChange(option)}
          />
          {error && (
            <span className="forms-masked-input__error">{error}</span>
          )}
        </>
      )}
    />
  </div>
);
