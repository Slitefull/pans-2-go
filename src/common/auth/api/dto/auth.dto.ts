import { UserRoles } from "@/common/constants/roles";
import { Media } from "@/common/media/api/media.repo";
import { SessionUserPayment, UserDriverLicence } from "@/common/session-user/domain/session-user.common.repo";


export interface LoginValues {
  email: string;
  password: string;
  role: string;
}

export interface SendRestoreCodeValues {
  email: string;
  type: string;
}

export interface RegistrationValues {
  mediaId?: string;
  email: string;
  password?: string;
  rePassword?: string;
  firstName: string;
  lastName: string;
  mobilePhone: string;
  whatsAppPhone: string;
  emergencyPhone: string;
  address: string;
  state: string;
  zip: string;
  notificationType?: string;
  payment: Payment;
  driverLicence: DriverLicence;
}

export interface DriverLicence {
  DOB: Date | string;
  issueDate: Date | string;
  expDate: Date | string;
  licenceNumber: string;
  licences: Array<string>;
}

export interface Payment {
  cardType: string;
  cardNumbers: string;
  expDate: string;
  rentalDamageCover: string;
  paymentMethodId?: string;
  cardholderName?: string;
  billingZipCode?: string | null;
}

export interface GetMeResponse {
  address: string;
  email: string;
  emergencyPhone: string;
  firstName: string;
  id: string;
  isActive: boolean;
  lastName: string;
  mobilePhone: string;
  notificationType: string;
  prefix: string;
  role: UserRoles;
  state: string;
  whatsAppPhone: string;
  zip: string;
  media: Media;
  payment: SessionUserPayment;
  driverLicence: UserDriverLicence;
}

export interface LoginResponse {
  accessToken: string;
  userDto: UserDto;
}

interface UserDto {
  id: string;
  email: string;
  isActive: boolean;
  role: UserRoles;
}

export interface ResetPasswordValues {
  userId: string | undefined;
  oldPassword: string;
  password: string;
  rePassword: string;
  type: string;
}

export interface RegistrationResponse {
  registrationToken: string;
}

export interface RestorePasswordValues {
  email: string;
  type: string;
}

export interface RestorePasswordActivationValues {
  token: string;
  password: string;
  rePassword: string;
}
