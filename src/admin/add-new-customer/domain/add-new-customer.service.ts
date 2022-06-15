import { action, makeAutoObservable } from "mobx";
import { injector } from "@/common/injector/Injector";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { CreateMediaByBase64Values, Media, MediaRepository } from "@/common/media/api/media.repo";
import { History } from "history";
import { BaseAddNewCustomerService } from "@/admin/add-new-customer/domain/add-new-customer.common.service";
import { AddNewCustomerRepository } from "@/admin/add-new-customer/api/add-new-customer.repo";
import { CreateCustomerValues } from "@/admin/add-new-customer/api/dto/add-new-customer.dto";
import { CUSTOMERS_PAGE } from "@/common/constants/routes";

import {
  ADD_NEW_CUSTOMER_REPOSITORY,
  HISTORY,
  MEDIA_REPOSITORY,
  NOTIFICATION_SERVICE,
} from "@/common/injector/constants";
import i18next from "i18next";


export class AddNewCustomerService implements BaseAddNewCustomerService {
  private _driverLicenceMedias: Array<Media>;

  constructor() {
    this._driverLicenceMedias = [];

    makeAutoObservable(this);
  }

  @action
  public async createCustomer(data: CreateCustomerValues): Promise<void> {
    try {
      const { data: response } = await this._addNewCustomerRepo.createCustomer(data);
      await this._addNewCustomerRepo.activateUser(response.id);

      this._notificationService.notify({
        message: "New customer has been created!",
        status: "success",
      })

      this._history.push(CUSTOMERS_PAGE);
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async createDriverLicenceImage(
    values: Array<CreateMediaByBase64Values>
  ): Promise<void> {
    try {
      const { data: createdMediaIds } = await this._mediaRepo.createMediaByBase64(values);
      if (createdMediaIds.length === 2) {
        this._driverLicenceMedias = createdMediaIds;
      } else {
        this._driverLicenceMedias = [...this.driverLicenceMedias, ...createdMediaIds]
      }

      this._notificationService.notify({
        message: i18next.t("admin.mediaUploaded"),
        status: "success",
      })
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  get driverLicenceMedias(): Array<Media> {
    return this._driverLicenceMedias;
  }

  set driverLicenceMedias(value: Array<Media>) {
    this._driverLicenceMedias = value;
  }

  private get _history() {
    return injector.get<History>(HISTORY);
  }

  private get _addNewCustomerRepo() {
    return injector.get<AddNewCustomerRepository>(ADD_NEW_CUSTOMER_REPOSITORY);
  }

  private get _mediaRepo() {
    return injector.get<MediaRepository>(MEDIA_REPOSITORY);
  }

  private get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }
}
