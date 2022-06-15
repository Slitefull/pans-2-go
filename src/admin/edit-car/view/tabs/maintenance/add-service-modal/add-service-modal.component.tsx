import React, { FC, useCallback, useEffect } from 'react';
import { observer } from "mobx-react";
import CustomModal from "@/ui-kit/components/modal/custom-modal.component";
import { FormsCustomDatepicker } from "@/ui-kit/components/forms/datepicker/custom-datepicker.component";
import { FormsCustomSelect } from "@/ui-kit/components/forms/select/custom-select.component";
import { FormsCustomTextarea } from "@/ui-kit/components/forms/textarea/custom-textarea.component";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { limitedString, requiredDate, requiredNumber } from "@/ui-kit/helpers/validators";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { Button } from "@/ui-kit/components/button/button.component";
import { EditCarService } from "@/admin/edit-car/domain/edit-car.service";
import { injector } from "@/common/injector/Injector";
import { EDIT_CAR_SERVICE } from "@/common/injector/constants";
import { CreateMaintenancePayload } from "@/admin/edit-car/api/dto/edit-car.dto";
import { FilteredTypesOfServiceSelectValues } from "@/common/constants/typesOfService";
import { onCreateImageHTTP } from "@/common/helpers/onCreateMediaHTTP.helper";
import {
  FilesDropzoneUploaderMinimized
} from "@/ui-kit/components/files-dropzone-uploader/files-dropzone-uploader.component";
import RoundLoader from "@/ui-kit/components/loaders/round/round-loader.component";
import { Media } from "@/common/media/api/media.repo";

import './add-service-modal.styles.scss';


const MAX_FILE_SIZE = 1024 * 1024 * 10;
const MAX_FILES = 1;
const ACCEPT_FORMATS = 'image/jpeg, image/png, image/jpg';

type CreateMaintenanceValues = Omit<CreateMaintenancePayload, 'mediaId' | 'carId'>
type EditMaintenanceValues = Omit<CreateMaintenancePayload, 'carId'>

const AddServiceModal: FC = observer((): JSX.Element => {
  const { t } = useTranslation();
  const editCarService: EditCarService = injector.get(EDIT_CAR_SERVICE);

  const validationSchema = yup.object().shape({
    odometer: requiredNumber(t, { maxLength: 500, required: true }),
    comment: limitedString(t, { maxLength: 500 }, false),
    date: requiredDate('DOB', t),
  })

  const defaultValues = {
    typeOfService: editCarService.selectedMaintenance?.typeOfService ?? FilteredTypesOfServiceSelectValues[0].value,
    date: editCarService.selectedMaintenance ? new Date(editCarService.selectedMaintenance.date) : undefined,
    comment: editCarService.selectedMaintenance?.comment ?? undefined,
    odometer: editCarService.selectedMaintenance?.odometer ?? undefined,
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateMaintenanceValues>({
    defaultValues,
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const onSetImageHandler = useCallback((acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];
    onCreateImageHTTP({
      file,
      onCreateMediaHandler: editCarService.createMaintenanceMedia.bind(editCarService),
    })
  }, [editCarService])

  const onDeleteImageHandler = useCallback(() => {
    editCarService.removeMaintenanceMedia();
  }, [])

  const onCreateMaintenanceHandler = useCallback((values: CreateMaintenanceValues) => {
    editCarService.createMaintenance({
      ...values,
      carId: editCarService.selectedCar!.id,
      mediaId: editCarService.maintenanceMedia[0] ? editCarService.maintenanceMedia[0].id : undefined,
    })

    editCarService.maintenanceMedia[0] = {} as Media;
  }, [])

  const onEditMaintenanceHandler = useCallback((maintenanceId: string, values: CreateMaintenanceValues | EditMaintenanceValues) => {
    editCarService.editMaintenanceElementById(maintenanceId, {
      ...values,
      carId: editCarService.selectedCar!.id,
      mediaId: editCarService.isMaintenanceMediaDeleted
        ? null
        : editCarService.maintenanceMedia[0]
          ? editCarService.maintenanceMedia[0].id
          : undefined
    });
  }, [])

  const onCancelHandler = useCallback(() => {
    editCarService.isOpenAddServiceModal = false;
    if (editCarService.selectedMaintenanceId) {
      editCarService.resetEditMaintenance();
    }
  }, [editCarService])


  useEffect(() => {
    reset(defaultValues);
    if (editCarService.selectedMaintenanceId && !editCarService.selectedMaintenance) {
      editCarService.getMaintenanceElementById(editCarService.selectedMaintenanceId);
    }
  }, [editCarService.selectedMaintenanceId, editCarService.selectedMaintenance])

  if (editCarService.selectedMaintenanceId && !editCarService.selectedMaintenance) return <RoundLoader/>

  return (
    <CustomModal
      header={
        <p className="add-new-service__title">
          Add Service
        </p>
      }
      body={
        <form>
          <div className="add-new-service">
            <div className="type-of-service">
              <FormsCustomSelect
                key="addService.typeOfService"
                name="typeOfService"
                label="Type of service"
                className="type-service"
                options={FilteredTypesOfServiceSelectValues}
                control={control}
              />
            </div>
            <div className="date">
              <FormsCustomDatepicker
                name="date"
                label="Date"
                classPrefix="date"
                control={control}
                error={errors.date?.message}
              />
            </div>
            <div className="odometer">
              <FormsTextInput
                name="odometer"
                control={control}
                label="Odometer, miles"
                placeholder="Odometer, miles"
                error={errors.odometer?.message}
              />
            </div>
            <div className="uploader">
              <FilesDropzoneUploaderMinimized
                label="Upload receipt"
                onDeleteHandler={onDeleteImageHandler}
                classPrefix="upload-photo"
                defaultFiles={editCarService.selectedMaintenance?.media ? [editCarService.selectedMaintenance.media] : undefined}
                options={{
                  onDrop: onSetImageHandler,
                  maxSize: MAX_FILE_SIZE,
                  maxFiles: MAX_FILES,
                  accept: ACCEPT_FORMATS,
                }}
              />
            </div>
            <div className="comment">
              <FormsCustomTextarea
                name="comment"
                label="Comment"
                classPrefix="comment"
                control={control}
                placeholder="Comment"
                error={errors.comment?.message}
              />
            </div>
          </div>
        </form>
      }
      footer={
        <div className="add-new-service__footer">
          <Button
            onClick={onCancelHandler}
          >
            CANCEL
          </Button>
          <Button
            type="submit"
            color="primary"
            onClick={handleSubmit((values: CreateMaintenanceValues) => editCarService.selectedMaintenance
              ? onEditMaintenanceHandler(editCarService.selectedMaintenanceId, values)
              : onCreateMaintenanceHandler(values)
            )}
          >
            CONFIRM
          </Button>
        </div>
      }
      isOpen={editCarService.isOpenAddServiceModal}
    />
  );
});

export default AddServiceModal;
