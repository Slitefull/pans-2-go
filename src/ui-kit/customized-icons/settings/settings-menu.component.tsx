import React, { FC, memo } from 'react';


interface CarsIconProps {
  size?: number;
  color?: string;
  onClickHandler?: () => void;
}

const SettingsMenuIcon: FC<CarsIconProps> = memo(({ size, color, onClickHandler }) => {
  return (
    <svg width={size || 34} height={size || 34} viewBox="0 0 34 34" fill="none" onClick={onClickHandler}
         xmlns="http://www.w3.org/2000/svg">
      <rect x="0.75" y="0.75" width="32.5" height="32.5" rx="16.25" fill={color}/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M9.5 17C9.5 16.5858 9.83579 16.25 10.25 16.25H23.75C24.1642 16.25 24.5 16.5858 24.5 17C24.5 17.4142 24.1642 17.75 23.75 17.75H10.25C9.83579 17.75 9.5 17.4142 9.5 17Z"
            fill="#333333"/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M9.5 12.5C9.5 12.0858 9.83579 11.75 10.25 11.75H23.75C24.1642 11.75 24.5 12.0858 24.5 12.5C24.5 12.9142 24.1642 13.25 23.75 13.25H10.25C9.83579 13.25 9.5 12.9142 9.5 12.5Z"
            fill="#333333"/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M9.5 21.5C9.5 21.0858 9.83579 20.75 10.25 20.75H23.75C24.1642 20.75 24.5 21.0858 24.5 21.5C24.5 21.9142 24.1642 22.25 23.75 22.25H10.25C9.83579 22.25 9.5 21.9142 9.5 21.5Z"
            fill="#333333"/>
      <rect x="0.75" y="0.75" width="32.5" height="32.5" rx="16.25" stroke="#333333" strokeWidth="1.5"/>
    </svg>

  );
});

export default SettingsMenuIcon;
