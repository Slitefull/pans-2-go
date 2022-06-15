import { createBrowserHistory, History } from "history";
import { injector } from "@/common/injector/Injector";
import { AuthRepository } from "@/common/auth/api/auth.repo";
import { AuthService } from "@/common/auth/domain/auth.service";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { ExceptionService } from "@/infrastructure/exception/exception.service";
import { SessionUserService } from "@/common/session-user/domain/session-user.service";
import { HttpAuthRepository } from "@/common/auth/api/auth.repo.impl";
import exceptionServiceData from "@/infrastructure/exception/data/default-behavior";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { ReservationRepository } from "@/common/reservation/api/reservation.repo";
import { HttpReservationRepository } from "@/common/reservation/api/reservation.repo.impl";
import { AppService } from "@/common/app/domain/app.service";
import { CarService } from "@/common/car/domain/car.service";
import { CarRepository } from "@/common/car/api/car.repo";
import { HttpCarRepository } from "@/common/car/api/car.repo.impl";
import { HttpCarsRepository } from "@/admin/cars/api/cars.repo.impl";
import { CarsService } from "@/admin/cars/domain/cars.service";
import { CarsRepository } from "@/admin/cars/api/cars.repo";
import { MediaRepository } from "@/common/media/api/media.repo";
import { HttpMediaRepository } from "@/common/media/api/media.repo.impl";
import { MediaService } from "@/common/media/domain/media.service";
import { SessionUserRepository } from "@/common/session-user/api/session-user.repo";
import { HttpSessionUserRepository } from "@/common/session-user/api/session-user.repo.impl";
import { MyReservationsService } from "@/common/my-reservations/domain/my-reservations.service";
import { MyReservationsRepository } from "@/common/my-reservations/api/my-reservations.repo";
import { HttpMyReservationsRepository } from "@/common/my-reservations/api/my-reservations.repo.impl";
import { LockCarService } from "@/common/lock-car/domain/lock-car.service";
import { LockCarRepository } from "@/common/lock-car/api/lock-car.repo";
import { HttpLockCarRepository } from "@/common/lock-car/api/lock-car.repo.impl";
import { ThankYouService } from "@/common/thank-you/domain/thank-you.service";
import { SidebarService } from "@/common/sidebar/domain/sidebar.service";
import { PaymentService } from "@/common/payment/domain/payment.service";
import { PaymentRepository } from "@/common/payment/api/payment.repo";
import { HttpPaymentRepository } from "@/common/payment/api/payment.repo.impl";
import { DroneMobileRepository } from "@/common/drone-mobile/api/drone-mobile.repo";
import { HttpDroneMobileRepository } from "@/common/drone-mobile/api/drone-mobile.repo.impl";
import { WSApi } from "@/infrastructure/api/wsapi";
import { DroneMobileService } from "@/common/drone-mobile/service/drone-mobile.service";
import { SocketsRepository } from "@/common/sockets/api/sockets.repo";
import { HttpSocketsRepository } from "@/common/sockets/api/sockets.repo.impl";
import { BaseSocketsService } from "@/common/sockets/domain/sockets.common.service";
import { SocketsService } from "@/common/sockets/domain/sockets.service";
import {
  APP_SERVICE,
  AUTH_REPOSITORY,
  AUTH_SERVICE,
  CAR_REPOSITORY,
  CAR_SERVICE,
  CARS_REPOSITORY,
  CARS_SERVICE,
  DRONE_MOBILE_REPOSITORY,
  DRONE_MOBILE_SERVICE,
  EXCEPTION_SERVICE,
  HISTORY,
  LOCK_CAR_REPOSITORY,
  LOCK_CAR_SERVICE,
  MEDIA_REPOSITORY,
  MEDIA_SERVICE,
  MY_RESERVATIONS_REPOSITORY,
  MY_RESERVATIONS_SERVICE,
  NOTIFICATION_SERVICE, NOTIFICATIONS_LIST_SERVICE,
  PAYMENT_REPOSITORY,
  PAYMENT_SERVICE,
  RESERVATION_REPOSITORY,
  RESERVATION_SERVICE,
  SESSION_USER_REPOSITORY,
  SESSION_USER_SERVICE,
  SIDEBAR_SERVICE,
  SOCKETS_REPOSITORY,
  SOCKETS_SERVICE,
  THANK_YOU_SERVICE,
  WS_API,
} from "@/common/injector/constants";
import { BaseNotificationsListService } from "@/admin/notifications-list/domain/notifications-list.common.service";
import { NotificationsListService } from "@/admin/notifications-list/domain/notifications-list.service";
/**
 * Proper way of injecting dependencies from injector for Repositories/Services/Public Contracts
 * ```
 * private get history() {
 *   return injector.get<History>(HISTORY);
 * }
 * ```
 *
 * Wrong way of injecting dependencies from injector for Repositories/Services/Public Contracts
 * ```
 * private history = injector.get<History>(HISTORY);
 * ```
 *
 * Proper way of injecting dependencies from injector for Components/Functions and others entities that not injected to injector
 * ```
 * const history = injector.get<History>(HISTORY);
 * ```
 */

injector.set<History>(HISTORY, createBrowserHistory());

injector.set<AppService>(APP_SERVICE, new AppService());

injector.set<AuthService>(AUTH_SERVICE, new AuthService());
injector.set<AuthRepository>(AUTH_REPOSITORY, new HttpAuthRepository());

injector.set<CarService>(CAR_SERVICE, new CarService());
injector.set<CarRepository>(CAR_REPOSITORY, new HttpCarRepository());

injector.set<CarsService>(CARS_SERVICE, new CarsService());
injector.set<CarsRepository>(CARS_REPOSITORY, new HttpCarsRepository());

injector.set<LockCarService>(LOCK_CAR_SERVICE, new LockCarService());
injector.set<LockCarRepository>(LOCK_CAR_REPOSITORY, new HttpLockCarRepository());

injector.set<ReservationService>(RESERVATION_SERVICE, new ReservationService());
injector.set<ReservationRepository>(RESERVATION_REPOSITORY, new HttpReservationRepository());

injector.set<MyReservationsRepository>(MY_RESERVATIONS_REPOSITORY, new HttpMyReservationsRepository());
injector.set<MyReservationsService>(MY_RESERVATIONS_SERVICE, new MyReservationsService());

injector.set<MediaRepository>(MEDIA_REPOSITORY, new HttpMediaRepository());
injector.set<MediaService>(MEDIA_SERVICE, new MediaService());

injector.set<SidebarService>(SIDEBAR_SERVICE, new SidebarService());

injector.set<ThankYouService>(THANK_YOU_SERVICE, new ThankYouService())

injector.set<DroneMobileRepository>(DRONE_MOBILE_REPOSITORY, new HttpDroneMobileRepository())
injector.set<DroneMobileService>(DRONE_MOBILE_SERVICE, new DroneMobileService())

injector.set<PaymentRepository>(PAYMENT_REPOSITORY, new HttpPaymentRepository())
injector.set<PaymentService>(PAYMENT_SERVICE, new PaymentService())

injector.set<SessionUserService>(
  SESSION_USER_SERVICE,
  new SessionUserService()
);
injector.set<SessionUserRepository>(
  SESSION_USER_REPOSITORY,
  new HttpSessionUserRepository()
);

injector.set<ExceptionService>(
  EXCEPTION_SERVICE,
  new ExceptionService(exceptionServiceData)
);

injector.set<NotificationService>(
  NOTIFICATION_SERVICE,
  new NotificationService()
);

injector.set<BaseSocketsService>(SOCKETS_SERVICE, new SocketsService());
injector.set<SocketsRepository>(SOCKETS_REPOSITORY, new HttpSocketsRepository());

injector.set<BaseNotificationsListService>(NOTIFICATIONS_LIST_SERVICE, new NotificationsListService());

injector.set<WSApi>(
  WS_API,
  new WSApi(`${process.env.REACT_APP_API_WS_URL}`, { reconnectOnClose: true })
);
