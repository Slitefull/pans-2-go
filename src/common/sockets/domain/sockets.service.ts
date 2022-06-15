import { action, makeAutoObservable } from "mobx";
import { injector } from "@/common/injector/Injector";
import { NOTIFICATION_SERVICE, SOCKETS_REPOSITORY } from "@/common/injector/constants";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { BaseSocketsService } from "@/common/sockets/domain/sockets.common.service";
import { SendMessagePayload, SocketsRepository } from "@/common/sockets/api/sockets.repo";


export class SocketsService implements BaseSocketsService {
  @action
  public async ping(): Promise<void> {
    try {
      await SocketsService._socketsRepo.ping();
    } catch (e) {
      SocketsService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async sendMessage({ id, data, type, kind }: SendMessagePayload): Promise<void> {
    try {
      await SocketsService._socketsRepo.sendMessage({ id, data, type, kind });
    } catch (e) {
      SocketsService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  private static get _socketsRepo() {
    return injector.get<SocketsRepository>(SOCKETS_REPOSITORY);
  }

  private static get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }
}
