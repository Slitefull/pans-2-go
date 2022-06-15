import React, { FC, useCallback, useState } from 'react';
import { observer } from "mobx-react";
import { MY_RESERVATIONS_PAGE } from "@/common/constants/routes";
import { History } from "history";
import { injector } from "@/common/injector/Injector";
import { HISTORY, LOCK_CAR_SERVICE } from "@/common/injector/constants";
import { Button } from "@/ui-kit/components/button/button.component";
import { LockCarService } from "@/common/lock-car/domain/lock-car.service";
import { Checkbox } from "@/ui-kit/components/checkbox/checkbox.component";
import { onCreateImageHTTP } from "@/common/helpers/onCreateMediaHTTP.helper";
import { useTranslation } from "react-i18next";
import {
  FilesDropzoneUploader,
  ImagePreview
} from '@/ui-kit/components/files-dropzone-uploader/files-dropzone-uploader.component';

import "./first-step.styles.scss";


const MAX_FILE_SIZE = 1024 * 1024 * 10;
const ACCEPTED_FILES_FORMATS = 'image/jpeg, image/png, image/jpg';
const MAX_FILES_COUNT = 1;


const LockCarFirstStep: FC = observer((): JSX.Element => {
  const { t } = useTranslation();
  const history: History = injector.get(HISTORY)
  const lockCarService: LockCarService = injector.get(LOCK_CAR_SERVICE);

  const [lockCarImage, setLockCarImage] = useState<File | string>();

  const isCheckedConfirm = lockCarService.isConfirm;
  const tripImageId = lockCarService.endTripImages[0]?.id;

  const onSetIsConfirmToggle = useCallback(() => {
    lockCarService.isConfirm = !lockCarService.isConfirm;
  }, [lockCarService])

  const onSetLockCarImageHandler = useCallback((acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];
    onCreateImageHTTP({
      file,
      onCreateMediaHandler: lockCarService.createEndTripTripImage.bind(lockCarService),
    })
    setLockCarImage(acceptedFiles[0]);
  }, [lockCarService]);

  const onRemoveLockCarImage = useCallback(() => {
    setLockCarImage(undefined);
    lockCarService.endTripImages = [];
  }, [])

  const onCancelHandler = useCallback(() => {
    lockCarService.reset();
    history.push(MY_RESERVATIONS_PAGE);
  }, [history, lockCarService])

  const onSubmitHandler = useCallback(() => {
    lockCarService.uploadEndTripImageId({
      reservationId: lockCarService.selectedReservation!.id,
      carId: lockCarService.selectedReservation!.car.id,
    })
    lockCarService.currentStep = 2;
  }, [lockCarService, tripImageId])

  return (
    <div className="first-step">
      <div className="first-step__body">
        <div className="first-step__body__section">
          <p className="section-title">
            1. {`${t("client.uploadTheImageOfTheCarDashboard")}`}*
          </p>
          {lockCarImage ? (
            <ImagePreview
              imageClassPrefix="lock-car-image-preview"
              image={lockCarImage}
              onRemove={onRemoveLockCarImage}
            />
          ) : (
            <FilesDropzoneUploader
              options={{
                onDrop: onSetLockCarImageHandler,
                maxSize: MAX_FILE_SIZE,
                maxFiles: MAX_FILES_COUNT,
                accept: ACCEPTED_FILES_FORMATS,
              }}
            />
          )}
        </div>
        <div className="first-step__body__section">
          <p className="section-title">
            2. {t("client.confirm")}
          </p>
          <Checkbox
            label={t("client.noDamagesAndAccidentsHappenDuringTheTrip")}
            isChecked={isCheckedConfirm}
            setIsChecked={onSetIsConfirmToggle}
          />
        </div>
      </div>
      <div className="first-step__buttons">
        <Button
          color="secondary"
          onClick={onCancelHandler}
        >
          {t("client.cancel")}
        </Button>
        <Button
          color="primary"
          onClick={onSubmitHandler}
          disabled={!tripImageId}
        >
          {t("client.submit")}
        </Button>
      </div>
    </div>
  );
});

export default LockCarFirstStep;
