import React, { FC, useCallback } from "react";
import { observer } from "mobx-react";
import { injector } from "@/common/injector/Injector";
import { EDIT_CAR_SERVICE, } from "@/common/injector/constants";
import {
  FilesDropzoneUploader,
  ImagePreview,
} from "@/ui-kit/components/files-dropzone-uploader/files-dropzone-uploader.component";
import { onCreateImageHTTP } from "@/common/helpers/onCreateMediaHTTP.helper";
import { useTranslation } from "react-i18next";
import { EditCarService } from "@/admin/edit-car/domain/edit-car.service";
import { createImageUrl } from "@/common/helpers/createImageUrl.helper";

import "./car-card.styles.scss";


const MAX_FILE_SIZE = 1024 * 1024 * 10;
const MAX_FILES_COUNT = 1;

const CarCard: FC = observer((): JSX.Element => {
  const { t } = useTranslation();
  const editCarService: EditCarService = injector.get(EDIT_CAR_SERVICE);

  let carPhoto;

  if (editCarService.carPhotoMedia.length) {
    carPhoto = createImageUrl(editCarService.carPhotoMedia[0]?.imageUrl);
  } else {
    carPhoto = editCarService.selectedCar?.imageUrl;
  }

  const removeBackgroundImage = useCallback(() => editCarService.removeCarPhotoMedia(), [editCarService])

  const backgroundImageHandler = (acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];
    onCreateImageHTTP({
      file,
      onCreateMediaHandler: editCarService.createCarPhotoMedia.bind(editCarService),
    })
  };

  return (
    <div className="car-card">
      <div className="car-card__header">
        <p className="text">
          {t("admin.carsInfo")}
        </p>
        <div className="car-card__status">
          {editCarService.selectedCar?.category?.title}
        </div>
      </div>
      {carPhoto ? (
        <ImagePreview
          image={carPhoto}
          onRemove={removeBackgroundImage}
        />
      ) : (
        <FilesDropzoneUploader
          options={{
            onDrop: backgroundImageHandler,
            maxSize: MAX_FILE_SIZE,
            maxFiles: MAX_FILES_COUNT,
            accept: 'image/jpeg, image/png, image/jpg',
          }}
          style={{ margin: 'auto', width: '100%' }}
        />
      )}
      <p className="car-card__device-key">
        {t("admin.deviceKey")}
      </p>

      <p className="car-card__text">
        {editCarService.selectedCar?.deviceKey}
      </p>

      <p className="car-card__text">
        { t("admin.title") }: {editCarService.selectedCar?.title}
      </p>

      <p className="car-card__text">
        {/* @ts-ignore */}
        { t("admin.year") }: {new Date(editCarService.selectedCar?.year).getFullYear()}
      </p>

      <p className="car-card__text">
        { t("admin.model") }: {editCarService.selectedCar?.model}
      </p>

      <p className="car-card__text">
        { t("admin.bodyType") }: {editCarService.selectedCar?.category?.title}
      </p>

      <p className="car-card__text">
       { t("admin.vin") }: {editCarService.selectedCar?.VIN}
      </p>

      <p className="car-card__text">
        {`${t("admin.doors")}: ${editCarService.selectedCar?.doors}`}
      </p>

      <p className="car-card__text">
        {`${t("admin.color")}: ${editCarService.selectedCar?.color}`}
      </p>
    </div>
  );
});

export default CarCard;
