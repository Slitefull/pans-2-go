import React, { FC, memo } from 'react';

import './line.styles.scss';


export enum DashboardLineAlign {
  Left = "left",
  Right = "right",
}

interface LineProps {
  width?: number;
  align?: DashboardLineAlign;
}

const Line: FC<LineProps> = memo(({ width, align }): JSX.Element => {
  return (
    <div className={`line ${align}`} style={{ width: `${width}%` }}/>
  );
});

export default Line;
