export enum AdditionalRequestTitles {
  ADDITIONAL_DRIVER = "Additional driver",
  ADDITIONAL_CAR_SEAT = "Additional car seat",
  GPS = "GPS",
}

export enum AdditionalRequestValues {
  ADDITIONAL_DRIVER = "AdditionalDriver",
  ADDITIONAL_CAR_SEAT = "AdditionalSeat",
  GPS = "GPS",
}

interface AdditionalRequestsValue {
  title: AdditionalRequestTitles,
  value: AdditionalRequestValues;
}

export const AdditionalRequests: Record<AdditionalRequestValues, AdditionalRequestsValue> = {
  [AdditionalRequestValues.ADDITIONAL_DRIVER]: {
    title: AdditionalRequestTitles.ADDITIONAL_DRIVER,
    value: AdditionalRequestValues.ADDITIONAL_DRIVER,
  },
  [AdditionalRequestValues.ADDITIONAL_CAR_SEAT]: {
    title: AdditionalRequestTitles.ADDITIONAL_CAR_SEAT,
    value: AdditionalRequestValues.ADDITIONAL_CAR_SEAT,
  },
  [AdditionalRequestValues.GPS]: {
    title: AdditionalRequestTitles.GPS,
    value: AdditionalRequestValues.GPS,
  },
};
