import { action, makeAutoObservable } from "mobx";
import { injector } from "@/common/injector/Injector";
import { DRONE_MOBILE_REPOSITORY, NOTIFICATION_SERVICE } from "@/common/injector/constants";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { DroneMobileRepository } from "@/common/drone-mobile/api/drone-mobile.repo";
import { BaseDroneMobileService } from "@/common/drone-mobile/service/drone-mobile.common.service";


export class DroneMobileService implements BaseDroneMobileService {
  constructor() {
    makeAutoObservable(this);
  }

  @action
  public async getVehicle(carId: string): Promise<void> {
    try {
       await DroneMobileService._droneMobileRepo.getVehicle(carId);
    } catch (e) {
      DroneMobileService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  private static get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }

  private static get _droneMobileRepo() {
    return injector.get<DroneMobileRepository>(DRONE_MOBILE_REPOSITORY);
  }
}
