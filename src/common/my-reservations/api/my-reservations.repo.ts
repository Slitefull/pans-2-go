import { BodyTypes } from "@/common/constants/bodyTypes";
import { UserRoles } from "@/common/constants/roles";
import { Media } from "@/common/media/api/media.repo";
import { FuelTypes } from "@/common/constants/fuelTypes";
import { CarStatusesTypes } from "@/common/constants/carStatuses";
import { GetMyReservationsByTypeDTO, GetMyReservationsByTypePayload } from "../dto/my-reservations.dto";


export interface MyReservation {
  id: string;
  rentTypePick: string;
  carType: BodyTypes;
  user: MyReservationUser;
  car: MyReservationCar;
  number: number;
  pickupDateTime: string;
  dropOffDateTime: string;
  additionalRequest: Array<string>;
  price: number;
  totalPrice: number;
  status: string;
  paymentStatus: string
}

export interface MyReservationUser {
  id: string;
  email: string;
  isActive: boolean;
  role: UserRoles;
  firstName: string;
  lastName: string;
  mobilePhone: string;
  whatsAppPhone: string;
  emergencyPhone: string;
  prefix: string;
  address: string;
  state: string;
  zip: string;
  notificationType: string;
  media: Media;
}

export interface MyReservationCar {
  id: string;
  imageUrl: null | string;
  title: string;
  VIN: string;
  plateNumber: string;
  deviceKey: string;
  isFirstUnlock: boolean;
  year: string;
  model: string;
  isAvailableToUnlock: boolean;
  fuelType: FuelTypes;
  doors: string;
  seats: string;
  color: string;
  status: CarStatusesTypes;
}

export interface MyReservationsRepository {
  getMyReservationsByType({ type, limit, offset }: GetMyReservationsByTypePayload): Promise<GetMyReservationsByTypeDTO>;
}
