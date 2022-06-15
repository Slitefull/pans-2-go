import React, { FC } from 'react';
import logo from '../../../../../../ui-kit/icons/logo-full.svg';

import './footer.styles.scss';


const Footer: FC = (): JSX.Element => {
  return (
    <div className="footer">
      <div className="left-section">
        <img className="logo" src={logo} alt="Logo"/>
        <p className="text">Copyright © 2022</p>
        <p className="text">Wheels2Go |1345 President St, Brooklyn</p>
        <p className="text">NY 11213, United States</p>
        <p className="link">Privacy Policy</p>
      </div>
      <div className="right-section">
        <p className="title">
          Contacts:
        </p>
        <p className="text">email@email.com</p>
        <p className="text">+17183002727</p>
      </div>
    </div>
  );
};

export default Footer;
