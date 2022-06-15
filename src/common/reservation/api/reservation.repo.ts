import { RentTypes } from "@/common/constants/rentTypes";
import { AllowedAreasValues } from "@/common/constants/allowedAreas";
import { BodyTypes } from "@/common/constants/bodyTypes";
import { PaymentStatusesTypes } from "@/common/constants/paymentStatuses";
import { PaymentTypes } from "@/common/constants/paymentTypes";
import { Reservation } from "@/admin/reservations/api/dto/reservations.dto";
import { ShortCarModel } from "@/common/car/api/dto/car.dto";


export interface GetReservationSummaryPrice {
  categoryId: string;
  rate: RentTypes;
  pickUpDate: Date;
  dropOffDate: Date;
  timeZone: number;
  additionals: Array<string>;
  area: AllowedAreasValues;
}

export interface CreateReservationValues {
  rentTypePick: RentTypes;
  carType: BodyTypes;
  pickupDateTime: Date;
  dropOffDateTime: Date;
  price: number;
  totalPrice: number;
  status: string;
  area?: string | null;
  state?: string | null;
  paymentStatus: PaymentStatusesTypes;
  paymentType: PaymentTypes;
  additionalRequest: Array<string>;
  userId?: string;
  carId?: string;
  timeZone: number;
}

export interface GetReservationSummaryPriceDTO {
  data: {
    fullDay: number;
    totalPrice: number;
  }
}

export interface ChangePaymentType {
  reservationId: string;
  paymentType: string;
}

export interface HourlyPackage {
  id: string;
  hours: number;
  price: number;
  gasIncluded: boolean;
}

export interface GetReservationHistoryByCarIdPayload {
  carId: string;
  limit: number;
  offset: number;
}

//TODO ADD ENUM FOR TYPE
export interface GetReservationHistoryByUserIdPayload {
  userId: string;
  limit: number;
  offset: number;
  type?: string;
}

export interface ReservationHistoryElementDTO extends Reservation {
  car: ShortCarModel;
}

export interface ReservationRepository {
  getSummaryPrice(data: GetReservationSummaryPrice): Promise<GetReservationSummaryPriceDTO>;

  getHourlyPackagesByCategory(categoryId: string): Promise<Array<HourlyPackage>>;

  getHourlyAllPackages(): Promise<Array<HourlyPackage>>;

  getReservationById(id: string): Promise<any>;

  createReservation(data: CreateReservationValues): Promise<any>;

  changePaymentType({ reservationId, paymentType }: ChangePaymentType): Promise<void>;

  changeStatus(id: string, status: string): Promise<void>;

  updateReservation(id: string, data: any): Promise<void>;

  getReservationHistoryByCarId(
    {
      carId,
      limit,
      offset
    }: GetReservationHistoryByCarIdPayload
  ): Promise<Array<ReservationHistoryElementDTO>>;

  getReservationHistoryByUserId(
    {
      userId,
      limit,
      offset,
      type,
    }: GetReservationHistoryByUserIdPayload
  ): Promise<Array<ReservationHistoryElementDTO>>;

  updateReservationDates(reservationId: string, pickUpDate: Date | string, dropOffDate: Date | string): Promise<void>;
}
