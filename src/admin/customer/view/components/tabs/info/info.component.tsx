import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import PersonalDetailsForm from '../../personal-details/personal-details.component';
import DriverLicence from "@/admin/customer/view/components/driver-licence/driver-licence.component";
import { Control, FieldErrors } from "react-hook-form";
import { CustomerService } from "@/admin/customer/domain/customer.service";
import { injector } from "@/common/injector/Injector";
import { CUSTOMER_SERVICE } from "@/common/injector/constants";
import { CustomerTabs } from "@/admin/customer/constants";

import './info.styles.scss';


interface InfoTabProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  newDriverLicenceImages: Array<File>;
  setNewDriverLicenceImages: Dispatch<SetStateAction<Array<File>>>;
}

const InfoTab: FC<InfoTabProps> = (
  {
    control,
    errors,
    newDriverLicenceImages,
    setNewDriverLicenceImages
  }
): JSX.Element => {
  const customerService: CustomerService = injector.get(CUSTOMER_SERVICE);

  useEffect(() => {
    customerService.tab = CustomerTabs.INFO;
  }, [customerService.tab]);

  return (
    <div className="info-form">
      <PersonalDetailsForm
        errors={errors}
        control={control}
      />
      <DriverLicence
        control={control}
        errors={errors}
        newDriverLicenceImages={newDriverLicenceImages}
        setNewDriverLicenceImages={setNewDriverLicenceImages}
      />
    </div>
  );
};

export default InfoTab;
