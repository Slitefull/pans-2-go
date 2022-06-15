import { AdditionalRequestTitles, AdditionalRequestValues } from "@/common/constants/additionalRequests";


export const parseAdditionalRequestTitle = (additionalRequest: AdditionalRequestValues): string => {
  switch (additionalRequest) {
    case AdditionalRequestValues.GPS:
      return AdditionalRequestTitles.GPS;
    case AdditionalRequestValues.ADDITIONAL_DRIVER:
      return AdditionalRequestTitles.ADDITIONAL_DRIVER;
    case AdditionalRequestValues.ADDITIONAL_CAR_SEAT:
      return AdditionalRequestTitles.ADDITIONAL_CAR_SEAT;

    default:
      return additionalRequest;
  }
}
