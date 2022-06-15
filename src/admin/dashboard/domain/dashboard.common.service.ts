import { BodyTypes } from "@/common/constants/bodyTypes";
import { GetBusyTimePayload } from "@/admin/dashboard/api/dashboard.repo";
import { BusyCar } from "@/admin/dashboard/api/dto/dashboard.dto";


export interface BaseDashboardService {
  searchName: string | null;
  selectedCarType: BodyTypes | null;
  selectedDate: Date | string;
  cars: Array<BusyCar>;
  reservationsCount: number | null;
  freeCarsCount: number | null;

  getBusyCars({ page, sortBy, desc, startDate, perPage }: GetBusyTimePayload): Promise<void>;
}
