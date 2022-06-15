import React, { DetailedHTMLProps, FC, InputHTMLAttributes, useMemo, } from "react";
import cn from "classnames";

import { getIncrementalId } from "@/ui-kit/helpers/generate-id";

import "./radio-input.styles.scss";


type DefaultRadioInputProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "type" | "id" | "checked">;

export interface RadioInputProps extends DefaultRadioInputProps {
  /**
   * Radio label content
   */
  label: string;
  /**
   * State of the radio input
   */
  checked?: boolean;
}

export const RadioInput: FC<RadioInputProps> = ({
                                                  label,
                                                  ...props
                                                }): JSX.Element => {
  const id = useMemo(() => "radio_input_id_" + getIncrementalId(), []);

  return (
    <label className="radioInput">
      <div
        className={cn("radioInput__outerCircle", {
          radioInput__outerCircle_active: props.checked,
        })}
      >
        <div
          className={cn("radioInput__innerCircle", {
            radioInput__innerCircle_active: props.checked,
          })}
        />
      </div>
      <div className="radioInput__label">{label}</div>
      <input className="radioInput__input" type="radio" id={id} {...props} />
    </label>
  );
};
