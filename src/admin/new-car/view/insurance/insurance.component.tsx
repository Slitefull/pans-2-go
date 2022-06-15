import React, { FC } from 'react';
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { useTranslation } from "react-i18next";
import { Control, FieldErrors } from "react-hook-form";
import { observer } from "mobx-react";
import { FormsCustomSelect } from "@/ui-kit/components/forms/select/custom-select.component";
import { CoverageTypesValues } from "@/common/constants/options";
import {
  FilesDropzoneUploaderMinimized
} from "@/ui-kit/components/files-dropzone-uploader/files-dropzone-uploader.component";
import insuranceIcon from '../../../../ui-kit/icons/edit-page/insurance.svg';


interface InsuranceProps {
  control: Control<any>;
  errors: FieldErrors;
  isDisabledField: boolean;
  onDeleteInsuranceImageHandler: () => void;
  onSetInsuranceImageHandler: (acceptedFiles: Array<File>) => void;
}

const MAX_FILE_SIZE = 1024 * 1024 * 10;
const MAX_FILES_COUNT = 1;

const Insurance: FC<InsuranceProps> = observer((
  {
    control,
    errors,
    isDisabledField,
    onDeleteInsuranceImageHandler,
    onSetInsuranceImageHandler,
  }
): JSX.Element => {
  const { t } = useTranslation();

  return (
    <section className="insurance">
      <p className="section-title">
        <img
          className="title-icon"
          src={insuranceIcon}
          alt="Insurance"
        />
        {t("admin.insurance")}
      </p>
      <div className="container-first">
        <FormsCustomSelect
          name="insurance.coverage"
          options={CoverageTypesValues}
          control={control}
          className="coverage"
          label={t("admin.coverage")}
          isDisabled={isDisabledField}
          error={errors.insurance?.coverage?.message}
        />
        <FormsTextInput
          name="insurance.policyNumbers"
          control={control}
          className="policy-numbers"
          label={t("admin.policyNumber")}
          placeholder={t("admin.policyNumber")}
          error={errors.insurance?.policyNumbers?.message}
          disabled={isDisabledField}
          type="text"
        />
        <FormsTextInput
          name="insurance.expDate"
          control={control}
          className="exp-date"
          label={t("admin.expDate")}
          error={errors.insurance?.expDate?.message}
          placeholder={t("admin.expDate")}
          disabled={isDisabledField}
          type="date"
        />
      </div>
      <FilesDropzoneUploaderMinimized
        label={t("admin.uploadScanCopyFile")}
        onDeleteHandler={onDeleteInsuranceImageHandler}
        isDisabled={isDisabledField}
        options={{
          onDrop: onSetInsuranceImageHandler,
          maxSize: MAX_FILE_SIZE,
          maxFiles: MAX_FILES_COUNT,
          accept: 'image/jpeg, image/png, image/jpg',
        }}
      />
    </section>
  );
});

export default Insurance;
