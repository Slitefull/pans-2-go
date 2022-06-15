import React, { lazy } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { History } from "history";
import { observer } from "mobx-react";
import { injector } from "@/common/injector/Injector";
import { AUTH_SERVICE, HISTORY } from "@/common/injector/constants";
import {
  LOCK_CAR_PAGE,
  LOGIN_PAGE,
  MY_RESERVATIONS_PAGE,
  PROFILE_PAGE,
  REGISTRATION_PAGE,
  RESERVE_NOW_PAGE,
  RESTORE_PASSWORD_PAGE,
  ROOT_PAGE,
  THANK_YOU_PAGE,
  UNLOCK_CAR_PAGE,
} from "@/common/constants/routes";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AuthService } from "@/common/auth/domain/auth.service";


const LazyPromoRouter = lazy(
  () => import("@/client/view/promo/promo.component")
);

const LazyAuthRouter = lazy(
  () => import("@/common/auth/view/auth.component")
);

const LazyProfileRouter = lazy(
  () => import("@/client/view/profile/profile.component")
);

const LazyRegistrationRouter = lazy(
  () => import("@/common/auth/view/register/register.component")
);

const LazyRestorePasswordRouter = lazy(
  () => import("@/common/auth/view/restore-password/restore-password/restore-password.component")
);

const LazyReserveNowRouter = lazy(
  () => import("@/client/view/reserve-now/reserve-now.component")
);

const LazyMyReservationsRouter = lazy(
  () => import("@/client/view/my-reservations/my-reservations.component")
);

const LazyLockCarRouter = lazy(
  () => import("@/client/view/lock-car/lock-car.component")
);

const LazyUnlockCarRouter = lazy(
  () => import("@/client/view/unlock-car/unlock-car.component")
);

const LazyThankYouPageRouter = lazy(
  () => import("@/common/thank-you/view/thank-you.component")
);

export const RootCustomerRouter = observer(() => {
  const authService: AuthService = injector.get(AUTH_SERVICE);
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PRIVATE_KEY!);

  return (
    <Router history={injector.get<History>(HISTORY)}>
      <Elements stripe={stripePromise}>
        <Switch>
          {!authService.isAuthenticated && (
            <>
              <Route path={ROOT_PAGE} component={LazyPromoRouter} exact/>
              <Route path={LOGIN_PAGE} component={LazyAuthRouter}/>
              <Route path={REGISTRATION_PAGE} component={LazyRegistrationRouter}/>
              <Route path={RESTORE_PASSWORD_PAGE} component={LazyRestorePasswordRouter}/>
              <Route path={RESERVE_NOW_PAGE} component={LazyReserveNowRouter}/>
            </>
          )}
          <Route path={RESTORE_PASSWORD_PAGE} component={LazyRestorePasswordRouter}/>
          <Route path={RESERVE_NOW_PAGE} component={LazyReserveNowRouter}/>
          <Route path={ROOT_PAGE} component={LazyPromoRouter} exact/>
          <Route path={PROFILE_PAGE} component={LazyProfileRouter}/>
          <Route path={MY_RESERVATIONS_PAGE} component={LazyMyReservationsRouter}/>
          <Route path={LOCK_CAR_PAGE} component={LazyLockCarRouter}/>
          <Route path={UNLOCK_CAR_PAGE} component={LazyUnlockCarRouter}/>
          <Route path={THANK_YOU_PAGE} component={LazyThankYouPageRouter}/>
        </Switch>
      </Elements>
    </Router>
  )
});
