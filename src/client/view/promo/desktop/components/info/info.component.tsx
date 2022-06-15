import React, { FC, ReactNode } from 'react';
import variety from '../../../../../../ui-kit/icons/promo/variety.svg';
import clientOriented from '../../../../../../ui-kit/icons/promo/client-oriented.svg';
import cozyFleet from '../../../../../../ui-kit/icons/promo/cozy-fleet.svg';
import newFeature from '../../../../../../ui-kit/icons/promo/new-feature.svg';

import './info.styles.scss';


interface ContentElement {
  icon: string;
  title: string;
  text: ReactNode;
  classPrefix: string;
}

const ContentElement: FC<ContentElement> = (
  {
    icon,
    title,
    text,
    classPrefix
  }
): JSX.Element => {
  return (
    <div className={`content-element ${classPrefix}`}>
      <img className="image" src={icon} alt="Content"/>
      <p className="title">{title}</p>
      {text}
    </div>
  )
}

const Info: FC = (): JSX.Element => {
  const content: Array<ContentElement> = [
    {
      icon: variety,
      title: 'Variety',
      text: <p className="text">Shabbos and many other packages <br/> that will be perfect for dates or travel</p>,
      classPrefix: 'variety',
    },
    {
      icon: clientOriented,
      title: 'Client-oriented',
      text: <p className="text">Dedicated team will be here when <br/> you need us</p>,
      classPrefix: 'client-oriented',
    },
    {
      icon: cozyFleet,
      title: 'Cozy Fleet',
      text: <p className="text">We think of all the car needs so you <br/> don’t have to</p>,
      classPrefix: 'cozy-fleet',
    },
    {
      icon: newFeature,
      title: 'New Feature',
      text: <p className="text">Book, Locate, Lock and Unlock; all from <br/> the palm of your hand</p>,
      classPrefix: 'new-feature',
    },
  ]

  return (
    <div className="info-section">
      {content.map((el) => (
        <ContentElement
          title={el.title}
          icon={el.icon}
          text={el.text}
          classPrefix={el.classPrefix}
        />
      ))}
    </div>
  );
};

export default Info;
