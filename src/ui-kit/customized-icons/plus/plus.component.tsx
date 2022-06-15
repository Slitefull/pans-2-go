import React, { FC, memo } from 'react';


interface PlusIconProps {
  color?: string;
  size?: number;
}

const PlusIcon: FC<PlusIconProps> = memo(({ color, size }) => {
  return (
    <svg
      width={size || 15}
      height={size || 15}
      viewBox="0 0 18 18"
      fill={color || "#333333"}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 3.75V14.25"
        stroke={color || "#333333"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 9H14.25"
        stroke={color || "#333333"}
        strokeWidth="2" strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default PlusIcon;
