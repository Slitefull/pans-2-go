import { GetBusyTimeDTO } from "@/admin/dashboard/api/dto/dashboard.dto";


type Desc = "ASC" | "DESC";

export interface GetBusyTimePayload {
  title?: string;
  page?: number;
  sortBy?: string;
  desc?: Desc;
  startDate?: Date | string;
  perPage?: number;
  category?: string;
}

export interface DashboardRepository {
  getBusyTime({ title, page, sortBy, desc, startDate, perPage, category }: GetBusyTimePayload): Promise<GetBusyTimeDTO>;
}
