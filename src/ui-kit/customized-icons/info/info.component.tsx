import React, { FC, memo } from 'react';


interface InfoIconProps {
  size?: number;
  color?: string;
  onClickHandler?: () => void;
}

const InfoIcon: FC<InfoIconProps> = memo((
  {
    size,
    color,
    onClickHandler,
  }
): JSX.Element => {
  return (
    <svg
      width={size}
      height={size}
      style={{ cursor: 'pointer' }}
      onClick={onClickHandler}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_102_3423)">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M9 2.75C5.27208 2.75 2.25 5.77208 2.25 9.5C2.25 13.2279 5.27208 16.25 9 16.25C12.7279 16.25 15.75 13.2279 15.75 9.5C15.75 5.77208 12.7279 2.75 9 2.75ZM0.75 9.5C0.75 4.94365 4.44365 1.25 9 1.25C13.5563 1.25 17.25 4.94365 17.25 9.5C17.25 14.0563 13.5563 17.75 9 17.75C4.44365 17.75 0.75 14.0563 0.75 9.5Z"
              fill={color || "#333333"}/>
        <path fillRule="evenodd" clipRule="evenodd"
              d="M9 8.75C9.41421 8.75 9.75 9.08579 9.75 9.5V12.5C9.75 12.9142 9.41421 13.25 9 13.25C8.58579 13.25 8.25 12.9142 8.25 12.5V9.5C8.25 9.08579 8.58579 8.75 9 8.75Z"
              fill={color || "#333333"}/>
        <path fillRule="evenodd" clipRule="evenodd"
              d="M8.25 6.5C8.25 6.08579 8.58579 5.75 9 5.75H9.0075C9.42171 5.75 9.7575 6.08579 9.7575 6.5C9.7575 6.91421 9.42171 7.25 9.0075 7.25H9C8.58579 7.25 8.25 6.91421 8.25 6.5Z"
              fill={color || "#333333"}/>
      </g>
      <defs>
        <clipPath id="clip0_102_3423">
          <rect width="18" height="18" fill="white" transform="translate(0 0.5)"/>
        </clipPath>
      </defs>
    </svg>

  );
});

export default InfoIcon;
