import { NewReservationByAdminService } from "@/admin/create-reservation/domain/create-reservation.service";
import {
  AdditionalRequests,
  AdditionalRequestTitles,
  AdditionalRequestValues
} from "@/common/constants/additionalRequests";


interface AdditionalRequest {
  title: AdditionalRequestTitles;
  value: AdditionalRequestValues;
  price: number;
  isChecked: boolean;
}

export const newReservationByAdminAdditionalRequests = (addReservationByAdminService: NewReservationByAdminService): Array<AdditionalRequest> => [
  {
    title: AdditionalRequests[AdditionalRequestValues.ADDITIONAL_DRIVER].title,
    value: AdditionalRequests[AdditionalRequestValues.ADDITIONAL_DRIVER].value,
    isChecked: addReservationByAdminService.selectedAdditionalRequests.includes(AdditionalRequests[AdditionalRequestValues.ADDITIONAL_DRIVER].value),
    price: 5,
  },
  {
    title: AdditionalRequests[AdditionalRequestValues.ADDITIONAL_CAR_SEAT].title,
    value: AdditionalRequests[AdditionalRequestValues.ADDITIONAL_CAR_SEAT].value,
    isChecked: addReservationByAdminService.selectedAdditionalRequests.includes(AdditionalRequests[AdditionalRequestValues.ADDITIONAL_CAR_SEAT].value),
    price: 10,
  },
  {
    title: AdditionalRequests[AdditionalRequestValues.GPS].title,
    value: AdditionalRequests[AdditionalRequestValues.GPS].value,
    isChecked: addReservationByAdminService.selectedAdditionalRequests.includes(AdditionalRequests[AdditionalRequestValues.GPS].value),
    price: 10,
  },
]
