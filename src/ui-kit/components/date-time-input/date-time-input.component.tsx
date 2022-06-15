import React, { FC, useRef } from "react";
import { DateTime } from "luxon";
import DateTimePicker from "react-rainbow-components/components/DateTimePicker";
import cn from "classnames";

import { Icon } from "@/ui-kit/components/icon/icon.component";
import { Label } from "@/ui-kit/components/input-label/input-label.component";

import "./date-time-input.styles.scss";


export interface DateTimeInputProps {
  label: string;
  value: DateTime;
  error?: string;
  onChange: (value: DateTime) => void;
}

export const DateTimeInput: FC<DateTimeInputProps> = ({
                                                        value,
                                                        onChange,
                                                        label,
                                                        error,
                                                      }) => {
  const ref = useRef<HTMLInputElement>(null);
  const handleClick = (event: React.MouseEvent) => {
    ref.current?.click();
  };
  const handleChange = (date: Date) => {
    onChange(DateTime.fromJSDate(date));
  };

  const dateTimePicker = (
    <div className="dateTimeInput">
      <div
        className={cn("dateTimeInput__container", {
          dateTimeInput__container_error: !!error,
        })}
        onClick={handleClick}
      >
        <Icon name="date_range" size={18} className="dateTimeInput__icon"/>
        <div className="dateTimeInput__text dateTimeInput__time">
          {value.toFormat("dd.MM.yyyy")}
        </div>
        <Icon name="schedule" size={18} className="dateTimeInput__icon"/>
        <div className="dateTimeInput__text">{value.toFormat("hh:mm a")}</div>
      </div>
      {!!error && <div className="dateTimeInput__error">{error}</div>}
      <DateTimePicker
        value={value.toJSDate()}
        ref={ref}
        className="dateTimeInput__input"
        onChange={handleChange}
      />
    </div>
  );

  return label ? <Label label={label}>{dateTimePicker}</Label> : dateTimePicker;
};
