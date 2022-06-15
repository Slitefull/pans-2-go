import React, { lazy } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { AUTH_SERVICE, HISTORY } from "@/common/injector/constants";
import { History } from "history";
import { observer } from "mobx-react";
import { injector } from "@/common/injector/Injector";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  ADD_NEW_CUSTOMER,
  CARS_PAGE,
  CUSTOMER_PAGE,
  CUSTOMERS_PAGE,
  EDIT_CAR_PAGE,
  LOGIN_PAGE,
  NEW_CAR_PAGE,
  NEW_RESERVATION,
  PROFILE_PAGE,
  RESERVATION_PAGE,
  RESERVATIONS_PAGE,
  RESTORE_PASSWORD_PAGE,
  ROOT_PAGE,
  THANK_YOU_PAGE,
} from "@/common/constants/routes";
import { AuthService } from "@/common/auth/domain/auth.service";


const LazyAuthRouter = lazy(
  () => import("@/common/auth/view/auth.component")
);

const LazyRestorePasswordRouter = lazy(
  () =>
    import(
      "@/common/auth/view/restore-password/restore-password/restore-password.component"
      )
);

const LazyDashboardRouter = lazy(
  () => import("@/admin/dashboard/view/dashboard.component")
);

const LazyProfileRouter = lazy(
  () => import("@/admin/profile/view/profile.component")
);

const LazyCustomerRouter = lazy(
  () => import("@/admin/customer/view/customer.component")
);

const LazyReservationsRouter = lazy(
  () => import("@/admin/reservations/view/reservations.component")
);

const LazyReservationRouter = lazy(
  () => import("@/admin/reservation/view/reservation.component")
);

const LazyCarsRouter = lazy(
  () => import("@/admin/cars/view/cars.component")
);

const LazyNewCarRouter = lazy(
  () => import("@/admin/new-car/view/new-car.component")
);

const LazyEditCarRouter = lazy(
  () => import("@/admin/edit-car/view/edit-car.component")
);

const LazyThankYouPageRouter = lazy(() => import("@/common/thank-you/view/thank-you.component"));

const LazyCustomersRouter = lazy(() => import("@/admin/customers/view/customers.component"));

const LazyCreateCustomerRouter = lazy(() => import("@/admin/add-new-customer/view/add-new-customer.component"));

const LazyCreateReservationRouter = lazy(() => import("@/admin/create-reservation/view/create-reservation.component"));

export const RootAdminRouter = observer(() => {
  const authService: AuthService = injector.get(AUTH_SERVICE);
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PRIVATE_KEY!);

  return (
    <Router history={injector.get<History>(HISTORY)}>
      <Elements stripe={stripePromise}>
        <Switch>
          {!authService.isAuthenticated && (
            <>
              <Route path={LOGIN_PAGE} component={LazyAuthRouter}/>
              <Route path={RESTORE_PASSWORD_PAGE} component={LazyRestorePasswordRouter}/>
            </>
          )}
          <Route path={RESTORE_PASSWORD_PAGE} component={LazyRestorePasswordRouter}/>
          <Route path={ROOT_PAGE} component={LazyDashboardRouter} exact/>
          <Route path={PROFILE_PAGE} component={LazyProfileRouter}/>
          <Route path={CUSTOMER_PAGE} component={LazyCustomerRouter}/>
          <Route path={RESERVATIONS_PAGE} component={LazyReservationsRouter}/>
          <Route path={RESERVATION_PAGE} component={LazyReservationRouter}/>
          <Route path={NEW_RESERVATION} component={LazyCreateReservationRouter}/>
          <Route path={CARS_PAGE} component={LazyCarsRouter}/>
          <Route path={NEW_CAR_PAGE} component={LazyNewCarRouter}/>
          <Route path={EDIT_CAR_PAGE} component={LazyEditCarRouter}/>
          <Route path={CUSTOMERS_PAGE} component={LazyCustomersRouter}/>
          <Route path={ADD_NEW_CUSTOMER} component={LazyCreateCustomerRouter}/>
          <Route path={THANK_YOU_PAGE} component={LazyThankYouPageRouter}/>
        </Switch>
      </Elements>
    </Router>
  )
});
