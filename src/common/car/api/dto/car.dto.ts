import { BodyTypes } from "@/common/constants/bodyTypes";
import { FuelTypes } from "@/common/constants/fuelTypes";
import { CarStatusesTypes } from "@/common/constants/carStatuses";
import { Media } from "@/common/media/api/media.repo";
import { CarStatusesForUpdate } from "@/common/constants/carStatusesForUpdate";


export interface BaseCar {
  id: string;
  imageUrl?: string;
  title: string;
  VIN: string;
  plateNumber: string;
  deviceKey: string;
  year: string | Date;
  model: string;
  fuelType: FuelTypes;
  doors: number;
  seats: number;
  color: string;
  status: CarStatusesForUpdate;
  media?: Media;
  make: CarMake;
  location: CarLocation;
  category: Category;
  insurance: Insurance;
  registration: Registration;
  serviceInspection: ServiceInspection;
}

export type ShortCarModel = Omit<BaseCar, 'imageUrl'
  | 'media'
  | 'make'
  | 'location'
  | 'category'
  | 'insurance'
  | 'registration'
  | 'serviceInspection'>

interface Category {
  id?: string;
  title: string;
  description: string;
}

export interface CreateCarData {
  title: string;
  VIN: string;
  plateNumber: string;
  makeId: string;
  categoryId: string;
  model: string;
  bodyType: BodyTypes;
  year: string;
  fuelType: FuelTypes;
  doors: string;
  seats: string;
  transmission: string;
  color: string;
  status: string;
  insurance: Insurance;
  registration: Registration;
  serviceInspection: ServiceInspection;
}

export interface EditCarPayload {
  carId: string;
  editCarData: EditCarData;
}

interface EditCarData {
  title: string;
  VIN: string;
  plateNumber: string;
  makeId: string;
  categoryId: string;
  model: string;
  year: string;
  fuelType: FuelTypes;
  doors: string;
  seats: string;
  color: string;
  status: CarStatusesTypes;
  insurance: Insurance;
  registration: Registration;
  serviceInspection: ServiceInspection;
}

export interface Specification {
  makeId: string;
  model: string;
  bodyType: BodyTypes;
  year: string;
  fuelType: FuelTypes;
  doors: string;
  seats: string;
  transmission: string;
  color: string;
  categoryId: string;
  status: string;
}

export interface Insurance {
  policyNumbers: string;
  coverage: string;
  expDate: string | Date;
  carId: string;
  media: Media;
}

export interface Registration {
  state: string;
  expDate: string | Date;
  carId: string;
  media: Media;
}

export interface ServiceInspection {
  lastInspectionDate: string | Date;
  expDate: string | Date;
  carId: string;
  media: Media;
}

export interface CarLocation {
  latitude: number;
  longitude: number;
}

export interface CarMake {
  id: string;
  title: string;
}

export interface UpdateCarStatusPayload {
  carId: string;
  status: CarStatusesForUpdate;
}
