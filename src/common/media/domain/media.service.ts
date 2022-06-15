import { action, makeAutoObservable } from "mobx";
import { CreateMediaByBase64Values, Media, MediaRepository } from "@/common/media/api/media.repo";
import { injector } from "@/common/injector/Injector";
import { MEDIA_REPOSITORY, NOTIFICATION_SERVICE } from "@/common/injector/constants";
import { BaseMediaService } from "@/common/media/domain/media.common.service";
import { NotificationService } from "@/infrastructure/notification/notification.service";


export class MediaService implements BaseMediaService {
  private _createdMediaIds: Array<Media>;

  constructor() {
    this._createdMediaIds = [];
    makeAutoObservable(this);
  }

  @action
  public async createMediaByBase64(
    values: Array<CreateMediaByBase64Values>
  ): Promise<void> {
    try {
      const { data: createdMediaIds } = await this._mediaRepo.createMediaByBase64(values);
      this._createdMediaIds = createdMediaIds;
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  get createdMediaIds(): Array<Media> {
    return this._createdMediaIds;
  }

  set createdMediaIds(value: Array<Media>) {
    this._createdMediaIds = value;
  }

  private get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }

  private get _mediaRepo() {
    return injector.get<MediaRepository>(MEDIA_REPOSITORY);
  }
}
