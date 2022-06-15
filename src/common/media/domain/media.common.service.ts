import { Media, CreateMediaByBase64Values } from "@/common/media/api/media.repo";


export interface BaseMediaService {
  createdMediaIds: Array<Media>;

  createMediaByBase64(values: Array<CreateMediaByBase64Values>): Promise<void>
}
