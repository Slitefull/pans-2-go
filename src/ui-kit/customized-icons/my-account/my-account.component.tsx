import React, { FC, memo } from 'react';


interface MyAccountProps {
  size?: number;
  color?: string;
  onClickHandler?: () => void;
}

const MyAccountIcon: FC<MyAccountProps> = memo(({ size, color, onClickHandler }) => {
  return (
    <svg
      width={size || 18}
      height={size || 18}
      onClick={onClickHandler}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd"
            d="M3.34835 11.5984C4.05161 10.8951 5.00544 10.5 6 10.5H12C12.9946 10.5 13.9484 10.8951 14.6517
            11.5984C15.3549 12.3016 15.75 13.2554 15.75 14.25V15.75C15.75 16.1642 15.4142 16.5 15 16.5C14.5858
            16.5 14.25 16.1642 14.25 15.75V14.25C14.25 13.6533 14.0129 13.081 13.591 12.659C13.169 12.2371 12.5967
            12 12 12H6C5.40326 12 4.83097 12.2371 4.40901 12.659C3.98705 13.081 3.75 13.6533 3.75 14.25V15.75C3.75
            16.1642 3.41421 16.5 3 16.5C2.58579 16.5 2.25 16.1642 2.25 15.75V14.25C2.25 13.2554 2.64509 12.3016
            3.34835 11.5984Z"
            fill={color || "#919191"}/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M9 3C7.75736 3 6.75 4.00736 6.75 5.25C6.75 6.49264 7.75736 7.5 9 7.5C10.2426 7.5 11.25 6.49264
            11.25 5.25C11.25 4.00736 10.2426 3 9 3ZM5.25 5.25C5.25 3.17893 6.92893 1.5 9 1.5C11.0711 1.5 12.75 3.17893
            12.75 5.25C12.75 7.32107 11.0711 9 9 9C6.92893 9 5.25 7.32107 5.25 5.25Z"
            fill={color || "#919191"}/>
    </svg>
  );
});

export default MyAccountIcon;