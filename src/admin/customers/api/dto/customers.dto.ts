import { Media } from "@/common/media/api/media.repo";
import { NotificationPreferencesValues } from "@/common/constants/notificationPreferences";


export interface GetCustomersWithFiltersPayload {
  search: string;
  status: string;
  page: number;
  perPage: number;
}

export interface GetCustomersWithFiltersDTO {
  data: Array<CustomerDTO>;
}

export interface CustomerDTO {
  id: string;
  number: number;
  email: string;
  isActive: boolean;
  role: string;
  firstName: string;
  lastName: string;
  mobilePhone: string;
  whatsAppPhone: string;
  emergencyPhone: string;
  address: string;
  state: string;
  zip: string;
  notificationType: NotificationPreferencesValues;
  payment: Payment;
  driverLicence: DriverLicence;
  media: Media;
}

interface Payment {
  id: string;
  cardType: string;
  cardNumbers: string;
  expDate: string;
  cardholderName: string;
  billingZipCode: string;
  rentalDamageCover: string;
}

interface DriverLicence {
  licenceNumber: string;
  DOB: Date;
  issueDate: Date;
  expDate: Date;
  medias: Array<Media>;
}
