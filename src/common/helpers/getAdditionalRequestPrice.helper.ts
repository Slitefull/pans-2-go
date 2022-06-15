import { AdditionalRequestValues } from "@/common/constants/additionalRequests";


export const getAdditionalRequestPrice = (additionalRequest: AdditionalRequestValues, defaultPrice: number = 10): number => {
  switch (additionalRequest) {
    case AdditionalRequestValues.ADDITIONAL_CAR_SEAT:
      return 10;
    case AdditionalRequestValues.ADDITIONAL_DRIVER:
      return 5;
    case AdditionalRequestValues.GPS:
      return 10;
    default:
      return defaultPrice;
  }
}
