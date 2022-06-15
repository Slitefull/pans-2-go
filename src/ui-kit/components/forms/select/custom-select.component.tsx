import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";
import Select from "react-select";

import "./custom-select.styles.scss";
import { observer } from "mobx-react";


interface FormsCustomSelectProps {
  label?: string;
  name: string;
  options: Array<CustomSelectOption>;
  control?: Control<any>;
  className?: string;
  defaultValue?: CustomSelectOption;
  defaultInputValue?: string;
  isDisabled?: boolean;
  error?: string;
}

export interface CustomSelectOption {
  label: any;
  value: any;
}

interface CustomStylesConfig {
  isDisabled: boolean;
}

export const FormsCustomSelect: FC<FormsCustomSelectProps> = observer((
  {
    label,
    name,
    options,
    control,
    className,
    defaultValue,
    isDisabled,
    defaultInputValue,
    error,
  }) => {
  const customStyles = {
    option: () => ({
      cursor: "pointer",
      fontSize: 14,
      letterSpacing: "0.035em",
      color: "#red",
      margin: "10px 0 10px 15px",
    }),
    control: () => ({
      display: "flex",
      alignItems: "center",
      background: "#FFFFFF",
      border: error ? "1px solid red" : "1px solid #E0E0E0",
      borderRadius: 12,
      cursor: "pointer",
      outline: "none",
      height: 40,
    }),
    placeholder: (styles: any, { isDisabled }: CustomStylesConfig) => ({
      color: isDisabled ? "#D3D3D3" : "#333333",
      fontSize: 12,
      fontWeight: 300,
      margin: 2,
      paddingBottom: 2,
      paddingTop: 2,
      flex: "1 1 auto",
      display: "inline-grid",
      gridArea: "1/1/2/3",
      gridTemplateColumns: "0 min-content",
    }),
    singleValue: (styles: any, { isDisabled }: CustomStylesConfig) => ({
      ...styles,
      color: isDisabled ? "#D3D3D3" : "#333333",
      fontSize: 12,
      fontWeight: 300,
    }),
  };

  return (
    <div className="forms-custom-select">
      <label className="forms-custom-select__label">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <>
            <Select
              styles={customStyles}
              className={className}
              onChange={(option: any) => onChange(option.value)}
              options={options}
              isDisabled={isDisabled}
              placeholder={"Select"}
              defaultValue={defaultValue || undefined}
              defaultInputValue={defaultInputValue}
            />
            {error && (
              <span className="forms-custom-select__error">{error}</span>
            )}
          </>
        )}
      />
    </div>
  );
});
