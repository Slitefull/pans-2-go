import {
  LOGIN_PAGE,
  MY_RESERVATIONS_PAGE,
  PROFILE_PAGE,
  REGISTRATION_PAGE,
  RESERVE_NOW_PAGE,
  RESTORE_PASSWORD_PAGE,
  ROOT_PAGE
} from "@/common/constants/routes";


const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case ROOT_PAGE: {
      return "pages.promo";
    }

    case LOGIN_PAGE: {
      return "pages.login";
    }

    case REGISTRATION_PAGE: {
      return "pages.registration";
    }

    case RESTORE_PASSWORD_PAGE: {
      return "pages.restorePassword";
    }

    case PROFILE_PAGE: {
      return "pages.profile";
    }

    case RESERVE_NOW_PAGE: {
      return "pages.reserveNow";
    }

    case MY_RESERVATIONS_PAGE: {
      return "pages.reservationList";
    }

    default: {
      return "pages.promo";
    }
  }
}

export default getPageTitle;
