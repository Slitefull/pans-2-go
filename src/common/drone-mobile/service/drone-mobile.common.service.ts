export interface BaseDroneMobileService {
  getVehicle(carId: string): Promise<any>;
}
