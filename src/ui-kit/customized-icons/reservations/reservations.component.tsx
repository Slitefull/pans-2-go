import React, { FC, memo } from 'react';


interface ReservationsProps {
  size?: number;
  color?: string;
  onClickHandler?: () => void;
}

const ReservationsIcon: FC<ReservationsProps> = memo(({ size, color, onClickHandler }) => {
  return (
    <svg
      width={size || 18}
      height={size || 18}
      viewBox="0 0 18 18"
      fill="none"
      onClick={onClickHandler}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25ZM0.75 9C0.75 4.44365 4.44365 0.75 9 0.75C13.5563 0.75 17.25 4.44365 17.25 9C17.25 13.5563 13.5563 17.25 9 17.25C4.44365 17.25 0.75 13.5563 0.75 9Z"
        fill={color || "#919191"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 3.75C9.41421 3.75 9.75 4.08579 9.75 4.5V8.53647L12.3354 9.82918C12.7059 10.0144 12.8561 10.4649 12.6708 10.8354C12.4856 11.2059 12.0351 11.3561 11.6646 11.1708L8.66459 9.67082C8.4105 9.54378 8.25 9.28408 8.25 9V4.5C8.25 4.08579 8.58579 3.75 9 3.75Z"
        fill={color || "#919191"}
      />
    </svg>
  );
});

export default ReservationsIcon;