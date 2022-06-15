import React, { FC, useCallback, useMemo, useState } from "react";
import cn from "classnames";

import { HeadlessButton } from "@/ui-kit/components/button/button.component";
import { Icon } from "@/ui-kit/components/icon/icon.component";
import { ImageViewer } from "@/ui-kit/components/image-preview/image-viewer.component";

import "./image-preview.styles.scss";
import { stopPropagation } from "@/ui-kit/hooks/use-outsid-click";


interface ImagePreviewProps {
  className?: string;
  image: File | string;
  onRemove?: () => void;
  viewer?: boolean;
}

export const ImagePreview: FC<ImagePreviewProps> = ({
                                                      image,
                                                      className,
                                                      onRemove,
                                                      viewer,
                                                    }) => {
  const base64Image = useMemo(
    () => (typeof image === "string" ? image : URL.createObjectURL(image)),
    [image]
  );

  const [viewerVisible, setViewerVisible] = useState(false);
  const showViewer = useCallback(() => {
    if (viewer) {
      setViewerVisible(true);
    }
  }, [setViewerVisible, viewer]);

  const hideViewer = useCallback(() => {
    setViewerVisible(false);
  }, [setViewerVisible]);

  const handleRemove = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      stopPropagation(event);
      if (onRemove) {
        onRemove();
      }
    },
    [onRemove]
  );

  return (
    <>
      <div
        className={cn(
          "imagePreview",
          {
            imagePreview_clickable: viewer,
          },
          className
        )}
        onClick={showViewer}
      >
        {onRemove && (
          <HeadlessButton
            className="imagePreview__button"
            onClick={handleRemove}
          >
            <Icon name="close" size={14} className="imagePreview__icon"/>
          </HeadlessButton>
        )}
        <img className="imagePreview__image" src={base64Image}/>
      </div>
      {viewerVisible && (
        <ImageViewer image={base64Image} onClose={hideViewer}/>
      )}
    </>
  );
};
