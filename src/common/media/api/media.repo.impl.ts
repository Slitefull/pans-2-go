import { api } from "@/common/api";
import {
  CreateMediaByBase64Response,
  CreateMediaByBase64Values,
  MediaRepository
} from "@/common/media/api/media.repo";

export class HttpMediaRepository implements MediaRepository {
  async createMediaByBase64(
    data: Array<CreateMediaByBase64Values>
  ): Promise<CreateMediaByBase64Response> {
    return await api.post("/media/base64", data);
  }
}
