import React, { FC } from 'react';
import { observer } from "mobx-react";
import { FormsCustomDatepicker } from "@/ui-kit/components/forms/datepicker/custom-datepicker.component";
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  FilesDropzoneUploader,
  ImagePreview
} from "@/ui-kit/components/files-dropzone-uploader/files-dropzone-uploader.component";

import './fourth-step.styles.scss';


interface FourthStepProps {
  control: Control<any>;
  errors: FieldErrors;
  removeDriverLicencesHandler: () => void;
  backgroundDriverLicenceHandler: (acceptedFiles: Array<File>) => void;
  newDriverLicenceImages: Array<File | string>;
}

const MAX_DRIVER_LICENCE_FILES = 2;
const MAX_FILE_SIZE = 1024 * 1024 * 10;
const ACCEPTED_FILES_FORMATS = "image/jpeg, image/png, image/jpg";

const FourthStep: FC<FourthStepProps> = observer((
  {
    control,
    errors,
    removeDriverLicencesHandler,
    backgroundDriverLicenceHandler,
    newDriverLicenceImages
  }
): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="step-wrapper fourth-step">
      <h3 className="step-title">
        {t("auth.addYourDriverLicence")}
      </h3>
      <div className="licence-uploader">
        {newDriverLicenceImages.length !== 0 && (
          <ImagePreview
            images={newDriverLicenceImages}
            onRemove={removeDriverLicencesHandler}
          />
        )}
        {newDriverLicenceImages.length < 2 && (
          <FilesDropzoneUploader
            options={{
              onDrop: backgroundDriverLicenceHandler,
              maxSize: MAX_FILE_SIZE,
              maxFiles: MAX_DRIVER_LICENCE_FILES,
              accept: ACCEPTED_FILES_FORMATS,
            }}
            isMini={newDriverLicenceImages.length === 1}
            classPrefix="licence-uploader__input"
            placeholder="Drag and drop front and back side of your driving license or upload"
          />
        )}
      </div>
      <div className="dob">
        <FormsCustomDatepicker
          name="driverLicence.DOB"
          control={control}
          label={t("client.dob").toUpperCase()}
          error={errors.driverLicence?.DOB?.message}
        />
      </div>
      <div className="issue-date">
        <FormsCustomDatepicker
          name="driverLicence.issueDate"
          control={control}
          label={t("client.issueDate")}
          error={errors.driverLicence?.issueDate?.message}
        />
      </div>
      <div className="exp-date">
        <FormsCustomDatepicker
          name="driverLicence.expDate"
          control={control}
          label={t("client.expDate")}
          error={errors.driverLicence?.expDate?.message}
        />
      </div>
      <div className="licence-number">
        <FormsTextInput
          name="driverLicence.licenceNumber"
          control={control}
          label={t("client.licenceNumber")}
          wrapperPrefix="first-name"
          placeholder={t("client.licenceNumber")}
          error={errors.driverLicence?.licenceNumber?.message}
          type="text"
        />
      </div>
    </div>
  );
});

export default FourthStep;
