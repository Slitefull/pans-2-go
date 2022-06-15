import React, { FC, memo } from 'react';

import './info-card.styles.scss';


interface InfoCardProps {
  text: string;
}

const InfoCard: FC<InfoCardProps> = memo(({ text }): JSX.Element => {
  return (
    <div className="info-card">
      {text}
    </div>
  );
});

export default InfoCard;
