import { CustomersRepository } from "@/admin/customers/api/customers.repo";
import { api } from "@/common/api";
import {
  CustomerDTO,
  GetCustomersWithFiltersDTO,
  GetCustomersWithFiltersPayload
} from "@/admin/customers/api/dto/customers.dto";


export class HttpCustomersRepository implements CustomersRepository {
  async getCustomersWithFilters(
    {
      search,
      status,
      page,
      perPage,
    }: GetCustomersWithFiltersPayload): Promise<GetCustomersWithFiltersDTO> {
    return await api.get(`/user/find/users`, {
      params: {
        search,
        status,
        page,
        perPage,
      }
    })
  }

  async getAllCustomers(perPage: number): Promise<Array<CustomerDTO>> {
    const response = await api.get(`/user/find/users`, { params: { perPage } })
    return response.data;
  }

  async getCustomerById(id: string): Promise<CustomerDTO> {
    const response = await api.get(`/user/${id}`)
    return response.data;
  }
}
