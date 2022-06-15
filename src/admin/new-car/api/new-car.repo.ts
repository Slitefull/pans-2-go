import { CreateCarData } from "./dto/new-car.dto";


export interface NewCarRepository {
  createCar(data: CreateCarData): Promise<void>;
}
