import React, { FC } from "react";
import cn from "classnames";

import "./icon.styles.scss";


interface Props {
  name: string;
  color?: string;
  size?: number;
  marketplug?: boolean;
  className?: string;
  /**
   * onClick handler for icon
   */
  onClick?: () => void;
}

export const Icon: FC<Props> = ({
                                  className,
                                  name,
                                  color,
                                  size = 24,
                                  marketplug,
                                  onClick,
                                }) => {
  const classes = cn(
    {
      [`icon marketplug-icon marketplug-icon-${name}`]: marketplug,
      "material-icons": !marketplug,
    },
    className
  );

  return (
    <i
      className={classes}
      style={{ fontSize: size, height: `${size}px`, color }}
      onClick={onClick}
    >
      {marketplug ? "" : name}
    </i>
  );
};
