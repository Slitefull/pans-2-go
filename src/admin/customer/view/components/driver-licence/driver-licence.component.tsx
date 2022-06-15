import React, { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { FormsCustomDatepicker } from "@/ui-kit/components/forms/datepicker/custom-datepicker.component";
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { useTranslation } from "react-i18next";
import { Control, FieldErrors } from "react-hook-form";
import { onCreateImageHTTP } from "@/common/helpers/onCreateMediaHTTP.helper";
import { CustomerService } from "@/admin/customer/domain/customer.service";
import { injector } from "@/common/injector/Injector";
import { CUSTOMER_SERVICE } from "@/common/injector/constants";
import {
  FilesDropzoneUploader,
  ImagePreview
} from "@/ui-kit/components/files-dropzone-uploader/files-dropzone-uploader.component";

import './driver-licence.styles.scss';


interface DriverLicenceProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  newDriverLicenceImages: Array<File>;
  setNewDriverLicenceImages: Dispatch<SetStateAction<Array<File>>>;
}

const MAX_FILE_SIZE = 1024 * 1024 * 10;
const MAX_DRIVER_LICENCE_FILES = 2;
const ACCEPTED_FILE_FORMATS = 'image/jpeg, image/png, image/jpg';

const DriverLicence: FC<DriverLicenceProps> = (
  {
    control,
    errors,
    newDriverLicenceImages,
    setNewDriverLicenceImages,
  }
): JSX.Element => {
  const { t } = useTranslation();
  const customerService: CustomerService = injector.get(CUSTOMER_SERVICE);

  const ownDriverLicencesMediaId = customerService.selectedCustomer!.driverLicence!.medias.map((media) => media.id);
  const ownDriverLicencesMediaUrls = customerService.selectedCustomer!.driverLicence!.medias.map((media) => `${process.env.REACT_APP_S3_MEDIA}/${media.imageUrl}`);

  const backgroundDriverLicenceHandler = (acceptedFiles: Array<File>) => {
    if (acceptedFiles.length === 2) {
      onCreateImageHTTP({
        files: acceptedFiles,
        onCreateMediaHandler: customerService.createDriverLicenceImage.bind(customerService),
      })
      setNewDriverLicenceImages(acceptedFiles);
      return;
    }

    if (acceptedFiles.length === 1) {
      const [file] = acceptedFiles;

      onCreateImageHTTP({
        file,
        onCreateMediaHandler: customerService.createDriverLicenceImage.bind(customerService),
      })
      setNewDriverLicenceImages([...newDriverLicenceImages, file]);
    }
  };

  const removeDriverLicencesHandler = useCallback(() => {
    customerService.deleteCustomerDriverLicence(ownDriverLicencesMediaId);
    setNewDriverLicenceImages([]);
  }, [customerService, ownDriverLicencesMediaId]);

  return (
    <div className="driver-licence">
      <h3 className="title">
        Driver Licence
      </h3>

      <div className="driver-licence-container">
        <div className="licence-uploader">
          {newDriverLicenceImages.length !== 0 && (
            <ImagePreview
              images={newDriverLicenceImages}
              onRemove={removeDriverLicencesHandler}
              classPrefix={newDriverLicenceImages.length < 2 ? "licences-preview" : undefined}
              imageClassPrefix={newDriverLicenceImages.length < 2 ? "licences-preview__image" : undefined}
            />
          )}
          {ownDriverLicencesMediaUrls.length !== 0 && (
            <ImagePreview
              links={ownDriverLicencesMediaUrls}
              onRemove={removeDriverLicencesHandler}
              classPrefix={ownDriverLicencesMediaUrls.length < 2 ? "licences-preview" : undefined}
              imageClassPrefix={ownDriverLicencesMediaUrls.length < 2 ? "licences-preview__image" : undefined}
            />
          )}
          {(!ownDriverLicencesMediaUrls.length && newDriverLicenceImages.length < 2) && (
            <FilesDropzoneUploader
              options={{
                onDrop: backgroundDriverLicenceHandler,
                maxSize: MAX_FILE_SIZE,
                maxFiles: MAX_DRIVER_LICENCE_FILES,
                accept: ACCEPTED_FILE_FORMATS,
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
            className="personal-details-form__input"
            label={t("client.licenceNumber")}
            wrapperPrefix="first-name"
            placeholder={t("client.licenceNumber")}
            error={errors.driverLicence?.licenceNumber?.message}
            useWrapper
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export default DriverLicence;
