import React, { FC } from "react";
// @ts-ignore
import ModalImage from "react-modal-image";
import { RoundButton } from "@/ui-kit/components/round-button/round-button.component";


interface CustomerImagePreviewProps {
  image: File | string;
  onRemove: () => void;
  isShowRemoveButton: boolean;
}

export const CustomerImagePreview: FC<CustomerImagePreviewProps> = (
  {
    image,
    onRemove,
    isShowRemoveButton
  }
): JSX.Element => {
  return (
    <div className="ui-kit-uploader ui-kit-uploader--preview">
      <ModalImage
        className="ui-kit-uploader--image"
        small={image}
        large={image}
        alt="Image preview"
      />
      {isShowRemoveButton && (
        <RoundButton
          name="close"
          onClick={onRemove}
          className="ui-kit-uploader--close-button"
        />
      )}
    </div>
  );
};
