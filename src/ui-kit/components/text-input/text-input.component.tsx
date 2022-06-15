import React, { DetailedHTMLProps, FC, InputHTMLAttributes, useCallback, useMemo, } from "react";
import cn from "classnames";

import { Label } from "@/ui-kit/components/input-label/input-label.component";

import "./text-input.styles.scss";


type DefaultInputProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "value" | "onChange">;

interface IconProps {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export interface TextInputProps extends DefaultInputProps {
  /**
   * Label for input
   */
  label?: string;
  /**
   * Code of icon from material design
   */
  icon?: string;
  /**
   * ClassName for icon component
   */
  iconClassName?: string;
  /**
   * Value for input
   */
  value?: string;
  /**
   * Handle input change
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Input reference
   */
  inputRef?: any;
  /**
   * Text for right button
   */
  btnText?: string;
  /**
   * onClick handler for button
   */
  onClick?: () => void;
  /**
   * key handler to detect tags
   */
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /**
   * Show red border for input
   */
  hasError?: boolean;
  /**
   * Helper text (could be error text)
   */
  helperText?: string;
  /**
   * Show green border for input
   */
  hasSuccess?: boolean;
  /**
   * Make input width 100%
   */
  fullWidth?: boolean;
  /**
   * Use div as wrapper around input. Useful for making input component as flex item
   */
  useWrapper?: boolean;
  wrapperPrefix?: string;
  labelPrefix?: string;
  /**
   * Icons. position: absolute
   */
  icons?: IconProps;
  /**
   * Placeholder
   */
  placeholder?: string;
}

export const TextInput: FC<TextInputProps> = (
  {
    label,
    icon,
    iconClassName,
    className,
    onChange,
    btnText,
    onClick,
    onKeyUp,
    hasError,
    helperText,
    hasSuccess,
    inputRef,
    fullWidth,
    useWrapper,
    wrapperPrefix,
    labelPrefix,
    placeholder,
    icons,
    ...props
  }): JSX.Element => {

  const ref = React.createRef<HTMLInputElement>();

  const existedRef = inputRef || ref;

  const focusInput = useCallback(() => {
    existedRef.current?.focus();
  }, [existedRef]);

  const inputClasses = useMemo(
    () =>
      cn(
        {
          "ui-text-input": true,
          "ui-text-input__connector": btnText && onClick,
          "ui-text-input--error": hasError,
          "ui-text-input--success": hasSuccess,
          "ui-text-input--full-width": fullWidth,
          "ui-text-input--no-helper": !helperText,
          "ui-text-input--has-icon": !!icon,
        },
        className
      ),
    [
      btnText,
      onClick,
      hasError,
      hasSuccess,
      fullWidth,
      helperText,
      className,
      icon,
      icons,
    ]
  );

  const buttonClasses = useMemo(
    () =>
      cn({
        "ui-text-input__button": true,
        "ui-text-input__button--error": hasError,
        "ui-text-input__button--success": hasSuccess,
      }),
    [hasError, hasSuccess]
  );

  const helperClasses = useMemo(
    () =>
      cn({
        "ui-text-input__helper": true,
        "ui-text-input__helper--error": hasError,
        "ui-text-input__helper--success": hasSuccess,
      }),
    [hasError, hasSuccess]
  );

  const iconClasses = useMemo(
    () => cn("ui-text-input-icon", iconClassName),
    [iconClassName]
  );

  const inputBoxClasses = useMemo(
    () =>
      cn({
        "ui-text-input-box": true,
        "ui-text-input-box--end-icon":
          Boolean(icons?.endIcon) && !icons?.startIcon,
        "ui-text-input-box--start-icon":
          Boolean(icons?.startIcon) && !icons?.endIcon,
        "ui-text-input-box--two-icons":
          Boolean(icons?.startIcon) && Boolean(icons?.endIcon),
      }),
    [icons]
  );

  let input = (
    <>
      {icon && (
        <span className={iconClasses} onClick={focusInput}>
          {icon}
        </span>
      )}
      {icons ? (
        <span className={inputBoxClasses}>
          <input
            ref={inputRef}
            className={inputClasses}
            onChange={onChange}
            onKeyUp={onKeyUp}
            placeholder={placeholder}
            {...props}
          />
          {icons.startIcon && icons.endIcon ? (
            <>
              {icons.startIcon}
              {icons.endIcon}
            </>
          ) : icons.startIcon ? (
            icons.startIcon
          ) : (
            icons.endIcon
          )}
        </span>
      ) : (
        <input
          ref={inputRef}
          className={inputClasses}
          onChange={onChange}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
          {...props}
        />
      )}

      {btnText && onClick && (
        <button className={buttonClasses} onClick={onClick}>
          {btnText}
        </button>
      )}
      {helperText && (
        <>
          <span className={helperClasses}>{helperText}</span>
        </>
      )}
    </>
  );

  if (label) {
    input = (
      <Label className={`ui-text-input__label ${labelPrefix}`} label={label}>
        {input}
      </Label>
    );
  }

  if (useWrapper) {
    input = <div className={wrapperPrefix}>{input}</div>;
  }

  return input;
};

TextInput.defaultProps = {
  hasError: false,
  hasSuccess: false,
  fullWidth: false,
  useWrapper: false,
};
