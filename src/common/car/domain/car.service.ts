import { injector } from "@/common/injector/Injector";
import { action } from "mobx";
import { CarRepository } from "../api/car.repo";
import { CAR_REPOSITORY, CARS_SERVICE, NOTIFICATION_SERVICE } from "@/common/injector/constants";
import { BaseCarService } from "@/common/car/domain/car.common.service";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { EditCarPayload, UpdateCarStatusPayload } from "../api/dto/car.dto";
import { CarsService } from "@/admin/cars/domain/cars.service";


export class CarService implements BaseCarService {
  @action
  async getCarById(id: string): Promise<void> {
    try {
      await CarService._carRepo.getCarById(id);
    } catch (e) {
      CarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async editCar({ carId, editCarData }: EditCarPayload): Promise<void> {
    try {
      await CarService._carRepo.updateCar({ carId, editCarData });
    } catch (e) {
      CarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async deleteCar(carId: string): Promise<void> {
    try {
      await CarService._carRepo.deleteCar(carId);
    } catch (e) {
      CarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async updateCarStatus({ carId, status }: UpdateCarStatusPayload): Promise<void> {
    try {
      await CarService._carRepo.updateCarStatus({ carId, status });
      await CarService._carsService.getCarsWithFilters();
    } catch (e) {
      CarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  private static get _carsService() {
    return injector.get<CarsService>(CARS_SERVICE);
  }

  private static get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }

  private static get _carRepo() {
    return injector.get<CarRepository>(CAR_REPOSITORY);
  }
}
