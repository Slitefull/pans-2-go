import React, { FC } from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import MaskedTextInput from "react-text-mask";

import "./custom-datepicker.styles.scss"


interface FormsCustomSelectProps {
  name: string;
  control: any;
  label?: string;
  error?: string;
  classPrefix?: string;
}

export const FormsCustomDatepicker: FC<FormsCustomSelectProps> = (
  {
    label,
    name,
    control,
    error,
    classPrefix,
  }): JSX.Element => {
  return (
    <div className="forms-custom-datepicker">
      <label className="forms-custom-datepicker__label">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <DatePicker
              customInput={
                <MaskedTextInput
                  type="text"
                  mask={[/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/]}
                />
              }
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
              placeholderText="mm.dd.yyyy"
              className={`custom-datepicker ${error && `error-field`} ${classPrefix}`}
            />
            {error && (
              <span className="forms-custom-datepicker__error">{error}</span>
            )}
          </>
        )}
      />
    </div>
  );
};
