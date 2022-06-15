import React, { FC, useCallback, useEffect, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { RoundButton } from "@/ui-kit/components/round-button/round-button.component";
import CloseIcon from "@/ui-kit/customized-icons/close/close.component";
// @ts-ignore
import ModalImage from "react-modal-image";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { injector } from "@/common/injector/Injector";
import { APP_SERVICE, NOTIFICATION_SERVICE } from "@/common/injector/constants";
import { isURL } from "@/common/helpers/isUrl.helper";
import { Media } from "@/common/media/api/media.repo";
import Slider from "react-slick";
import { createImageUrl } from "@/common/helpers/createImageUrl.helper";

import "./files-dropzone-uploader.styles.scss";
import ImagePreviewModal from "@/ui-kit/components/image-preview-modal/image-preview-modal.component";
import { AppService } from "@/common/app/domain/app.service";


interface FilesDropzoneUploaderProps {
  options?: DropzoneOptions;
  label?: string;
  style?: any;
  classPrefix?: string;
  placeholder?: string;
  isMini?: boolean;
}

export const FilesDropzoneUploader: FC<FilesDropzoneUploaderProps> = (
  {
    options,
    label,
    style,
    classPrefix,
    placeholder,
    isMini,
  }) => {
  const { t } = useTranslation();
  const notificationService: NotificationService = injector.get(NOTIFICATION_SERVICE);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
    isDragReject,
  } = useDropzone(options);

  const dropzoneClasses = cn({
    "ui-kit-uploader": true,
    "ui-kit-uploader--reject": isDragReject,
    "ui-kit-uploader--accept": isDragActive,
    "ui-kit-uploader--mini": isMini,
  });

  useEffect(() => {
    if (fileRejections.length) {
      const errors: any = [];
      fileRejections.forEach((file) => errors.push(...file.errors))

      const errorsMessages = errors.map((error: { type: string, message: string }) => error.message);
      const uniqueMessages = Array.from(new Set(errorsMessages));
      uniqueMessages.forEach((message) => {
        notificationService.notify({
          message: `${message}`,
          status: "error",
        })
      })
    }
  }, [fileRejections.length]);

  return (
    <div style={style}>
      <label className="ui-kit-uploader__label">{label}</label>
      <div {...getRootProps()} className={`${dropzoneClasses} ${classPrefix}`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>{t("ui-kit.drop-files")}</p>
        ) : (
          <p className="ui-kit-uploader__placeholder">
            {placeholder || "Drag and drop files here or upload"}
          </p>
        )}
      </div>
    </div>
  );
};

interface FilesDropzoneUploaderMinimizedProps {
  options?: DropzoneOptions;
  label?: string;
  onDeleteHandler?: () => void;
  isDisabled?: boolean;
  classPrefix?: string;
  defaultFiles?: Array<Media>;
  isHideUploader?: boolean;
}

export const FilesDropzoneUploaderMinimized: FC<FilesDropzoneUploaderMinimizedProps> = (
  {
    label,
    options,
    onDeleteHandler,
    isDisabled,
    classPrefix,
    defaultFiles,
    isHideUploader,
  }) => {
  const { t } = useTranslation();
  const notificationService: NotificationService = injector.get(NOTIFICATION_SERVICE);
  const { getRootProps, getInputProps, open, acceptedFiles, fileRejections } = useDropzone(options);

  const [selectedFiles, setSelectedFiles] = useState<any>();

  const onClearHandler = useCallback(
    (file: any) => {
      if (onDeleteHandler) {
        onDeleteHandler();
      }
      const newFiles = [...selectedFiles];
      newFiles.splice(file, 1);
      setSelectedFiles(newFiles);
      acceptedFiles.splice(file, 1);
    },
    [acceptedFiles, onDeleteHandler, selectedFiles]
  );

  useEffect(() => {
    setSelectedFiles(acceptedFiles);
  }, [acceptedFiles.length])

  useEffect(() => {
    if (fileRejections.length) {
      const errors: any = [];
      fileRejections.forEach((file) => errors.push(...file.errors))

      const errorsMessages = errors.map((error: { type: string, message: string }) => error.message);
      const uniqueMessages = Array.from(new Set(errorsMessages));
      uniqueMessages.forEach((message) => {
        notificationService.notify({
          message: `${message}`,
          status: "error",
        })
      })
    }
  }, [fileRejections.length]);

  return (
    <div className={`dropzone-minimized ${classPrefix}`}>
      {!isHideUploader && <div {...getRootProps()} onClick={(e) => e.stopPropagation()}>
        <input {...getInputProps()} disabled={isDisabled}/>
        <button
          className={`dropzone-minimized__button ${isDisabled && "disabled"}`}
          type="button"
          onClick={open}
        >
          {label}
        </button>
      </div>}
      {defaultFiles?.length && !acceptedFiles.length ? (
        defaultFiles.map((file) => (
          <div className="dropzone-minimized__file__wrapper">
            {file?.imageUrl &&
              <a href={createImageUrl(file?.imageUrl)} className="dropzone-minimized__file" download={"test"}
                 target="_blank" rel="noreferrer">
                {'File'}
              </a>}
            {(!isHideUploader && file?.imageUrl) && <CloseIcon size={15} onClickHandler={() => onClearHandler(file)}/>}
          </div>
        ))
      ) : null}
      {acceptedFiles.length ? (
        acceptedFiles.map((file) => (
          <p key={file.name} className="dropzone-minimized__file">
            {`${t("ui-kit.file")}: ${file.name}`}
            <CloseIcon size={15} onClickHandler={() => onClearHandler(file)}/>
          </p>
        ))
      ) : null}
    </div>
  );
};

interface ImagePreviewProps {
  image?: File | string;
  images?: Array<File | string>;
  links?: Array<string>;
  onRemove?: () => void;
  classPrefix?: string;
  imageClassPrefix?: string;
}

export const ImagePreview: FC<ImagePreviewProps> = (
  {
    image,
    images,
    links,
    onRemove,
    classPrefix,
    imageClassPrefix,
  }) => {
  const appService: AppService = injector.get(APP_SERVICE);

  const [sliderImages, setSliderImages] = useState<Array<{ src: string }>>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [imageToPreview, setImageToPreview] = useState<string>('');

  const sliderSettings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleMultipleImages = (files: Array<File | string | undefined>) => {
    const selectedFiles: Array<{ src: string }> = [];
    const targetFilesObject = [...files];
    targetFilesObject.map((file) => selectedFiles.push({ src: URL.createObjectURL(file) }));
    setSliderImages(selectedFiles);
  };

  const onSetImageToPreviewHandler = (imageLink: string) => {
    setModalOpen(true);
    setImageToPreview(imageLink);
    appService.isOverlay = true;
  }

  useEffect(() => {
    if (images?.length) handleMultipleImages(images);
  }, [images])

  return (
    <div className={`ui-kit-uploader ui-kit-uploader--preview ${classPrefix}`}>
      {links?.length ? (
        <>
          <Slider {...sliderSettings}>
            {links?.map((link) => (
              <img
                className={`ui-kit-uploader--image ${imageClassPrefix}`}
                onClick={() => onSetImageToPreviewHandler(link)}
                alt="Image"
                src={link}
              />
            ))}
          </Slider>
        </>
      ) : null}
      {(images?.length && !links?.length) ? (
        <>
          <Slider {...sliderSettings}>
            {sliderImages?.map((image) => (
              <img
                className={`ui-kit-uploader--image ${imageClassPrefix}`}
                onClick={() => onSetImageToPreviewHandler(image.src)}
                alt="Image"
                src={image.src}
              />
            ))}
          </Slider>
        </>
      ) : null}
      {image && <ModalImage
        className={`ui-kit-uploader--image ${imageClassPrefix}`}
        small={isURL(image) ? image : URL.createObjectURL(image)}
        large={isURL(image) ? image : URL.createObjectURL(image)}
        alt="Image preview"
      />}
      {modalOpen && <ImagePreviewModal setOpenModal={setModalOpen} imageSrc={imageToPreview}/>}
      {onRemove ? (
        <RoundButton
          name="close"
          onClick={onRemove}
          className="ui-kit-uploader--close-button"
        />
      ) : null}
    </div>
  );
};
