import React, { FC, memo } from 'react';


interface ArrowIconProps {
  size?: number;
  color?: string;
  onClickHandler?: () => void;
}

const ArrowIcon: FC<ArrowIconProps> = memo(({ size, color, onClickHandler }) => {
  return (
    <svg
      width={size}
      height={size}
      onClick={onClickHandler}
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 13L1 7L7 1"
        stroke={color || "#919191"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default ArrowIcon;
