import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode, } from "react";
import cn from "classnames";
import { IconSvg } from "@/ui-kit/components/icon-svg/icon-svg.component";

import "./button.styles.scss";


type DefaultButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement>;

interface ISvgIcon {
  name?: string;
  nameHovered?: string;
}

export interface ButtonProps extends DefaultButtonProps {
  fullWidth?: boolean;
  withIcon?: boolean;
  outline?: boolean;
  thinFont?: boolean;
  white?: boolean;
  big?: boolean;
  skeleton?: boolean;
  color?: "primary" | "secondary";
  svgIcon?: ISvgIcon;
  customizedIcon?: ReactNode;
}

export const Button: FC<ButtonProps> = (
  {
    children,
    className,
    fullWidth,
    withIcon,
    thinFont,
    outline,
    white,
    big,
    skeleton,
    color,
    svgIcon,
    customizedIcon,
    ...props
  }): JSX.Element => {
  const btnClasses = cn(className, "kit-button", {
    "kit-button--full-width": fullWidth,
    "kit-button--withIcon": withIcon || Boolean(svgIcon),
    "kit-button--big": big,
    "kit-button--outline": outline,
    "kit-button--thinFont": thinFont,
    "kit-button--white": white,
    "kit-button--outline-white": outline && white,
    "kit-button--skeleton": skeleton,
    "kit-button--primary": color === "primary",
  });

  return (
    <button
      className={btnClasses}
      {...props}
    >
      {svgIcon && <IconSvg name={svgIcon.name}/>}
      {customizedIcon && customizedIcon}
      {children}
    </button>
  );
};

Button.defaultProps = {
  fullWidth: false,
};

export const HeadlessButton: FC<DefaultButtonProps> = (
  {
    children,
    className,
    ...props
  }) => (
  <button
    type={"button"}
    className={cn("kit-button--headless", className)}
    {...props}
  >
    {children}
  </button>
);
