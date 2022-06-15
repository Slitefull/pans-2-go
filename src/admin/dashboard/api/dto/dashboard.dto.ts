import { BaseCar } from "@/common/car/api/dto/car.dto";


export interface BusyTimeElement {
  start: Date;
  end: Date;
}

export interface BusyCar extends BaseCar {
  busyTime: Array<BusyTimeElement>;
}

export interface GetBusyTimeDTO {
  rows: Array<BusyCar>;
  countReservations: number;
  freeCars: number;
}
