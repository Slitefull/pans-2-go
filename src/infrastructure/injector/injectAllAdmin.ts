import { createBrowserHistory, History } from "history";
import { injector } from "@/common/injector/Injector";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { ExceptionService } from "@/infrastructure/exception/exception.service";
import { SessionUserService } from "@/common/session-user/domain/session-user.service";
import { AuthRepository } from "@/common/auth/api/auth.repo";
import { AuthService } from "@/common/auth/domain/auth.service";
import { HttpAuthRepository } from "@/common/auth/api/auth.repo.impl";
import exceptionServiceData from "@/infrastructure/exception/data/default-behavior";
import { AppService } from "@/common/app/domain/app.service";
import { CarService } from "@/common/car/domain/car.service";
import { HttpCarRepository } from "@/common/car/api/car.repo.impl";
import { CarRepository } from "@/common/car/api/car.repo";
import { CarsService } from "@/admin/cars/domain/cars.service";
import { CarsRepository } from "@/admin/cars/api/cars.repo";
import { HttpCarsRepository } from "@/admin/cars/api/cars.repo.impl";
import { MediaRepository } from "@/common/media/api/media.repo";
import { HttpMediaRepository } from "@/common/media/api/media.repo.impl";
import { MediaService } from "@/common/media/domain/media.service";
import { SessionUserRepository } from "@/common/session-user/api/session-user.repo";
import { HttpSessionUserRepository } from "@/common/session-user/api/session-user.repo.impl";
import { NewCarService } from "@/admin/new-car/domain/new-car.service";
import { NewCarRepository } from "@/admin/new-car/api/new-car.repo";
import { HttpNewCarRepository } from "@/admin/new-car/api/new-car.repo.impl";
import { ReservationsService } from "@/admin/reservations/domain/reservations.service";
import { ReservationsRepository } from "@/admin/reservations/api/reservations.repo";
import { HttpReservationsRepository } from "@/admin/reservations/api/reservations.repo.impl";
import { ThankYouService } from "@/common/thank-you/domain/thank-you.service";
import { SidebarService } from "@/common/sidebar/domain/sidebar.service";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { ReservationRepository } from "@/common/reservation/api/reservation.repo";
import { HttpReservationRepository } from "@/common/reservation/api/reservation.repo.impl";
import { PaymentRepository } from "@/common/payment/api/payment.repo";
import { HttpPaymentRepository } from "@/common/payment/api/payment.repo.impl";
import { PaymentService } from "@/common/payment/domain/payment.service";
import { EditCarService } from "@/admin/edit-car/domain/edit-car.service";
import { DroneMobileRepository } from "@/common/drone-mobile/api/drone-mobile.repo";
import { HttpDroneMobileRepository } from "@/common/drone-mobile/api/drone-mobile.repo.impl";
import { CustomersService } from "@/admin/customers/domain/customers.service";
import { HttpCustomersRepository } from "@/admin/customers/api/customers.repo.impl";
import { CustomersRepository } from "@/admin/customers/api/customers.repo";
import { EditCarRepository } from "@/admin/edit-car/api/edit-car.repo";
import { HttpEditCarRepository } from "@/admin/edit-car/api/edit-car.repo.impl";
import { AddNewCustomerService } from "@/admin/add-new-customer/domain/add-new-customer.service";
import { HttpAddNewCustomerRepository } from "@/admin/add-new-customer/api/add-new-customer.repo.impl";
import { AddNewCustomerRepository } from "@/admin/add-new-customer/api/add-new-customer.repo";
import { CustomerService } from "@/admin/customer/domain/customer.service";
import { CustomerRepository } from "@/admin/customer/api/customer.repo";
import { HttpCustomerRepository } from "@/admin/customer/api/customer.repo.impl";
import { HttpNewReservationByAdminRepository } from "@/admin/create-reservation/api/create-reservation.repo.impl";
import { NewReservationByAdminService } from "@/admin/create-reservation/domain/create-reservation.service";
import { DashboardService } from "@/admin/dashboard/domain/dashboard.service";
import { DashboardRepository } from "@/admin/dashboard/api/dashboard.repo";
import { HttpDashboardRepository } from "@/admin/dashboard/api/dashboard.repo.impl";
import { WSApi } from "@/infrastructure/api/wsapi";
import { SocketsRepository } from "@/common/sockets/api/sockets.repo";
import { HttpSocketsRepository } from "@/common/sockets/api/sockets.repo.impl";
import { BaseSocketsService } from "@/common/sockets/domain/sockets.common.service";
import { SocketsService } from "@/common/sockets/domain/sockets.service";
import { BaseNotificationsListService } from "@/admin/notifications-list/domain/notifications-list.common.service";
import { NotificationsListService } from "@/admin/notifications-list/domain/notifications-list.service";
import { HttpNotificationsListRepository } from "@/admin/notifications-list/api/notifications-list.repo.impl";
import { NotificationsListRepository } from "@/admin/notifications-list/api/notifications-list.repo";
import {
  ADD_NEW_CUSTOMER_REPOSITORY,
  ADD_NEW_CUSTOMER_SERVICE,
  ADD_NEW_RESERVATION_BY_ADMIN_REPOSITORY,
  ADD_NEW_RESERVATION_BY_ADMIN_SERVICE,
  APP_SERVICE,
  AUTH_REPOSITORY,
  AUTH_SERVICE,
  CAR_REPOSITORY,
  CAR_SERVICE,
  CARS_REPOSITORY,
  CARS_SERVICE,
  CUSTOMER_REPOSITORY,
  CUSTOMER_SERVICE,
  CUSTOMERS_REPOSITORY,
  CUSTOMERS_SERVICE,
  DASHBOARD_REPOSITORY,
  DASHBOARD_SERVICE,
  DRONE_MOBILE_REPOSITORY,
  EDIT_CAR_REPOSITORY,
  EDIT_CAR_SERVICE,
  EXCEPTION_SERVICE,
  HISTORY,
  MEDIA_REPOSITORY,
  MEDIA_SERVICE,
  NEW_CAR_REPOSITORY,
  NEW_CAR_SERVICE,
  NOTIFICATION_SERVICE,
  NOTIFICATIONS_LIST_REPOSITORY,
  NOTIFICATIONS_LIST_SERVICE,
  PAYMENT_REPOSITORY,
  PAYMENT_SERVICE,
  RESERVATION_REPOSITORY,
  RESERVATION_SERVICE,
  RESERVATIONS_REPOSITORY,
  RESERVATIONS_SERVICE,
  SESSION_USER_REPOSITORY,
  SESSION_USER_SERVICE,
  SIDEBAR_SERVICE,
  SOCKETS_REPOSITORY,
  SOCKETS_SERVICE,
  THANK_YOU_SERVICE,
  WS_API,
} from "@/common/injector/constants";


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

injector.set<AuthRepository>(AUTH_REPOSITORY, new HttpAuthRepository());

injector.set<AuthService>(AUTH_SERVICE, new AuthService());

injector.set<EditCarService>(EDIT_CAR_SERVICE, new EditCarService());
injector.set<EditCarRepository>(EDIT_CAR_REPOSITORY, new HttpEditCarRepository());

injector.set<CarService>(CAR_SERVICE, new CarService());
injector.set<CarRepository>(CAR_REPOSITORY, new HttpCarRepository());

injector.set<NewCarService>(NEW_CAR_SERVICE, new NewCarService());
injector.set<NewCarRepository>(NEW_CAR_REPOSITORY, new HttpNewCarRepository());

injector.set<EditCarService>(EDIT_CAR_SERVICE, new EditCarService());

injector.set<CarsService>(CARS_SERVICE, new CarsService());
injector.set<CarsRepository>(CARS_REPOSITORY, new HttpCarsRepository());

injector.set<AppService>(APP_SERVICE, new AppService());

injector.set<ReservationService>(RESERVATION_SERVICE, new ReservationService());
injector.set<ReservationRepository>(RESERVATION_REPOSITORY, new HttpReservationRepository());

injector.set<NewReservationByAdminService>(ADD_NEW_RESERVATION_BY_ADMIN_SERVICE, new NewReservationByAdminService());
injector.set<HttpNewReservationByAdminRepository>(ADD_NEW_RESERVATION_BY_ADMIN_REPOSITORY, new HttpNewReservationByAdminRepository());

injector.set<ReservationsService>(RESERVATIONS_SERVICE, new ReservationsService());
injector.set<ReservationsRepository>(RESERVATIONS_REPOSITORY, new HttpReservationsRepository());

injector.set<CustomerService>(CUSTOMER_SERVICE, new CustomerService());
injector.set<CustomerRepository>(CUSTOMER_REPOSITORY, new HttpCustomerRepository());

injector.set<CustomersService>(CUSTOMERS_SERVICE, new CustomersService());
injector.set<CustomersRepository>(CUSTOMERS_REPOSITORY, new HttpCustomersRepository());

injector.set<AddNewCustomerService>(ADD_NEW_CUSTOMER_SERVICE, new AddNewCustomerService());
injector.set<AddNewCustomerRepository>(ADD_NEW_CUSTOMER_REPOSITORY, new HttpAddNewCustomerRepository());

injector.set<MediaRepository>(MEDIA_REPOSITORY, new HttpMediaRepository());
injector.set<MediaService>(MEDIA_SERVICE, new MediaService());

injector.set<DashboardRepository>(DASHBOARD_REPOSITORY, new HttpDashboardRepository())
injector.set<DashboardService>(DASHBOARD_SERVICE, new DashboardService())

injector.set<ThankYouService>(THANK_YOU_SERVICE, new ThankYouService())

injector.set<PaymentRepository>(PAYMENT_REPOSITORY, new HttpPaymentRepository())
injector.set<PaymentService>(PAYMENT_SERVICE, new PaymentService())

injector.set<DroneMobileRepository>(DRONE_MOBILE_REPOSITORY, new HttpDroneMobileRepository())

injector.set<SidebarService>(SIDEBAR_SERVICE, new SidebarService());

injector.set<SessionUserService>(SESSION_USER_SERVICE, new SessionUserService());
injector.set<SessionUserRepository>(SESSION_USER_REPOSITORY, new HttpSessionUserRepository());

injector.set<NotificationService>(
  NOTIFICATION_SERVICE,
  new NotificationService()
);

injector.set<ExceptionService>(
  EXCEPTION_SERVICE,
  new ExceptionService(exceptionServiceData)
);

injector.set<BaseSocketsService>(SOCKETS_SERVICE, new SocketsService());
injector.set<SocketsRepository>(SOCKETS_REPOSITORY, new HttpSocketsRepository());

injector.set<BaseNotificationsListService>(NOTIFICATIONS_LIST_SERVICE, new NotificationsListService());
injector.set<NotificationsListRepository>(NOTIFICATIONS_LIST_REPOSITORY, new HttpNotificationsListRepository());

injector.set<WSApi>(
  WS_API,
  new WSApi(`${process.env.REACT_APP_API_WS_URL}`, { reconnectOnClose: true })
);
