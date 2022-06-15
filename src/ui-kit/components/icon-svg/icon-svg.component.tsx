import React, { FC } from "react";
import cn from "classnames";

import "./icon-svg.styles.scss";


interface Props {
  name?: string | boolean;
  className?: string;
  /**
   * onClick handler for icon
   */
  onClick?: () => void;
}

export const IconSvg: FC<Props> = ({ className, name, onClick }) => {
  const classes = cn(
    {
      [`iconSvg iconSvg-${name}`]: true,
    },
    className
  );

  return (
    <img
      className={classes}
      onClick={onClick}
      src={require(`../../icons/${name}.svg`).default}
    />
  );
};
