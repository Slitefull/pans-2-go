import React, { FC, ReactNode } from 'react';
import Modal from 'react-modal';

import "./custom-modal.styles.scss"


interface CustomModalsProps {
  isOpen: boolean;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
}

const CustomModal: FC<CustomModalsProps> = (
  {
    isOpen,
    header,
    body,
    footer,
  }
): JSX.Element => {
  return (
    <Modal
      isOpen={isOpen}
      className="custom-modal"
      overlayClassName="custom-modal-overlay"
    >
      <div className="wrapper">
        <div className="modal-body">
          {header}
        </div>
        <div className="modal-body">
          {body}
        </div>
        <div className="modal-footer">
          {footer}
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
