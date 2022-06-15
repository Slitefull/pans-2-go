import { CreateCustomerResponse, CreateCustomerValues } from "@/admin/add-new-customer/api/dto/add-new-customer.dto";


export interface AddNewCustomerRepository {
  createCustomer(data: CreateCustomerValues): Promise<CreateCustomerResponse>;

  activateUser(userId: string): Promise<void>;
}
