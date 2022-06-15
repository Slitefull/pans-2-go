import { CreateCustomerValues } from "@/admin/add-new-customer/api/dto/add-new-customer.dto";
import { CreateMediaByBase64Values } from "@/common/media/api/media.repo";


export interface BaseAddNewCustomerService {
  createCustomer(values: CreateCustomerValues): Promise<void>;

  createDriverLicenceImage(values: Array<CreateMediaByBase64Values>): Promise<void>;
}
