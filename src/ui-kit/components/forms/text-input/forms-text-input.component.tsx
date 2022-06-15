import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { TextInput, TextInputProps, } from "../../text-input/text-input.component";


interface FormsTextInputProps
  extends Omit<TextInputProps, "onChange" | "value"> {
  /**
   * name should be required property
   */
  name: `${string}`;
  error?: string;
  control?: any;
  autoComplete?: string;
  labelPrefix?: string;
}

export const FormsTextInput: FC<FormsTextInputProps> = (
  {
    name,
    error,
    control,
    helperText,
    hasError,
    autoComplete,
    labelPrefix,
    ...props
  }) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { ref, ...rest } }) => (
      <TextInput
        hasError={!!error}
        helperText={error}
        {...props}
        {...rest}
        autoComplete={autoComplete}
        labelPrefix={labelPrefix}
      />
    )}
  />
);
