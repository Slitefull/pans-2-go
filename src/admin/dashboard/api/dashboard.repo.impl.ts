import { api } from "@/common/api";
import { DashboardRepository, GetBusyTimePayload } from "@/admin/dashboard/api/dashboard.repo";
import { GetBusyTimeDTO } from "@/admin/dashboard/api/dto/dashboard.dto";


export class HttpDashboardRepository implements DashboardRepository {
  async getBusyTime({ title, page, sortBy, desc, startDate, perPage, category }: GetBusyTimePayload): Promise<GetBusyTimeDTO> {
    const response = await api.get(`/car/busytime`, {
      params: { title, page, sortBy, desc, startDate, perPage, category }
    })
    return response.data;
  }
}
