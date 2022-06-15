import React, { FC } from 'react';
import Select from "react-select";

import './select.styles.scss';


interface CustomSelectProps {
  options: Array<CustomSelectOption>;
  className?: string;
  defaultValue?: CustomSelectOption;
  defaultInputValue?: string;
  onChange: (option: any) => void;
  isDisabled?: boolean;
  error?: string;
  label?: string;
}

export interface CustomSelectOption {
  label: any;
  value: any;
}

interface CustomStylesConfig {
  isDisabled: boolean;
}

const CustomSelect: FC<CustomSelectProps> = (
  {
    options,
    className,
    defaultValue,
    isDisabled,
    defaultInputValue,
    error,
    onChange,
    label,
  }
): JSX.Element => {
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
    <div className="custom-select">
      {label && (
        <label className="custom-select__label">
          {label}
        </label>
      )}
      <Select
        styles={customStyles}
        className={className}
        onChange={(option: any) => onChange(option.value)}
        options={options}
        isDisabled={isDisabled}
        placeholder={"Select"}
        defaultValue={defaultValue}
        defaultInputValue={defaultInputValue}
        onMenuScrollToBottom={() => console.log('qwe')}
      />
    </div>
  );
};

export default CustomSelect;
