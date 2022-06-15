import { EditCarPayload, UpdateCarStatusPayload } from "../api/dto/car.dto";


export interface BaseCarService {
  editCar({ carId, editCarData }: EditCarPayload): Promise<void>;

  deleteCar(carId: string): Promise<void>;

  updateCarStatus({ carId, status }: UpdateCarStatusPayload): Promise<void>;
}
