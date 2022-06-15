import { api } from "@/common/api";
import { CustomerRepository } from "@/admin/customer/api/customer.repo";
import { UpdateCustomerValues } from "@/admin/customer/view/customer.component";
import { ChangeLogElement, GetChangeLogByIdPayload } from "@/admin/customer/api/dto/customer.dto";


export class HttpCustomerRepository implements CustomerRepository {
  async activateUserByAdmin(userId: string): Promise<void> {
    await api.get(`/user/activate/${userId}`);
  }

  async blockUserByAdmin(userId: string): Promise<void> {
    await api.get(`/user/block/${userId}`);
  }

  async pendingUserByAdmin(userId: string): Promise<void> {
    await api.get(`/user/pending/${userId}`);
  }

  async deleteCustomerDriverLicence(mediaIds: Array<string>): Promise<void> {
    await api.put("/user/driver/licence/photo", {
      licences: mediaIds,
    });
  }

  async deleteUserAvatar(userId: string, photoId: string): Promise<void> {
    await api.delete(`/user/${userId}/photo/${photoId}`);
  }

  async updateCustomer(values: UpdateCustomerValues, userId: string): Promise<void> {
    await api.put(`user/${userId}`, {
      ...values
    });
  }

  async getChangeLogById({ userId, page, perPage }: GetChangeLogByIdPayload): Promise<Array<ChangeLogElement>> {
    const response = await api.get(`/user/log/${userId}/byUser?page=${page}&perPage=${perPage}`);
    return response.data;
  }
}
