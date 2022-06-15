import { SessionUserDto } from "@/common/session-user/api/dto/session-user.dto";
import { ChangePaymentType, HourlyPackage } from "../api/reservation.repo";
import { RentTypes } from "@/common/constants/rentTypes";
import { Media } from "@/common/media/api/media.repo";
import { AllowedAreasValues } from "@/common/constants/allowedAreas";
import { BodyTypes } from "@/common/constants/bodyTypes";
import { AdditionalRequestValues } from "@/common/constants/additionalRequests";
import { ReservationStatuses } from "@/common/constants/reservationStatuses";
import { ReservationTypes } from "@/common/constants/reservationTypes";


export interface BaseReservationService {
  currentStep: number;
  rentTypePick: RentTypes | null;
  carType: string;
  pickUp: Date | null;
  dropOff: Date | null;
  dropOffWithPackage: Date | null;
  pickUpDate: string;
  pickUpTime: string;
  dropOffDate: string;
  dropOffTime: string;
  status: string;
  area: AllowedAreasValues | null;
  package: number | null;
  paymentStatus: string;
  paymentType: string;
  comment: string;
  distance: number;
  allAdditionalRequests: Array<{ name: string, label: string }>;
  selectedCarType: { id: string, label: string, price: number };
  selectedCar: string;
  totalPrice: { fullDay: number, totalPrice: number };
  startTripImage: Media;
  endTripImage: Media;
  carId: string;
  user: SessionUserDto;
  isDisabledFinishButton: boolean;
  carTypeTitle: BodyTypes | null;
  carTypePrice: number | null;
  additionalRequestsForNewReservation: Array<AdditionalRequestValues>;
  isTouchedDate: boolean;
  packages: Array<HourlyPackage> | null;

  reset(): void;

  createReservation(notificationType?: string): Promise<void>;

  changePaymentType({ reservationId, paymentType }: ChangePaymentType): Promise<void>;

  changeReservationStatus(id: string, status: ReservationStatuses): Promise<void>

  getHourlyPackagesByCategory(categoryId: string): Promise<void>;

  getHourlyAllPackages(): Promise<void>;

  updateReservationDates(reservationId: string, pickUpDate: Date | string, dropOffDate: Date | string, reservationNumber?: number): Promise<void>;
}
