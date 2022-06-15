import React, { FC, memo } from 'react';


interface CarsIconProps {
  size?: number;
  color?: string;
  onClickHandler?: () => void;
}

const SettingsMenuCloseIcon: FC<CarsIconProps> = memo(({ size, color, onClickHandler }) => {
  return (
    <svg
      width={size || 34}
      height={size || 34}
      viewBox="0 0 34 34" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClickHandler}
    >
      <rect x="0.75" y="0.75" width="32.5" height="32.5" rx="16.25" fill="white"/>
      <path d="M21.5 12.5L12.5 21.5" stroke={color || "#333333"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.5 12.5L21.5 21.5" stroke={color || "#333333"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="0.75" y="0.75" width="32.5" height="32.5" rx="16.25" stroke={color || "#333333"} strokeWidth="1.5"/>
    </svg>
    
    
  );
});

export default SettingsMenuCloseIcon;
