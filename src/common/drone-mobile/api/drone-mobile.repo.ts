import { DMLocationReport, DMVehicle, GetVehiclesDTO } from "@/common/drone-mobile/api/dto/drone-mobile.dto";


export interface DroneMobileRepository {
  getVehicles(limit: number): Promise<GetVehiclesDTO>;

  getLocationReport(deviceKey: string): Promise<DMLocationReport>;

  getVehicle(deviceKey: string): Promise<DMVehicle>;
}
