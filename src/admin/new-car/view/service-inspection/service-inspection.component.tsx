import React, { FC } from 'react';
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { useTranslation } from "react-i18next";
import { Control, FieldErrors } from "react-hook-form";
import { observer } from "mobx-react";
import { FormsCustomSelect } from "@/ui-kit/components/forms/select/custom-select.component";
import { carStatusesDropdownValues } from "@/common/constants/options";
import {
  FilesDropzoneUploaderMinimized
} from "@/ui-kit/components/files-dropzone-uploader/files-dropzone-uploader.component";
import serviceInspectionIcon from '../../../../ui-kit/icons/edit-page/service-inspection.svg';


interface ServiceInspectionProps {
  control: Control<any>;
  errors: FieldErrors;
  isDisabledField: boolean;
  onDeleteServiceInspectionImageHandler: () => void;
  onSetServiceInspectionImageHandler: (acceptedFiles: Array<File>) => void;
}

const MAX_FILE_SIZE = 1024 * 1024 * 10;
const MAX_FILES_COUNT = 1;

const ServiceInspection: FC<ServiceInspectionProps> = observer((
  {
    control,
    errors,
    isDisabledField,
    onDeleteServiceInspectionImageHandler,
    onSetServiceInspectionImageHandler,
  }
): JSX.Element => {
  const {t} = useTranslation();

  return (
    <section className="service-inspection">
      <p className="section-title">
         <img
            className="title-icon"
            src={serviceInspectionIcon}
            alt="Service Inspection"
         />
        {t("admin.serviceInspection")}
      </p>
      <div className="container-first">
        <FormsTextInput
          name="serviceInspection.lastInspectionDate"
          className="last-inspection-date"
          control={control}
          label={t("admin.lastInspectionDate")}
          error={errors.serviceInspection?.lastInspectionDate?.message}
          placeholder={t("admin.lastInspectionDate")}
          disabled={isDisabledField}
          type="date"
        />
        <FormsTextInput
          name="serviceInspection.expDate"
          className="exp-date"
          control={control}
          label={t("admin.expDate")}
          error={errors.serviceInspection?.expDate?.message}
          placeholder={t("admin.expDate")}
          disabled={isDisabledField}
          type="date"
        />
      </div>
      <FilesDropzoneUploaderMinimized
        label={t("admin.uploadScanCopyFile")}
        onDeleteHandler={onDeleteServiceInspectionImageHandler}
        isDisabled={isDisabledField}
        options={{
          onDrop: onSetServiceInspectionImageHandler,
          maxSize: MAX_FILE_SIZE,
          maxFiles: MAX_FILES_COUNT,
          accept: 'image/jpeg, image/png, image/jpg',
        }}
      />
    </section>
  );
});

export default ServiceInspection;
