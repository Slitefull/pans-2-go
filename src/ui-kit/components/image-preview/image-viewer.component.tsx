import React, { FC } from "react";

import { HeadlessButton } from "@/ui-kit/components/button/button.component";
import { Icon } from "@/ui-kit/components/icon/icon.component";

import "./image-viewer.styles.scss";


interface ImageViewerProps {
  image: string;
  onClose: () => void;
}

export const ImageViewer: FC<ImageViewerProps> = ({ image, onClose }) => {
  return (
    <div className="imageViewer">
      <HeadlessButton className="imageViewer__closeButton" onClick={onClose}>
        <Icon name="close" size={20} className="imageViewer__closeIcon"/>
      </HeadlessButton>
      <img className="imageViewer__image" src={image}/>
    </div>
  );
};
