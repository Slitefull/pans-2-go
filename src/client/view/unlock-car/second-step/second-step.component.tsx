import React, { FC, useCallback, useState } from 'react';
import { observer } from "mobx-react";
import { MY_RESERVATIONS_PAGE } from "@/common/constants/routes";
import { History } from "history";
import { injector } from "@/common/injector/Injector";
import { HISTORY, LOCK_CAR_SERVICE } from "@/common/injector/constants";
import { useTranslation } from "react-i18next";
import { LockCarService } from "@/common/lock-car/domain/lock-car.service";
import { Button } from "@/ui-kit/components/button/button.component";
import { onCreateImageHTTP } from "@/common/helpers/onCreateMediaHTTP.helper";
import {
  FilesDropzoneUploader,
  ImagePreview
} from "@/ui-kit/components/files-dropzone-uploader/files-dropzone-uploader.component";

import "./second-step.styles.scss";


const MAX_FILE_SIZE = 1024 * 1024 * 10;
const ACCEPTED_FILES_FORMATS = 'image/jpeg, image/png, image/jpg';
const MAX_FILES_COUNT = 1;

const UnlockCarSecondStep: FC = observer((): JSX.Element => {
  const { t } = useTranslation();
  const history: History = injector.get(HISTORY)
  const lockCarService: LockCarService = injector.get(LOCK_CAR_SERVICE);

  const [unlockCarImage, setUnlockCarImage] = useState<File | string>();

  const onSetUnlockCarImageHandler = useCallback((acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];
    onCreateImageHTTP({
      file,
      onCreateMediaHandler: lockCarService.createStartTripImage.bind(lockCarService),
    })
    setUnlockCarImage(acceptedFiles[0]);
  }, [lockCarService]);

  const onRemoveLockCarImage = useCallback(() => {
    lockCarService.startTripImages = [];
    setUnlockCarImage(undefined);
  }, [])

  const onSubmitHandler = useCallback(() => {
    lockCarService.onSubmitUnlockCar();
  }, [lockCarService])

  const onCancelHandler = useCallback(() => {
    lockCarService.reset();
    history.push(MY_RESERVATIONS_PAGE);
  }, [history, lockCarService])

  return (
    <div className="second-step">
      <p className="content">
        <p className="text">
          {t("client.carIsUnlockedTripInProgress")}
        </p>
        {unlockCarImage ? (
          <ImagePreview
            image={unlockCarImage}
            onRemove={onRemoveLockCarImage}
          />
        ) : (
          <FilesDropzoneUploader
            label={`${t("client.uploadTheImageOfTheCarDashboard")}*`}
            options={{
              onDrop: onSetUnlockCarImageHandler,
              maxSize: MAX_FILE_SIZE,
              maxFiles: MAX_FILES_COUNT,
              accept: ACCEPTED_FILES_FORMATS,
            }}
          />
        )}
      </p>
      <div className="second-step__buttons">
        <Button
          color="secondary"
          onClick={onCancelHandler}
        >
          {t("client.cancel")}
        </Button>
        <Button
          color="primary"
          disabled={!lockCarService.startTripImages.length}
          onClick={onSubmitHandler}
        >
          {t("client.submit")}
        </Button>
      </div>
    </div>
  );
});

export default UnlockCarSecondStep;
