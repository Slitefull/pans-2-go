import { CreateMediaByBase64Values, Media } from "@/common/media/api/media.repo";
import { UpdateProfileValues } from "@/common/session-user/api/session-user.repo";
import { Payment } from "@/common/auth/api/dto/auth.dto";
import { SessionUserDto } from "@/common/session-user/api/dto/session-user.dto";


export interface SessionUserPayment {
  billingZipCode: string;
  cardNumbers: string;
  cardType: string;
  cardholderName: string;
  expDate: string;
  id: string;
  rentalDamageCover: string;
}

export interface UserDriverLicence {
  DOB: string;
  expDate: string;
  issueDate: string;
  licenceNumber: string;
  medias: Array<Media>;
}

export interface BaseSessionUserService {
  id: string;
  prefix: string;
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
  whatsAppPhone: string;
  emergencyPhone: string;
  address: string;
  state: string;
  role: string;
  zip: string;
  isActive: boolean;
  notificationType: string;
  media: Media | null;
  payment: SessionUserPayment;
  createdProfileImage: Array<Media>;
  createdDriverLicences: Array<Media>;
  driverLicence: UserDriverLicence | null;

  reset(): void;

  fillFields(data: SessionUserDto): void;

  deleteUserAvatar(avatarId: string): Promise<void>;

  updatePayment(values: Payment): Promise<void>;

  attachUserPayment(paymentMethodId: string): Promise<void>;

  updateProfile(values: UpdateProfileValues): Promise<void>;

  createDriverLicenceImage(values: Array<CreateMediaByBase64Values>): Promise<void>;

  deleteUserDriverLicence(mediaIds: Array<string>): Promise<void>;
}
