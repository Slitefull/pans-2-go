import React, { FC, memo } from 'react';


interface CarsIconProps {
  size?: number;
  color?: string;
  onClickHandler?: () => void;
}

const SortIcon: FC<CarsIconProps> = memo(({ size, color, onClickHandler }) => {
  return (
    <svg
      width={size || 18}
      height={size || 18}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClickHandler}
      style={{ cursor: 'pointer' }}
    >
      <g clipPath="url(#clip0_146_3473)">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M12.4141 15.364C12.8047 14.9734 13.4378 14.9734 13.8284 15.364L17.3639 18.8995L20.8994 15.364C21.2899
              14.9734 21.9231 14.9734 22.3136 15.364C22.7042 15.7545 22.7042 16.3877 22.3136 16.7782L18.071
              21.0208C17.6805 21.4113 17.0473 21.4113 16.6568 21.0208L12.4141 16.7782C12.0236 16.3877 12.0236 15.7545 12.4141 15.364Z"
              fill={color || "#333333"}/>
        <path fillRule="evenodd" clipRule="evenodd"
              d="M17.364 3.41422C17.9162 3.41422 18.364 3.86194 18.364 4.41422V20.3137C18.364 20.866 17.9162 21.3137
              17.364 21.3137C16.8117 21.3137 16.364 20.866 16.364 20.3137V4.41422C16.364 3.86194 16.8117
              3.41422 17.364 3.41422Z"
              fill={color || "#333333"}/>
        <path fillRule="evenodd" clipRule="evenodd"
              d="M1.55037 9.5C1.15984 9.10947 1.15984 8.47631 1.55037 8.08579L5.79301 3.84315C6.18353 3.45262 6.8167
              3.45262 7.20722 3.84315L11.4499 8.08579C11.8404 8.47631 11.8404 9.10947 11.4499 9.5C11.0593
              9.89052 10.4262 9.89052 10.0356 9.5L6.50012 5.96447L2.96458 9.5C2.57406 9.89052 1.94089 9.89052 1.55037 9.5Z"
              fill={color || "#333333"}/>
        <path fillRule="evenodd" clipRule="evenodd"
              d="M6.50019 3.55025C7.05248 3.55025 7.50019 3.99797 7.50019 4.55025L7.50019 20.4497C7.50019 21.002
              7.05248 21.4497 6.50019 21.4497C5.94791 21.4497 5.50019 21.002 5.50019
              20.4497V4.55025C5.50019 3.99797 5.94791 3.55025 6.50019 3.55025Z"
              fill={color || "#333333"}/>
      </g>
      <defs>
        <clipPath id="clip0_146_3473">
          <rect width={size || 18} height={size || 18} fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
});

export default SortIcon;
