import { api } from "@/common/api";
import { SessionUserRepository, UpdateProfileValues } from "./session-user.repo";


export class HttpSessionUserRepository implements SessionUserRepository {
  async attachUserPayment(paymentMethodId: string): Promise<void> {
    await api.post('/payment/attach', {paymentMethodId});
  }

  async updatePayment(data: any): Promise<void> {
    await api.put('/payment/byUser', data);
  };

  async updateProfile(data: UpdateProfileValues): Promise<void> {
    await api.put("/user/me", data);
  }

  async deleteUserAvatar(avatarId: string): Promise<void> {
    await api.delete(`/user/photo/${avatarId}`);
  }

  async deleteUserDriverLicence(mediaIds: Array<string>): Promise<void> {
    await api.put("/user/driver/licence/photo", {
      licences: mediaIds,
    });
  }
}
