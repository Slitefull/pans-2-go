import React, { FC, useCallback, useRef, useState } from 'react';
import SettingsMenuIcon from "@/ui-kit/customized-icons/settings/settings-menu.component";
import SettingsMenuCloseIcon from "@/ui-kit/customized-icons/settings/settings-menu-close.component";
import { Link } from "react-router-dom";
import { LOGIN_PAGE, MY_RESERVATIONS_PAGE, PROFILE_PAGE, RESERVE_NOW_PAGE, ROOT_PAGE } from "@/common/constants/routes";
import { SessionUserService } from "@/common/session-user/domain/session-user.service";
import { injector } from "@/common/injector/Injector";
import { APP_SERVICE, AUTH_SERVICE, SESSION_USER_SERVICE } from "@/common/injector/constants";
import { AuthService } from "@/common/auth/domain/auth.service";
import { useTranslation } from "react-i18next";
import { useOutsideClick } from "@/ui-kit/hooks/use-outsid-click";
import { AppService } from "@/common/app/domain/app.service";
import LogoMobileIcon from "@/ui-kit/customized-icons/logo/logo-mobile.component";
import ArrowBackIcon from "@/ui-kit/customized-icons/arrow/arrow-back.component";
import getPageTitle from "@/common/helpers/getPageTitle.helper";

import '../user-header.styles.scss';


interface MenuItem {
  link: string;
  text: string;
}

const UserMenu: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const authService: AuthService = injector.get(AUTH_SERVICE);
  const appService: AppService = injector.get(APP_SERVICE);
  const sessionUserService: SessionUserService = injector.get(SESSION_USER_SERVICE);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const url = window.location.pathname;
  const isPromoPage = url === ROOT_PAGE;

  const toggleClassMenu = (): void => setIsOpen(!isOpen);

  const onBackLinkHandler = useCallback(() => {
    appService.redirectTo(ROOT_PAGE);
  }, [])

  useOutsideClick(ref, () => setIsOpen(false))

  const onLogoutHandler = useCallback(() => {
    authService.logout(LOGIN_PAGE);
  }, [authService])

  const menu: Array<MenuItem> = [
    {
      link: ROOT_PAGE,
      text: "auth.settings.promo",
    },
    {
      link: RESERVE_NOW_PAGE,
      text: "auth.settings.reserveACar",
    },
    {
      link: MY_RESERVATIONS_PAGE,
      text: "auth.settings.reservationList",
    },
    {
      link: PROFILE_PAGE,
      text: "auth.settings.myProfile",
    }
  ]

  return (
    <div className="settings-wrapper" ref={ref}>
      <p className="settings-wrapper__text hide-for-mobile">
        {`${sessionUserService.firstName} ${sessionUserService.lastName}`}
      </p>
      <div className="settings-wrapper__link settings-menu-container">
        <div className="link-wrapper">
          {!isPromoPage && (
            <div className="link-arrow show-for-mobile">
              <ArrowBackIcon onClickHandler={onBackLinkHandler} color="#000000" size={20}/>
              <p className="link-arrow__text">
                {t(getPageTitle(url))}
              </p>
            </div>
          )}
          <SettingsMenuIcon onClickHandler={toggleClassMenu} color="#FFFFFF"/>
        </div>

        <div className={`settings-menu ${isOpen ? "show" : ""}`}>
          <div className='header-for-mobile'>
            <LogoMobileIcon/>
            <SettingsMenuCloseIcon onClickHandler={toggleClassMenu} color="#333333"/>
          </div>
          <p className="settings-wrapper__text name-for-mobile">
            {`${sessionUserService.firstName} ${sessionUserService.lastName}`}
          </p>

          {menu.map((element, index) => (
            <Link
              key={index}
              to={element.link}
              className="link"
            >
              {t(element.text)}
            </Link>
          ))}

          <div onClick={onLogoutHandler}>
            <Link
              to={LOGIN_PAGE}
              className="link"
            >
              {t("auth.settings.logOut")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
