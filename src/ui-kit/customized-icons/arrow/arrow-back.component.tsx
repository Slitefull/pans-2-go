import React, { FC, memo } from 'react';


interface ArrowBackIconProps {
  size?: number;
  color?: string;
  onClickHandler?: () => void;
}

const ArrowBackIcon: FC<ArrowBackIconProps> = memo(({ size, color, onClickHandler }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 24"
      onClick={onClickHandler}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.5 18L9.5 12L15.5 6"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
      />
    </svg>
  );
});

export default ArrowBackIcon;
