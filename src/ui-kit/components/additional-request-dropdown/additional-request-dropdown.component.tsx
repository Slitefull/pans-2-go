import React, { FC } from "react";
import { observer } from "mobx-react";

import AdditionalRequestDropdownElement
  from "@/ui-kit/components/additional-request-dropdown-element/additional-request-dropdown-element.component";

import "./additional-request-dropdown.styles.scss";


interface AdditionalRequestDropdownProps {
  label?: string;
  options: Array<{ name: string, label: string }>;
  disabled?: boolean;
  selectedOptions: Array<string>;
}

const AdditionalRequestDropdown: FC<AdditionalRequestDropdownProps> = observer((
  {
    label,
    options,
    disabled = false,
    selectedOptions
  }
): JSX.Element => {
  return (
    <div className="additional-request-dropdown">
      <div className="additional-request-dropdown__header">
        <div className="additional-request-dropdown__header__title">
          {label}
        </div>
      </div>

      <div className="additional-request-dropdown__wrapper">
        {options.map((element) => (
          <AdditionalRequestDropdownElement
            name={element.name}
            label={element.label}
            disabled={disabled}
            isChecked={selectedOptions.includes(element.name)}
          />
        ))}
      </div>
    </div>
  );
});

export default AdditionalRequestDropdown;
