import { BodyTypes } from "@/common/constants/bodyTypes";
import { UserRoles } from "@/common/constants/roles";
import { Media } from "@/common/media/api/media.repo";
import { ReservationStatuses } from "@/common/constants/reservationStatuses";
import { RentTypes } from "@/common/constants/rentTypes";


export interface ChangeReservationStatusPayload {
  id: string,
  status: ReservationStatuses,
}

export interface GetReservationsWithFiltersPayload {
  pickUpDate?: string,
  pickUpTime?: string,
  carType?: string,
  page?: number,
  perPage?: number,
  sortBy?: string,
  customerName?: string,
  desc?: string,
  status?: string,
}

export interface GetReservationsWithFiltersDTO {
  data: {
    rows: Array<Reservation>,
    count: number,
    page: number,
    pages: number,
  }
}

export interface GetReservationsStatusesCountDTO {
  data: ReservationStatusesCount;
}

export interface Reservation {
  id: string;
  number: number;
  rentTypePick: RentTypes;
  distance: number;
  comment: string;
  carType: BodyTypes,
  user: User;
  pickupDateTime: Date | string;
  dropOffDateTime: Date | string;
  additionalRequest: Array<string>;
  price: number;
  totalPrice: number;
  paymentStatus: string;
}

interface User {
  id: string,
  email: string,
  isActive: boolean,
  role: UserRoles,
  firstName: string,
  lastName: string,
  mobilePhone: string,
  whatsAppPhone: string,
  emergencyPhone: string,
  prefix: string,
  address: string,
  state: string,
  zip: string,
  notificationType: string,
  media: Media,
}

export interface ReservationStatusesCount {
  new: number,
  approved: number,
  rejected: number,
  active: number,
  upcoming: number,
  past: number,
  cancelled: number,
}
