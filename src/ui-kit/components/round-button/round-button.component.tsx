import React, { FC } from "react";
import cn from "classnames";

import { ButtonProps, HeadlessButton, } from "@/ui-kit/components/button/button.component";
import { Icon } from "@/ui-kit/components/icon/icon.component";

import "./round-button.styles.scss";


interface RoundButtonProps {
  name: string;
  marketplug?: boolean;
}

export const RoundButton: FC<ButtonProps & RoundButtonProps> = ({
                                                                  name,
                                                                  className,
                                                                  marketplug,
                                                                  ...props
                                                                }) => {
  const classNames = cn("pencilButton", className);

  return (
    <HeadlessButton className={classNames} {...props}>
      <Icon name={name} size={10} marketplug={marketplug}/>
    </HeadlessButton>
  );
};
