import { RentTypes } from "@/common/constants/rentTypes";
import { AdditionalRequestValues } from "@/common/constants/additionalRequests";
import { BodyTypes } from "@/common/constants/bodyTypes";
import { AllowedAreasValues } from "@/common/constants/allowedAreas";
import { HourlyPackage } from "@/common/reservation/api/reservation.repo";


export interface ReservationPrice {
  fullDay: number,
  totalPrice: number
}

export interface BaseNewReservationByAdminService {
  selectedRentType: RentTypes;
  selectedCar: string | null;
  selectedCarType: BodyTypes | null;
  selectedCarCategory: string | null;
  pickUp: Date | null;
  dropOff: Date | null;
  selectedCustomer: string | null;
  area: AllowedAreasValues;
  place: string;
  selectedAdditionalRequests: Array<AdditionalRequestValues>;
  packages: Array<HourlyPackage>;
  selectedPackage: number | null;
  isTouchedDate: boolean;
  dropOffWithPackage: Date | null;
  price: ReservationPrice | null;

  getHourlyPackagesByCategory(categoryId: string): Promise<void>;

  getHourlyAllPackages(): Promise<void>;

  getSummaryPrice(): Promise<void>;

  reset(): void;

  resetRentType(): void;

  resetSummary(): void;
}
