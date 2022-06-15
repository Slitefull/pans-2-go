import { TypesOfServiceValues } from "@/common/constants/typesOfService";
import { Media } from "@/common/media/api/media.repo";


export interface UpdateCarValues {
  mediaId: string | null;
  imageUrl: string;
  title: string;
  VIN: string;
  plateNumber: string;
  bodyType: string;
  year: Date | string | null;
  deviceKey?: string;
  model: string;
  fuelType: string;
  doors: number;
  seats: number;
  color: string;
  categoryId: string;
  insurance: Insurance;
  registration: Registration;
  serviceInspection: ServiceInspection;
}

interface Insurance {
  policyNumbers: string;
  coverage: string;
  expDate: Date | string | null;
  carId: string;
  mediaId?: string | null;
}

interface Registration {
  state: string;
  expDate: Date | string | null;
  carId: string;
  mediaId?: string | null;
}

interface ServiceInspection {
  expDate: Date | string | null;
  carId: string;
  mediaId?: string | null;
}

export interface GetReservationHistoryByCarIdPayload {
  carId: string;
  limit: number;
  offset: number;
}

export interface ReservationHistoryElement {
  number: number;
  customer: string;
  pickUp: string | Date;
  dropOff: string | Date;
  hours: number | string;
}

export interface CreateMaintenancePayload {
  typeOfService: TypesOfServiceValues;
  odometer: number;
  date: Date | string;
  comment: string;
  carId: string;
  mediaId?: string | null;
}

export interface EditMaintenanceValues {
  typeOfService: TypesOfServiceValues;
  odometer: number;
  date: Date | string;
  comment: string;
  carId: string;
  mediaId?: string | null;
}

export interface MaintenanceDTO {
  id: string;
  typeOfService: TypesOfServiceValues;
  odometer: number;
  date: Date | string;
  comment: string;
  media?: Media;
}

export interface GetChangeLogByIdPayload {
  userId: string;
  page: number;
  perPage: number;
}

export interface ChangeLogElement {
  action: string;
  createdAt: Date | string;
}
