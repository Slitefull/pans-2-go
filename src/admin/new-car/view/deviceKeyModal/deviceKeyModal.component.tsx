import React, { FC } from 'react';
import { FormsMaskedInput } from "@/ui-kit/components/forms/masked-input/forms-masked-input.component";
import { Button } from "@/ui-kit/components/button/button.component";
import CustomModal from "@/ui-kit/components/modal/custom-modal.component";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { NewCarService } from "@/admin/new-car/domain/new-car.service";
import { injector } from "@/common/injector/Injector";
import { NEW_CAR_SERVICE } from "@/common/injector/constants";
import { Control, FieldErrors } from "react-hook-form";


interface DeviceKeyModalProps {
  control: Control<any>;
  errors: FieldErrors;
  watchDeviceKey: string;
  onCancelHandler: () => void;
  onSetDeviceKeyHandler: () => void;
  deviceKeyMask: string;
}

const DeviceKeyModal: FC<DeviceKeyModalProps> = observer((
  {
    control,
    watchDeviceKey,
    errors,
    onCancelHandler,
    onSetDeviceKeyHandler,
    deviceKeyMask,
  }
) => {
  const {t} = useTranslation();
  const newCarService: NewCarService = injector.get(NEW_CAR_SERVICE);

  return (
    <CustomModal
      isOpen={newCarService.isOpenAddDeviceKeyModal}
      body={
        <>
          <p className="modal-title">
            {t("admin.addDeviceKey")}
          </p>
          <FormsMaskedInput
            name="deviceKey"
            control={control}
            error={errors.deviceKey?.message}
            mask={deviceKeyMask}
          />
        </>
      }
      footer={
        <div className="buttons-wrapper">
          <Button
            type="button"
            color="secondary"
            onClick={onCancelHandler}
            style={{margin: "0 10px 0 0"}}
          >
            {t("admin.cancel").toUpperCase()}
          </Button>
          <Button
            type="button"
            color="primary"
            disabled={!watchDeviceKey}
            onClick={onSetDeviceKeyHandler}
          >
            {t("admin.confirm").toUpperCase()}
          </Button>
        </div>
      }
    />
  );
});

export default DeviceKeyModal;
