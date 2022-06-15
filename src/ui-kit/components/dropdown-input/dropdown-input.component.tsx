import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import cn from "classnames";
import { renderToString } from "react-dom/server";
import { CSSTransition } from "react-transition-group";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import { getCssTransitionClassNames } from "@/ui-kit/helpers/get-css-transition-class-names";
import { useOutsideClick } from "../../hooks/use-outsid-click";

import "./dropdown-input.styles.scss";
import { Label } from "@/ui-kit/components/input-label/input-label.component";


export interface DropdownInputProps {
  /**
   * Dropdown options
   */
  options: DropdownInputOption[];
  /**
   * Dropdown value
   */
  value: any;
  /**
   * Dropdown value change handler
   */
  onChange: (value: string | string[]) => void;
  /**
   * Set placeholder for dropdown
   */
  placeholder?: string;
  /**
   * Allow multiple selections
   */
  multiple?: boolean;
  /**
   * Wrapper className
   */
  className?: string;
  /**
   * Mark dropdown as invalid
   */
  hasError?: boolean;
  invalid?: boolean;
  label?: string;
  disable?: boolean;
}

export interface DropdownInputOption {
  id: string | number;
  value: string | number | React.ReactElement;
}

const ANIMATION_TIMING = 50;
const DEFAULT_LIST_HEIGHT = 210;

export const DropdownInput: FC<DropdownInputProps> = ({
  placeholder,
  options,
  value,
  onChange,
  multiple,
  className,
  hasError,
  invalid,
  label,
  disable= false,
}): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [expandToTop, setExpandToTop] = useState(false);
  const toggleOpened = useCallback(
    (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event?.stopPropagation();

      // order of setIsOpened and setExpandToTop matters
      setIsOpened((opened) => !opened);

      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();

        if (
          rect.bottom + DEFAULT_LIST_HEIGHT > window.innerHeight &&
          rect.top - DEFAULT_LIST_HEIGHT > 0
        ) {
          setExpandToTop(true);
        } else {
          setExpandToTop(false);
        }
      }
    },
    [setIsOpened, setExpandToTop]
  );

  const handleItemClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      if (multiple) {
        if (!Array.isArray(value)) {
          onChange([event.currentTarget.id]);
        } else if (value.includes(event.currentTarget.id)) {
          onChange(value.filter((v) => v !== event.currentTarget.id));
        } else {
          onChange(value.concat(event.currentTarget.id));
        }
      } else {
        onChange(event.currentTarget.id);
      }
      setIsOpened(false);
    },
    [onChange, multiple, value, setIsOpened]
  );

  const selectedItem = useMemo(() => {
    if (multiple) {
      return options?.filter((option) => value?.includes(option.id));
    }

    return options?.find((option) => option.id === value);
  }, [options, value, multiple]);

  const wrapperClasses = useMemo(
    () => cn({ dropdown: true, active: isOpened }, className),
    [isOpened, className]
  );
  const selectClasses = cn("select", {
    invalid: invalid || !!hasError,
  });

  useOutsideClick(ref, () => {
    isOpened && toggleOpened();
  });

  const htmlValue = useMemo(() => {
    if (Array.isArray(selectedItem)) {
      if (selectedItem.length) {
        return selectedItem
          .map((v) =>
            React.isValidElement(v.value) ? renderToString(v.value) : v.value
          )
          .join(", ");
      }

      return placeholder!;
    }

    if (selectedItem) {
      return React.isValidElement(selectedItem.value)
        ? renderToString(selectedItem.value)
        : (selectedItem.value as string) ?? placeholder!;
    }

    return placeholder!;
  }, [selectedItem, placeholder]);

  const list = (
    <OverlayScrollbarsComponent
      options={{
        className: "dropdown__listScrollable",
        paddingAbsolute: true,
        scrollbars: {
          autoHide: "never",
        },
      }}
    >
      <ul className="dropdown__list" data-testid="dropdown-list">
        {options?.map((option) => (
          <li
            id={option.id.toString()}
            data-testid={`dropdown-option-${option.id.toString()}`}
            onClick={handleItemClick}
            key={`dropdown-input-${option.id}-${option.value}`}
            className={cn("dropdown__option", {
              dropdown__option_active: Array.isArray(selectedItem)
                ? !!selectedItem.find((v) => v.id === option.id)
                : selectedItem?.id === option.id,
            })}
          >
            {option.value}
          </li>
        ))}
      </ul>
    </OverlayScrollbarsComponent>
  );

  const dropdownInput = (
    <div data-testid="dropdown-root" className={wrapperClasses} ref={ref}>
      <div
        data-testid="dropdown-toggler"
        className={selectClasses}
        onClick={toggleOpened}
      >
        <span
          data-testid="dropdown-value"
          dangerouslySetInnerHTML={{ __html: htmlValue }}
        />
        <i className="material-icons arrow-icon">arrow_drop_down</i>
      </div>
      <CSSTransition
        timeout={ANIMATION_TIMING}
        in={isOpened && expandToTop}
        classNames={getCssTransitionClassNames("dropdown__listWrapperTop")}
      >
        <div className="dropdown__listWrapperTop">{list}</div>
      </CSSTransition>
      {!disable ? <CSSTransition
        timeout={ANIMATION_TIMING}
        in={isOpened && !expandToTop}
        classNames={getCssTransitionClassNames("dropdown__listWrapper")}
      >
        <div className="dropdown__listWrapper">{list}</div>
      </CSSTransition> : null}
    </div>
  );

  if (label) {
    return <Label label={label}>{dropdownInput}</Label>;
  }

  return dropdownInput;
};

DropdownInput.defaultProps = {
  placeholder: "Select",
  multiple: false,
};
