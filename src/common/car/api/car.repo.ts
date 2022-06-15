import { BaseCar, EditCarPayload, UpdateCarStatusPayload } from "./dto/car.dto";

export interface CarRepository {
  getCarById(id: string): Promise<BaseCar>;

  updateCar({ carId, editCarData }: EditCarPayload): Promise<void>

  deleteCar(carId: string): Promise<void>;

  updateCarStatus({ carId, status }: UpdateCarStatusPayload): Promise<void>
}
