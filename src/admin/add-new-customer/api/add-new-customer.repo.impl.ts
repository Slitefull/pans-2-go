import { api } from "@/common/api";
import { CreateCustomerResponse, CreateCustomerValues } from "@/admin/add-new-customer/api/dto/add-new-customer.dto";
import { AddNewCustomerRepository } from "@/admin/add-new-customer/api/add-new-customer.repo";


export class HttpAddNewCustomerRepository implements AddNewCustomerRepository {
  async createCustomer(data: CreateCustomerValues): Promise<CreateCustomerResponse> {
    return await api.post("/user", data);
  }

  async activateUser(userId: string): Promise<void> {
    return await api.get(`/user/activate/${userId}`);
  }
}
