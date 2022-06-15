import React, { FC } from "react";
import { Controller } from "react-hook-form";
import {
  DropdownInput,
  DropdownInputOption,
  DropdownInputProps,
} from "@/ui-kit/components/dropdown-input/dropdown-input.component";


interface FormsSelectProps
  extends Omit<DropdownInputProps, "onChange" | "value"> {
  hasError?: boolean;
  name: `${string}`;
  error?: string;
  control: any;
  onChange?: (value: string | string[]) => void;
  options: DropdownInputOption[];
  label?: string;
}

export const FormsSelect: FC<FormsSelectProps> = ({
                                                    name,
                                                    error,
                                                    control,
                                                    hasError,
                                                    placeholder,
                                                    options,
                                                    label,
                                                    ...props
                                                  }) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { ref, ...rest } }) => (
      <DropdownInput
        hasError={!!error}
        options={options}
        placeholder={placeholder}
        label={label}
        {...props}
        {...rest}
      />
    )}
  />
);
