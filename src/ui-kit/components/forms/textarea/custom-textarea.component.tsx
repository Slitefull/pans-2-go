import React, { FC } from "react";
import { Controller } from "react-hook-form";

import "./custom-textarea.styles.scss";


interface FormsCustomSelectProps {
  label?: string;
  name: string;
  control: any;
  classPrefix?: string;
  error?: string;
  placeholder?: string;
}

export const FormsCustomTextarea: FC<FormsCustomSelectProps> = (
  {
    label,
    name,
    control,
    classPrefix,
    error,
    placeholder
  }) => {

  return (
    <div className={`forms-custom-textarea ${classPrefix}`}>
      <label className="forms-custom-textarea__label">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field: { ...rest } }) => (
          <>
            <textarea
              className={`custom-textarea`}
              placeholder={placeholder}
              {...rest}
            />
            {error && (
              <span className="forms-custom-textarea__error">{error}</span>
            )}
          </>
        )}
      />
    </div>
  );
};
