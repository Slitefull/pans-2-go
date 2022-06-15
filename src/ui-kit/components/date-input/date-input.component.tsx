import React, { FC, useCallback } from "react";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";

import { daysOptions, monthOptions, yearOptions } from "./date-input.data";
import { DropdownInput } from "../dropdown-input/dropdown-input.component";

import "./date-input.styles.scss";


export interface DateInputProps {
  /**
   * DateTime value to change
   */
  value: Date;
  /**
   * error message
   */
  error?: string;

  /**
   * change handler
   */
  onChange(value: Date): void;
}

export const DateInput: FC<DateInputProps> = ({ value, onChange, error }) => {
  const { t } = useTranslation();
  const date = DateTime.fromJSDate(value);

  const changeDay = useCallback(
    (day: string | string[]) => {
      onChange(
        DateTime.fromObject({
          year: date.year,
          month: date.month,
          day: Number(day),
        }).toJSDate()
      );
    },
    [date.month, date.year, onChange]
  );

  const changeMonth = useCallback(
    (month: string | string[]) => {
      const daysInMonth = DateTime.local(date.year, Number(month)).daysInMonth;

      onChange(
        DateTime.fromObject({
          year: date.year,
          month: Number(month),
          day: date.day > daysInMonth ? daysInMonth : date.day,
        }).toJSDate()
      );
    },
    [date.day, date.year, onChange]
  );

  const changeYear = useCallback(
    (year: string | string[]) => {
      onChange(
        DateTime.fromObject({
          year: Number(year),
          month: date.month,
          day: date.day,
        }).toJSDate()
      );
    },
    [date.day, date.month, onChange]
  );

  return (
    <div className="dateInput">
      <DropdownInput
        options={daysOptions(date.year, date.month)}
        className="dateInput__day"
        value={date.day}
        onChange={changeDay}
        invalid={!!error}
      />
      <DropdownInput
        options={monthOptions(t)}
        className="dateInput__month"
        value={date.month}
        onChange={changeMonth}
        invalid={!!error}
      />
      <DropdownInput
        options={yearOptions}
        className="dateInput__year"
        value={date.year}
        onChange={changeYear}
        invalid={!!error}
      />
      {error && <div className="dateInput__error">{t(error)}</div>}
    </div>
  );
};
