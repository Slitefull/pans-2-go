import React, { FC, ReactNode } from 'react';
import Modal from 'react-modal';

import "./modal-full-screen.styles.scss"


interface ModalFullScreenProps {
  isOpen: boolean;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  classPrefix?: string;
}

const ModalFullScreen: FC<ModalFullScreenProps> = (
  {
    isOpen,
    classPrefix,
    header,
    body,
    footer,
  }
): JSX.Element => {
  return (
    <Modal
      isOpen={isOpen}
      className={`modal-full-screen ${classPrefix ?? null}`}
      overlayClassName="custom-modal-overlay"
    >
      <div className="modal-wrapper">
        {header && (
          <div className="modal-header">
            {header}
          </div>
        )}
        <div className="wrapper">
          {body && (
            <div className="modal-body">
              {body}
            </div>
          )}
          {footer && (
            <div className="modal-footer">
              {footer}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalFullScreen;
