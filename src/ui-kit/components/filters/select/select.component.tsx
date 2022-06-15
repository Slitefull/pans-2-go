import React, { FC } from 'react';
import Select from 'react-select';


interface SelectFilterProps {
  classPrefix?: string;
  options: Array<SelectOption>;
  placeholder?: string;
  onChangeHandler: (option: any) => void;
  defaultValue?: SelectOption;
  height?: number;
  width?: number;
}

export interface SelectOption {
  label: string,
  value: any,
}

const SelectFilter: FC<SelectFilterProps> = (
  {
    classPrefix,
    options,
    placeholder,
    onChangeHandler,
    defaultValue,
    height,
    width,
  }): JSX.Element => {
  const customStyles = {
    option: () => ({
      cursor: 'pointer',
      fontSize: 12,
      letterSpacing: '0.035em',
      color: '#333333',
      margin: '10px 0 10px 15px'
    }),
    control: () => ({
      display: 'flex',
      alignItems: 'center',
      padding: "10px 15px",
      background: "#FFFFFF",
      border: "1px solid #E0E0E0",
      borderRadius: 12,
      cursor: 'pointer',
      outline: 'none',
      height: height || '100%',
      width: width || '100%',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: 12,
      color: '#333333',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: 12,
      color: '#333333',
    })
  }

  return (
    <Select
      styles={customStyles}
      options={options}
      placeholder={placeholder}
      onChange={onChangeHandler}
      classNamePrefix={classPrefix}
      className={classPrefix}
      defaultValue={defaultValue}
    />
  )
};

export default SelectFilter;
