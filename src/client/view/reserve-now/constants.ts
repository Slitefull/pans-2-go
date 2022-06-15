import { RentTypes } from "@/common/constants/rentTypes";
import wallClock from "@/ui-kit/images/wall-clock.svg";
import calendar from "@/ui-kit/images/calendar.svg";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import brooklynMap from "@/ui-kit/images/brooklyn-map.png";
import nycMap from "@/ui-kit/images/nyc-map.png";
import outNY from "@/ui-kit/images/out-of-nyc-map.png";
import { AllowedAreasValues } from "@/common/constants/allowedAreas";
import { IReservationMapElement } from "@/client/view/reserve-now/components/map-element/map-element.component";
import {
  AdditionalRequests,
  AdditionalRequestTitles,
  AdditionalRequestValues
} from "@/common/constants/additionalRequests";


interface RentType {
  type: RentTypes,
  price: number;
  description: string;
  isSelected: boolean;
  image: string;
}

interface AdditionalRequest {
  title: AdditionalRequestTitles;
  value: AdditionalRequestValues;
  price: number;
  isChecked: boolean;
}

export const reservationRentTypes = (reservationService: ReservationService): Array<RentType> => [
  {
    type: RentTypes.HOURLY_PARTIAL,
    price: 20,
    description: 'Perfect for dates',
    isSelected: reservationService.rentTypePick === RentTypes.HOURLY_PARTIAL,
    image: wallClock,
  },
  {
    type: RentTypes.DAILY_WEEKLY,
    price: 75,
    description: 'Perfect for daily routine',
    isSelected: reservationService.rentTypePick === RentTypes.DAILY_WEEKLY,
    image: calendar,
  },
]

export const reservationMapElements = (reservationService: ReservationService): Array<IReservationMapElement> => [
  {
    image: brooklynMap,
    description: 'Brooklyn',
    value: AllowedAreasValues.Brooklyn,
    isActive: reservationService.area === AllowedAreasValues.Brooklyn,
  },
  {
    image: nycMap,
    description: 'NYC',
    value: AllowedAreasValues.NY,
    isActive: reservationService.area === AllowedAreasValues.NY,
  },
  {
    image: outNY,
    description: 'Out of NYC',
    value: AllowedAreasValues.outNY,
    isActive: reservationService.area === AllowedAreasValues.outNY,
    withRegionSelector: true,
  },
]

export const reservationAdditionalRequests = (reservationService: ReservationService): Array<AdditionalRequest> => [
  {
    title: AdditionalRequests[AdditionalRequestValues.ADDITIONAL_DRIVER].title,
    value: AdditionalRequests[AdditionalRequestValues.ADDITIONAL_DRIVER].value,
    isChecked: reservationService.additionalRequestsForNewReservation.includes(AdditionalRequests[AdditionalRequestValues.ADDITIONAL_DRIVER].value),
    price: 5,
  },
  {
    title: AdditionalRequests[AdditionalRequestValues.ADDITIONAL_CAR_SEAT].title,
    value: AdditionalRequests[AdditionalRequestValues.ADDITIONAL_CAR_SEAT].value,
    isChecked: reservationService.additionalRequestsForNewReservation.includes(AdditionalRequests[AdditionalRequestValues.ADDITIONAL_CAR_SEAT].value),
    price: 10,
  },
  {
    title: AdditionalRequests[AdditionalRequestValues.GPS].title,
    value: AdditionalRequests[AdditionalRequestValues.GPS].value,
    isChecked: reservationService.additionalRequestsForNewReservation.includes(AdditionalRequests[AdditionalRequestValues.GPS].value),
    price: 10,
  },
]
