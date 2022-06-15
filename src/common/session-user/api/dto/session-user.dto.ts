import { Media } from "@/common/media/api/media.repo";
import { SessionUserPayment, UserDriverLicence } from "@/common/session-user/domain/session-user.common.repo";

export interface SessionUserDto {
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
  zip: string;
  role: string;
  notificationType: string;
  isActive: boolean;
  media: Media;
  payment: SessionUserPayment;
  driverLicence: UserDriverLicence;
}
