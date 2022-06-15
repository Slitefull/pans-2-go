import { UserRoles } from "@/common/constants/roles";
import { injector } from "@/common/injector/Injector";
import { SessionUserService } from "@/common/session-user/domain/session-user.service";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { SocketsService } from "@/common/sockets/domain/sockets.service";
import { AuthService } from "@/common/auth/domain/auth.service";
import { NotificationsListService } from "@/admin/notifications-list/domain/notifications-list.service";
import { AppService } from "@/common/app/domain/app.service";

import {
  APP_SERVICE,
  AUTH_SERVICE,
  NOTIFICATION_SERVICE,
  NOTIFICATIONS_LIST_SERVICE,
  SESSION_USER_SERVICE,
  SOCKETS_SERVICE
} from "@/common/injector/constants";
import { makeAutoObservable } from "mobx";


type UnsubscribeFn = () => void;
type ListenerFn<T> = (data: T) => void;

interface Options {
  binaryType?: BinaryType;
  reconnectOnClose?: boolean;
}

export enum SocketStatus {
  RECONNECTING,
  INITIALIZED,
  OPENED,
  CLOSED,
}

const SOCKET_RECONNECT_TIMEOUT = 1000;
const CLOSED_BY_USER = {
  CODE: 999999999,
  REASON: "CLOSED_BY_USER",
};

export class WSConnectionClosed extends Error {
}

export class WSApi {
  private _options: Options;
  private _socket: WebSocket;
  private _listeners: Array<ListenerFn<any>> = [];
  private _messageQueue: Array<any> = [];
  private _socketStatus: SocketStatus;

  constructor(url: string, options: Options) {
    this._options = options;
    this._socket = new WebSocket(url);
    this._socketStatus = SocketStatus.INITIALIZED;
    this._initSocket();

    makeAutoObservable(this);
  }

  private _getInfoMessage(message: string) {
    return `[WS] (url=${this._socket.url}) ${message}`;
  }

  private _initSocket() {
    if (this._options.binaryType) {
      this._socket.binaryType = this._options.binaryType;
    }
    this._socket.onmessage = this._handleMessage;
    this._socket.onclose = this._handleClose;
    this._socket.onopen = this._handleOpen;
    this._socketStatus = SocketStatus.INITIALIZED;
    console.log(this._getInfoMessage("Socket initialized"));
  }

  private _handleMessage = (message: MessageEvent<any>) => {
    const parsedMessage = JSON.parse(message.data);
    WSApi._notificationService.notify({
      message: parsedMessage.message,
      status: parsedMessage.kind,
    })
    if (WSApi._appService.currentApp == UserRoles.admin) {
      WSApi._notificationsListService.getAllNotifications();
    }
  };

  private _handleClose = (event: CloseEvent) => {
    console.log(this._getInfoMessage("Connection closed"));
    if (
      this._options.reconnectOnClose &&
      event.code !== CLOSED_BY_USER.CODE &&
      event.reason !== CLOSED_BY_USER.REASON
    ) {
      console.log(this._getInfoMessage("Trying to reconnect"));
      this._socketStatus = SocketStatus.RECONNECTING;

      window.setTimeout(() => {
        console.log(this._getInfoMessage("Reconnecting"));
        const url = this._socket.url;
        this._socket = new WebSocket(url);
        this._initSocket();
      }, SOCKET_RECONNECT_TIMEOUT);
    } else {
      this._socketStatus = SocketStatus.CLOSED;
    }
  };

  private _handleOpen = () => {
    console.log(this._getInfoMessage("Socket connection opened"));
    this._socketStatus = SocketStatus.OPENED;

    while (this._messageQueue.length !== 0) {
      const message = this._messageQueue.shift();
      this._socket.send(message);
    }
    console.log(this._getInfoMessage("All queued messages sent"));
  };

  send(message: any) {
    if (
      this._socketStatus === SocketStatus.INITIALIZED ||
      this._socketStatus === SocketStatus.RECONNECTING
    ) {
      console.log(this._getInfoMessage("Message pushed to queue"));
      this._messageQueue.push(message);
    } else if (this._socketStatus === SocketStatus.CLOSED) {
      throw new WSConnectionClosed(
        `Socket connection to ${this._socket.url} was closed`
      );
    } else {
      console.log(this._getInfoMessage("Message send"));
      this._socket.send(JSON.stringify(message));
    }
  }

  close() {
    this._socket.close();
  }

  subscribe<T>(listener: ListenerFn<T>): UnsubscribeFn {
    this._listeners.push(listener);
    console.log(this._getInfoMessage("Listener subscribed"));
    return () => {
      console.log(this._getInfoMessage("Listener subscribed"));
      this._listeners = this._listeners.filter((ls) => ls !== listener);
    };
  }

  get socketStatus(): SocketStatus {
    return this._socketStatus;
  }

  set socketStatus(value: SocketStatus) {
    this._socketStatus = value;
  }

  private static get _appService() {
    return injector.get<AppService>(APP_SERVICE);
  }

  private static get _authService() {
    return injector.get<AuthService>(AUTH_SERVICE);
  }

  private static get _socketsService() {
    return injector.get<SocketsService>(SOCKETS_SERVICE);
  }

  private static get _sessionUserService() {
    return injector.get<SessionUserService>(SESSION_USER_SERVICE);
  }

  private static get _notificationsListService() {
    return injector.get<NotificationsListService>(NOTIFICATIONS_LIST_SERVICE);
  }

  private static get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }
}
