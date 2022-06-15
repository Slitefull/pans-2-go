import React, {FC, useEffect, useState} from "react";
import { FormsInputRadio } from "@/ui-kit/components/forms/radio/forms-radio.component";

import "./forms-radio-group.styles.scss";


interface FormsInputRadioGroupProps {
  label?: string;
  checked?: string;
  setValue?: (value: string | undefined) => void;
  radioValues: RadioValue[];
}

interface RadioValue {
  label: string;
  value: string;
}

export const FormsInputRadioGroup: FC<FormsInputRadioGroupProps> = (
  {
    radioValues,
    checked,
    setValue,
    label,
  }): JSX.Element => {
  const [check, setCheck] = useState<string | undefined>(checked);

  useEffect(() => {
    setCheck(checked);
  }, []);

  return (
    <div>
      <label className="inputLabel">{label}</label>
      <div className="forms-input-radio-group">
        {radioValues.map((radio) => (
          <FormsInputRadio
            name="notificationType"
            value={radio.value}
            label={radio.label}
            checked={radio.value === check}
            onClickHandler={() => { setCheck(radio.value);
            if (setValue) {
                setValue(radio.value);
            } } }
          />
        ))}
      </div>
    </div>
  );
}
