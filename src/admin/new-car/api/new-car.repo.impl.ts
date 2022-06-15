import { api } from "@/common/api";
import { NewCarRepository } from "@/admin/new-car/api/new-car.repo";
import { CreateCarData } from "./dto/new-car.dto";


export class HttpNewCarRepository implements NewCarRepository {
  async createCar(data: CreateCarData): Promise<void> {
    await api.post("/car", data);
  }
}
