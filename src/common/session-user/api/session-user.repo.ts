export interface UpdateProfileValues {
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
  whatsAppPhone?: string;
  emergencyPhone?: string;
  address?: string;
  state?: string;
  zip?: string;
  notificationType?: string;
  mediaId?: string;
  payment?: Payment;
  driverLicence?: DriverLicence;
}

interface DriverLicence {
  DOB: string | Date;
  expDate: string | Date;
  issueDate: string | Date;
  licenceNumber: string;
  licences: Array<string>;
}

interface Payment {
  cardType: string;
  cardNumbers: string;
  expDate: string;
  cardholderName: string;
  billingZipCode: string;
  rentalDamageCover: string;
  paymentMethodId?: string;
}

export interface SessionUserRepository {
  attachUserPayment(paymentMethodId: string): Promise<void>;

  updatePayment(data: any): Promise<void>;

  updateProfile(data: UpdateProfileValues): Promise<void>;

  deleteUserAvatar(avatarId: string): Promise<void>;

  deleteUserDriverLicence(mediaIds: Array<string>): Promise<void>;
}
