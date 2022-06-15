import { injector } from "@/common/injector/Injector";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import {
  BaseError,
  DefaultBehaviourBody,
  DomainErrorTree,
} from "@/infrastructure/exception/exception.repo";
import {
  BaseExceptionService,
  ExceptionHandler,
} from "@/common/contracts/exception/exception.common.repo";
import { NOTIFICATION_SERVICE } from "@/common/injector/constants";

export class ExceptionService implements BaseExceptionService {
  private get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }

  private _subscribers: DomainErrorTree<Array<ExceptionHandler>> = {};

  private _errorNotificationMessages: DomainErrorTree<DefaultBehaviourBody>;

  constructor(errorMessages: DomainErrorTree<DefaultBehaviourBody>) {
    this._errorNotificationMessages = errorMessages;
  }

  private createErrorHandlersArray(domain: string, code: number) {
    if (!this._subscribers[domain]) {
      this._subscribers[domain] = {};
    }

    if (!this._subscribers[domain][code]) {
      this._subscribers[domain][code] = [];
    }
  }

  private showNotification(data: DefaultBehaviourBody): void {
    if (typeof data === "string") {
      this._notificationService.notify({
        message: data,
        title: "error",
        status: "error",
      });
    } else {
      this._notificationService.notify({
        message: data.message,
        title: data.title,
        status: "error",
      });
    }
  }

  private isBaseErrorLike(errorCandidate: any): boolean {
    return (
      errorCandidate &&
      typeof errorCandidate.domain === "string" &&
      typeof errorCandidate.code === "number" &&
      (typeof errorCandidate.data === "object" ||
        typeof errorCandidate.data === "undefined" ||
        errorCandidate.data === null)
    );
  }

  public subscribe(
    domain: string,
    code: number,
    handler: ExceptionHandler
  ): () => void {
    this.createErrorHandlersArray(domain, code);

    this._subscribers[domain][code].push(handler);

    return () => {
      this._subscribers[domain][code] = this._subscribers[domain][code].filter(
        (subscriber) => subscriber !== handler
      );
    };
  }

  public consumeError(error: BaseError): void {
    if (error && this.isBaseErrorLike(error)) {
      this.createErrorHandlersArray(error.domain, error.code);

      const handlers = this._subscribers[error.domain][error.code];
      let preventDefault = false;

      for (const handler of handlers) {
        try {
          const preventDefaultCandidate = !handler(error.data);

          if (!preventDefault) {
            preventDefault = preventDefaultCandidate;
          }
        } catch (e) {
          console.warn(
            `exception handler for { domain: ${error.domain}, code: ${error.code}} crashed`
          );
        }
      }

      if (!preventDefault) {
        const message = this.getMessage(error.domain, error.code);
        if (message) {
          this.showNotification(message);
        }
      }
    }
  }

  private getMessage(
    domain: string,
    code: number
  ): DefaultBehaviourBody | undefined {
    if (this._errorNotificationMessages[domain]) {
      return this._errorNotificationMessages[domain][code];
    }
  }
}
