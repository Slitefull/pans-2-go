import { api } from "@/common/api";
import { NewReservationByAdminRepository } from "@/admin/create-reservation/api/create-reservation.repo";


export class HttpNewReservationByAdminRepository implements NewReservationByAdminRepository {
  async activateUserByAdmin(userId: string): Promise<void> {
    await api.get(`/user/activate/${userId}`);
  }
}
