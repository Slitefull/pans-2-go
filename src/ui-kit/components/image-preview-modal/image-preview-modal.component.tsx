import React, { Dispatch, FC, SetStateAction, useCallback, useRef } from 'react';
import { createPortal } from "react-dom";
import { useOutsideClick } from "@/ui-kit/hooks/use-outsid-click";
import { AppService } from "@/common/app/domain/app.service";
import { injector } from "@/common/injector/Injector";
import { APP_SERVICE } from "@/common/injector/constants";
import CloseIcon from "@/ui-kit/customized-icons/close/close.component";

import "./image-preview-modal.styles.scss";


interface ImagePreviewModalProps {
  imageSrc: string;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const ImagePreviewModal: FC<ImagePreviewModalProps> = ({ imageSrc, setOpenModal }): JSX.Element => {
  const appService: AppService = injector.get(APP_SERVICE);
  const imageRef = useRef<HTMLDivElement>(null);

  const onClosePreviewHandler = useCallback(() => {
    setOpenModal(false)
    appService.isOverlay = false;
  }, [])

  useOutsideClick(imageRef, () => onClosePreviewHandler());

  return (
    createPortal(
      <div className="image-preview-modal">
        <div ref={imageRef}>
          <img className="image-preview" src={imageSrc} alt="Image"/>
        </div>
        <div className="close-icon-wrapper" onClick={onClosePreviewHandler}>
          <CloseIcon color={"#FFFFFF"}/>
        </div>
      </div>,
      document.getElementById('imagePreview')!,
    ))
};

export default ImagePreviewModal;
