import { api } from "@/common/api";
import { DroneMobileRepository } from "@/common/drone-mobile/api/drone-mobile.repo";
import { DMLocationReport, DMVehicle, GetVehiclesDTO } from "@/common/drone-mobile/api/dto/drone-mobile.dto";


export class HttpDroneMobileRepository implements DroneMobileRepository {
  async getVehicles(limit: number): Promise<GetVehiclesDTO> {
    return await api.get(`/drone-mobile/vehicles`, { params: { limit } })
  }

  async getLocationReport(deviceKey: string): Promise<DMLocationReport> {
    const { data } = await api.get(`/drone-mobile/command/${deviceKey}?command=location`)
    return data;
  }

  async getVehicle(deviceKey: string): Promise<DMVehicle> {
    const response = await api.get(`/drone-mobile/vehicle/${deviceKey}`)
    return response.data;
  }
}
