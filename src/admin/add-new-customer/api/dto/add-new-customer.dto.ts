export interface CreateCustomerValues {
  mediaId?: string;
  email: string;
  firstName: string;
  lastName: string;
  mobilePhone: string;
  whatsAppPhone: string;
  emergencyPhone: string;
  address: string;
  state: string;
  zip: string;
  notificationType?: string;
  driverLicence: DriverLicence;
}

interface DriverLicence {
  licenceNumber: string;
  DOB: string | Date;
  issueDate: string | Date;
  expDate: string | Date;
  licences: Array<string>
}

export interface CreateCustomerResponse {
  data: {
    email: string;
    id: string;
    isActive: boolean;
    role: string;
  }
}
