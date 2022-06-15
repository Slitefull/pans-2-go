import React, { BaseSyntheticEvent, FC } from 'react';
import searchIcon from "@/ui-kit/icons/search.svg"

import "./search.styles.scss"


interface SearchInputProps {
  classPrefix?: string;
  placeholder?: string;
  onChangeHandler: (e: BaseSyntheticEvent) => void;
  icon?: string;
  styles?: { [key: string]: string };
}

const SearchInput: FC<SearchInputProps> = (
  {
    classPrefix,
    placeholder,
    onChangeHandler,
    icon,
    styles
  }
): JSX.Element => {
  return (
    <div
      className={`search ${classPrefix}`}
      style={styles}
    >
      <img src={icon || searchIcon} alt="Search"/>
      <input
        type="text"
        className="search-input"
        onChange={(e) => onChangeHandler(e)}
        placeholder={placeholder || "Search by name"}
      />
    </div>
  );
};

export default SearchInput;
