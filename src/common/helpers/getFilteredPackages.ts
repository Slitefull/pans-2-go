import { HourlyPackage } from "@/common/reservation/api/reservation.repo";
import { AllowedAreasValues } from "@/common/constants/allowedAreas";


export const getFilteredPackages = (packages: Array<HourlyPackage>, area: AllowedAreasValues) => {
  if (area === AllowedAreasValues.NY || area === AllowedAreasValues.outNY) {
    return packages.filter((el) => el.hours !== 1.5)
  }
  return packages;
}
