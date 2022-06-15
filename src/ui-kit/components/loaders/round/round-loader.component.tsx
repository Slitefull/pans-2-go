import React, { FC, memo } from 'react';
import { createPortal } from 'react-dom';

import "./round-loader.styles.scss";


interface RoundLoaderProps {
  inContainer?: boolean;
  fitContent?: boolean;
}

const RoundLoader: FC<RoundLoaderProps> = memo(({ inContainer, fitContent }) => {
  if (inContainer) {
    return <div className={`round-loader-wrapper ${fitContent && "fit-content"}`}>
      <span className="spinner"/>
    </div>
  }

  return (
    createPortal(
      <div className={`round-loader-wrapper ${fitContent && "fit-content"}`}>
        <span className="spinner"/>
      </div>,
      document.getElementById('loader')!,
    ))
});

export default RoundLoader;
