import React, { FC } from "react";

import "./spinner.styles.scss";


interface SpinnerProps {
  className?: string;
  size?: number;
}

export const Spinner: FC<SpinnerProps> = ({ className, size = 30 }) => {
  const margin = size / 10;
  const border = size / 10;
  const childSize = (size / 10) * 8;

  return (
    <div
      className={className}
      style={{ width: size + "px", height: size + "px" }}
    >
      <div
        className="lds-ring"
        style={{ width: size + "px", height: size + "px" }}
      >
        <div
          style={{
            width: childSize + "px",
            height: childSize + "px",
            margin: margin + "px",
            borderWidth: border + "px",
          }}
        />
        <div
          style={{
            width: childSize + "px",
            height: childSize + "px",
            margin: margin + "px",
            borderWidth: border + "px",
          }}
        />
        <div
          style={{
            width: childSize + "px",
            height: childSize + "px",
            margin: margin + "px",
            borderWidth: border + "px",
          }}
        />
        <div
          style={{
            width: childSize + "px",
            height: childSize + "px",
            margin: margin + "px",
            borderWidth: border + "px",
          }}
        />
      </div>
    </div>
  );
};
