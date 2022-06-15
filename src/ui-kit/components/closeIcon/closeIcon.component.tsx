import React, { CSSProperties, FC } from "react";

import "./closeIcon.styles.scss";


export interface CloseIconProps {
  onClick: () => void;
  style: CSSProperties;
}

export const CloseIcon: FC<CloseIconProps> = ({
                                                onClick,
                                                style,
                                              }): JSX.Element => {
  return <span className="close-icon" style={style} onClick={onClick}/>;
};
