import React, { FC } from 'react';

import "./bullet.styles.scss";


interface BulletProps {
  name: string,
  title: string;
  isActive: boolean;
  onClickHandler: (key: string) => void;
}

const Bullet: FC<BulletProps> = (
  {
    name,
    title,
    isActive,
    onClickHandler
  }
): JSX.Element => {
  return (
    <div
      className={`bullet ${isActive ? "active" : ""}`}
      onClick={() => onClickHandler(name)}
    >
      {title}
    </div>
  );
};

export default Bullet;