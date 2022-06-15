import React, { FC } from 'react';
import DatePicker from "react-datepicker";

import './datepicker.styles.scss';


interface CustomDatepickerProps {
  selected: Date | null;
  classPrefix?: string;
  onChangeHandler: (date: Date) => void;
  timeInterval?: number;
  isShowTimeSelect?: boolean;
  placeholderText?: string;
  dateFormat?: string;
  label?: string;
  disabled?: boolean;
}

const CustomDatepicker: FC<CustomDatepickerProps> = (
  {
    selected,
    classPrefix,
    onChangeHandler,
    timeInterval,
    isShowTimeSelect,
    placeholderText,
    dateFormat,
    label,
    disabled,
  }
): JSX.Element => {
  return (
    <div className="custom-datepicker">
      {label && <label className="custom-datepicker__label">{label}</label>}
      <DatePicker
        selected={selected}
        disabled={disabled}
        className={`datepicker ${classPrefix ?? ''} ${disabled ? 'disabled' : ''}`}
        onChange={(date) => onChangeHandler(date!)}
        timeIntervals={timeInterval || 15}
        showTimeSelect={isShowTimeSelect}
        placeholderText={placeholderText || "mm/dd/yy, HH:MM"}
        dateFormat={dateFormat || "MMM, d yyyy h:mm aa"}
      />
    </div>
  );
};

export default CustomDatepicker;
