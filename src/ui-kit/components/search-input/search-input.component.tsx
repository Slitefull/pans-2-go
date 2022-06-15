import React, { FC, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import cn from "classnames";

import { TextInput } from "@/ui-kit/components/text-input/text-input.component";
import { useOutsideClick } from "@/ui-kit/hooks/use-outsid-click";
import { getCssTransitionClassNames } from "@/ui-kit/helpers/get-css-transition-class-names";

import "./search-input.styles.scss";


type Id = number | string;

interface SearchInputOption {
  id: Id;
  label: string;
}

export interface SearchInputProps {
  initialValue?: string;
  label?: string;
  options: Array<SearchInputOption>;
  selectedOptionId?: Id;
  isLoading?: boolean;
  onOptionSelect: (id: Id) => void;
  onOptionDeselect: (id: Id) => void;
  onTextChange?: (value: string) => void;
  error?: string;
}

const ANIMATION_TIMING = 50;

export const SearchInput: FC<SearchInputProps> = ({
                                                    initialValue,
                                                    selectedOptionId,
                                                    onOptionDeselect,
                                                    onOptionSelect,
                                                    onTextChange,
                                                    options,
                                                    isLoading,
                                                    error,
                                                    ...props
                                                  }) => {
  const [isOpened, setOpened] = useState(false);
  const [value, setValue] = useState(initialValue || "");
  const [shouldReset, setShouldReset] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<{ value: number | undefined }>({
    value: undefined
  });

  const openOptionsList = () => setOpened(true);
  const closeOptionsList = () => setOpened(false);
  const selectOption = (id: Id) => {
    if (selectedOptionId === id) {
      onOptionDeselect(id);
      setValue("");
      onTextChange && onTextChange("");
    } else {
      onOptionSelect(id);
      closeOptionsList();
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onTextChange && onTextChange(event.target.value);

    if (selectedOptionId) {
      onOptionDeselect(selectedOptionId);
      setValue("");
      onTextChange && onTextChange("");
    }

    const optionFound = options.find(
      (option) =>
        option.label.toLowerCase() === event.target.value.toLowerCase()
    );

    if (optionFound) {
      onOptionSelect(optionFound.id);
    }
  };

  const clearForm = () => setShouldReset(true);
  const onBlur = () => {
    timeoutRef.current.value = window.setTimeout(clearForm, 200);
  };
  const onFocus = () => {
    window.clearTimeout(timeoutRef.current?.value);
    timeoutRef.current.value = undefined;
  };

  useOutsideClick(ref, () => {
    closeOptionsList();
  });

  useEffect(() => {
    if (selectedOptionId) {
      const valueCandidate = options.find(
        (option) => option.id === selectedOptionId
      );
      if (valueCandidate) {
        setValue(valueCandidate.label);
        onTextChange && onTextChange(valueCandidate.label);
      } else {
        setValue("");
        onTextChange && onTextChange("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptionId, options]);

  useEffect(() => {
    if (!selectedOptionId) {
      setValue("");
      onTextChange && onTextChange("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptionId]);

  useEffect(() => {
    if (!selectedOptionId && shouldReset) {
      setValue("");
      onTextChange && onTextChange("");
      setShouldReset(false);
    }
  }, [shouldReset]);

  return (
    <div className="searchInput"
         ref={ref}
         onBlur={onBlur}
         onFocus={onFocus}>
      <div className="searchInput__input"
           onClick={openOptionsList}>
        <TextInput
          {...props}
          value={value}
          onChange={handleChange}
          helperText={error}
          hasError={!!error}
        />
      </div>
      <CSSTransition
        in={isOpened}
        timeout={ANIMATION_TIMING}
        classNames={getCssTransitionClassNames("searchInput__options")}
      >
        <ul className="searchInput__options">
          {!isLoading &&
            options
              .filter((option) =>
                option.label.toLowerCase().includes(value.toLowerCase())
              )
              .map((option) => (
                <li
                  key={option.id}
                  className={cn("searchInput__option", {
                    searchInput__option_active: option.id === selectedOptionId
                  })}
                  onClick={() => selectOption(option.id)}
                >
                  {option.label}
                </li>
              ))}
          {isLoading && (
            <li className="searchInput__option searchInput__option_loading">
              Loading...
            </li>
          )}
        </ul>
      </CSSTransition>
    </div>
  );
};
