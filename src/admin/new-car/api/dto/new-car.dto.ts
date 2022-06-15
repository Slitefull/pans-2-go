import { FuelTypes } from "@/common/constants/fuelTypes";
import { CarStatusesTypes } from "@/common/constants/carStatuses";


export interface CreateCarData {
  mediaId: string;
  title: string;
  VIN: string;
  plateNumber: string;
  makeId: string;
  categoryId: string;
  model: string;
  year: string | null;
  fuelType: FuelTypes;
  doors: string;
  seats: string;
  color: string;
  status: CarStatusesTypes;
  insurance: Insurance;
  registration: Registration;
  serviceInspection: ServiceInspection;
}

interface Insurance {
  policyNumbers: string;
  coverage: string;
  expDate: string;
  mediaId: string;
}

interface Registration {
  state: string;
  expDate: string;
  mediaId: string;
}

interface ServiceInspection {
  lastInspectionDate: string;
  expDate: string;
  mediaId: string;
}
