import { injector } from "@/common/injector/Injector";
import { CUSTOMER_SERVICE, CUSTOMERS_REPOSITORY, NOTIFICATION_SERVICE } from "@/common/injector/constants";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { BaseCustomersService } from "@/admin/customers/domain/customers.common.service";
import { action, makeAutoObservable } from "mobx";
import { CustomerDTO } from "@/admin/customers/api/dto/customers.dto";
import { CustomersRepository } from "@/admin/customers/api/customers.repo";
import { CustomerService } from "@/admin/customer/domain/customer.service";


export class CustomersService implements BaseCustomersService {
  private _customers: Array<CustomerDTO>;
  private _page: number;
  private _perPage: number;
  private _isHistoryEndReached: boolean;
  private _search: string | null;
  private _status: string | null;

  constructor() {
    this._customers = [];
    this._page = 0;
    this._perPage = 15;
    this._isHistoryEndReached = false;
    this._search = null;
    this._status = null;

    makeAutoObservable(this);
  }

  @action
  async getAllCustomers(): Promise<void> {
    try {
      this._customers = await this._customersRepo.getAllCustomers(this._perPage);
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async blockCustomer(userId: string): Promise<void> {
    try {
      await this._customerService.blockUserByAdmin(userId)
      await this.getCustomersWithFilters();
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async pendingCustomer(userId: string): Promise<void> {
    try {
      await this._customerService.pendingUserByAdmin(userId)
      await this.getCustomersWithFilters();
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async getCustomersWithFilters(): Promise<void> {
    try {
      const { data } = await this._customersRepo.getCustomersWithFilters({
        search: this._search!,
        page: this._page,
        perPage: this._perPage,
        status: this._status!
      });

      console.log('data', data)

      this._isHistoryEndReached = data.length < this._perPage;

      this._customers = data;
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async getCustomersWithFiltersOnScroll(): Promise<void> {
    try {
      const { data } = await this._customersRepo.getCustomersWithFilters({
        search: this._search!,
        page: this._page + 1,
        perPage: this._perPage,
        status: this._status!
      });

      this._page = this._page + 1;

      if (data.length < this._perPage) {
        this._isHistoryEndReached = true;
      }
      const seen = new Set();

      this._customers = [...this._customers, ...data].filter((el) => {
        const duplicate = seen.has(el.id);
        seen.add(el.id);
        return !duplicate;
      });
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  reset(): void {
    this._customers = [];
    this._page = 0;
    this._perPage = 15;
    this._isHistoryEndReached = false;
    this._search = '';
    this._status = null;
  }

  get status(): string | null {
    return this._status;
  }

  get search(): string | null {
    return this._search;
  }

  get isHistoryEndReached(): boolean {
    return this._isHistoryEndReached;
  }

  get perPage(): number {
    return this._perPage;
  }

  get page(): number {
    return this._page;
  }

  get customers(): Array<CustomerDTO> {
    return this._customers;
  }

  set status(value: string | null) {
    this._status = value;
  }

  set search(value: string | null) {
    this._search = value;
  }

  set isHistoryEndReached(value: boolean) {
    this._isHistoryEndReached = value;
  }

  set perPage(value: number) {
    this._perPage = value;
  }

  set page(value: number) {
    this._page = value;
  }

  set customers(value: Array<CustomerDTO>) {
    this._customers = value;
  }

  private get _customerService() {
    return injector.get<CustomerService>(CUSTOMER_SERVICE);
  }

  private get _customersRepo() {
    return injector.get<CustomersRepository>(CUSTOMERS_REPOSITORY);
  }

  private get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }
}
