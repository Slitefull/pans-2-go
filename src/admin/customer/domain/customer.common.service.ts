import { CustomerDTO } from "@/admin/customers/api/dto/customers.dto";
import { NotificationPreferencesValues } from "@/common/constants/notificationPreferences";
import { CreateMediaByBase64Values, Media } from "@/common/media/api/media.repo";
import { UpdateCustomerValues } from "@/admin/customer/view/customer.component";
import { ChangeLogElement, GetChangeLogByIdPayload } from "@/admin/customer/api/dto/customer.dto";
import { ReservationHistoryElement } from "@/admin/edit-car/api/dto/edit-car.dto";
import { CustomerTabs } from "@/admin/customer/constants";


export interface BaseCustomerService {
  selectedCustomerId: string | null;
  selectedCustomer: CustomerDTO | null;
  createdDriverLicences: Array<Media>;
  selectedNotificationType: NotificationPreferencesValues;
  reservationHistory: Array<ReservationHistoryElement>;
  changeLogs: Array<ChangeLogElement>;
  tab: CustomerTabs | null;
  page: number;
  perPage: number;

  getSelectedCustomer(): Promise<void>;

  activateUserByAdmin(userId: string): Promise<void>;

  blockUserByAdmin(userId: string): Promise<void>;

  pendingUserByAdmin(userId: string): Promise<void>;

  createDriverLicenceImage(values: Array<CreateMediaByBase64Values>): Promise<void>;

  deleteCustomerProfilePhoto(userId: string, photoId: string): Promise<void>;

  deleteCustomerDriverLicence(mediaIds: Array<string>): Promise<void>;

  updateCustomerByAdmin(values: UpdateCustomerValues, userId: string): Promise<void>;

  getChangeLogById({ userId, page, perPage }: GetChangeLogByIdPayload): Promise<void>;

  reset(): void;
}
