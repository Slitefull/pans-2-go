import React, { FC } from 'react';

import './title.styles.scss';


interface TimelineTitleProps {
  title: string;
  additionalText?: string;
}

const TimelineTitle: FC<TimelineTitleProps> = (
  {
    title,
    additionalText
  }
): JSX.Element => {
  return (
    <div className="timeline-title">
      <span>{title}</span>
      {additionalText && <span className="additional-text">{additionalText}</span>}
    </div>
  );
};

export default TimelineTitle;
