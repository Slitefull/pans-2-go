import React, { FC } from 'react';
import "./status.styles.scss"


interface StatusProps {
  name: string,
  color: string,
}

const Status: FC<StatusProps> = ({ name, color }): JSX.Element => {
  return (
    <div
      className="status-container"
      style={{ backgroundColor: color }}
    >
      {name}
    </div>
  );
};

export default Status;
