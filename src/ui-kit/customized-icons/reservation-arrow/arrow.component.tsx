import React, { FC, memo } from 'react';


interface ReservationArrowIconProps {
  size?: number;
  color?: string;
}

const ReservationArrowIcon: FC<ReservationArrowIconProps> = memo(({ size, color }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 13.5L1.5 7.5L7.5 1.5" stroke={color} strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round"/>
    </svg>
  );
});

export default ReservationArrowIcon;
