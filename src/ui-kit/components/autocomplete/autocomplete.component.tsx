import React, { FC } from 'react';
import Autocomplete from "react-autocomplete";
import { renderStateTitle } from "@/client/view/reserve-now/desktop/const/states-const";

import "./autocomplete.styles.scss";


interface CustomAutocompleteProps {
  label?: string;
  value: string;
  items: Array<any>;
  placeholder?: string;
  onChangeHandler: (val: string) => void;
  isDisabled: boolean;
  withoutZIndex?: boolean;
}

const CustomAutocomplete: FC<CustomAutocompleteProps> = (
  {
    label,
    value,
    items,
    placeholder,
    onChangeHandler,
    isDisabled,
    withoutZIndex,
  }
): JSX.Element => {
  return (
    <div className={`custom-autocomplete ${isDisabled ? "disabled" : null}`}>
      {label && (
        <label className="autocomplete-dropdown__label">
          {label}
        </label>
      )}
      <Autocomplete
        value={value}
        items={items}
        getItemValue={item => item.title}
        shouldItemRender={renderStateTitle}
        renderMenu={item => (
          <div className="autocomplete-dropdown">
            {item.length ? item : 'No options'}
          </div>
        )}
        renderItem={(item, isHighlighted) =>
          <div className={`item ${isHighlighted ? 'selected-item' : ''}`}>
            {item.title}
          </div>
        }
        wrapperProps={{ className: `autocomplete-dropdown-input__wrapper ${withoutZIndex ? "without-z-index" : null}` }}
        inputProps={{
          className: `autocomplete-dropdown-input ${withoutZIndex ? "without-z-index" : null}`,
          placeholder: placeholder || "Select"
        }}
        wrapperStyle={{ position: "relative" }}
        onChange={(event, val) => onChangeHandler(val)}
        onSelect={(val) => onChangeHandler(val)}
      />
    </div>
  );
};

export default CustomAutocomplete;
