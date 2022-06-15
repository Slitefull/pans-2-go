import React, { FC } from 'react';
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { useTranslation } from "react-i18next";
import { Control, FieldErrors } from "react-hook-form";
import { observer } from "mobx-react";
import { FormsCustomSelect } from "@/ui-kit/components/forms/select/custom-select.component";
import { StateValues } from "@/common/constants/options";
import {
  FilesDropzoneUploaderMinimized
} from "@/ui-kit/components/files-dropzone-uploader/files-dropzone-uploader.component";
import registrationIcon from '../../../../ui-kit/icons/edit-page/registration.svg';


interface RegistrationProps {
  control: Control<any>;
  errors: FieldErrors;
  isDisabledField: boolean;
  onDeleteRegistrationImageHandler: () => void;
  onSetRegistrationImageHandler: (acceptedFiles: Array<File>) => void;
}

const MAX_FILE_SIZE = 1024 * 1024 * 10;
const MAX_FILES_COUNT = 1;

const Registration: FC<RegistrationProps> = observer((
  {
    control,
    errors,
    isDisabledField,
    onDeleteRegistrationImageHandler,
    onSetRegistrationImageHandler,
  }
): JSX.Element => {
  const {t} = useTranslation();

  return (
    <section className="registration">
      <p className="section-title">
        <img
          className="title-icon"
          src={registrationIcon}
          alt="Registration"
        />
        {t("admin.registration")}
      </p>
      <div className="container-first">
        <FormsCustomSelect
          name="registration.state"
          className="new-car-state"
          options={StateValues}
          control={control}
          label={t("admin.state")}
          isDisabled={isDisabledField}
          error={errors.registration?.state?.message}
        />
        <FormsTextInput
          name="registration.expDate"
          className="exp-date"
          control={control}
          label={t("admin.expDate")}
          error={errors.registration?.expDate?.message}
          placeholder={t("admin.expDate")}
          disabled={isDisabledField}
          type="date"
        />
      </div>
      <FilesDropzoneUploaderMinimized
        label={t("admin.uploadScanCopyFile")}
        onDeleteHandler={onDeleteRegistrationImageHandler}
        isDisabled={isDisabledField}
        options={{
          onDrop: onSetRegistrationImageHandler,
          maxSize: MAX_FILE_SIZE,
          maxFiles: MAX_FILES_COUNT,
          accept: 'image/jpeg, image/png, image/jpg',
        }}
      />
    </section>
  );
});

export default Registration;
