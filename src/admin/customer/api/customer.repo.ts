import { UpdateCustomerValues } from "@/admin/customer/view/customer.component";
import { ChangeLogElement, GetChangeLogByIdPayload } from "@/admin/customer/api/dto/customer.dto";


export interface CustomerRepository {
  activateUserByAdmin(userId: string): Promise<void>;

  blockUserByAdmin(userId: string): Promise<void>;

  pendingUserByAdmin(userId: string): Promise<void>;

  deleteCustomerDriverLicence(mediaIds: Array<string>): Promise<void>;

  deleteUserAvatar(userId: string, photoId: string): Promise<void>;

  updateCustomer(values: UpdateCustomerValues, userId: string): Promise<void>;

  getChangeLogById({ userId, page, perPage }: GetChangeLogByIdPayload): Promise<Array<ChangeLogElement>>;
}
