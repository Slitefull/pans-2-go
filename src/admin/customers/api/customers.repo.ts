import {
  CustomerDTO,
  GetCustomersWithFiltersDTO,
  GetCustomersWithFiltersPayload
} from "@/admin/customers/api/dto/customers.dto";


export interface CustomersRepository {
  getAllCustomers(perPage: number): Promise<Array<CustomerDTO>>;

  getCustomerById(id: string): Promise<CustomerDTO>;

  getCustomersWithFilters(
    {
      search,
      status,
      page,
      perPage,
    }: GetCustomersWithFiltersPayload
  ): Promise<GetCustomersWithFiltersDTO>;
}
