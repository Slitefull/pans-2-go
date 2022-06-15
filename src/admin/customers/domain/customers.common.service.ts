import { CustomerDTO } from "@/admin/customers/api/dto/customers.dto";


export interface BaseCustomersService {
  customers: Array<CustomerDTO>;
  page: number;
  perPage: number;
  isHistoryEndReached: boolean;
  search: string | null;
  status: string | null;

  getAllCustomers(): Promise<void>;

  getCustomersWithFilters(): Promise<void>;

  blockCustomer(userId: string): Promise<void>;

  pendingCustomer(userId: string): Promise<void>;

  getCustomersWithFiltersOnScroll(): Promise<void>;

  reset(): void;
}
