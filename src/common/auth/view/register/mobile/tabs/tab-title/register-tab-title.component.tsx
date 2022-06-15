import React, { useCallback } from "react"
import { injector } from "@/common/injector/Injector";
import { AUTH_SERVICE } from "@/common/injector/constants";
import { AuthService } from "@/common/auth/domain/auth.service";
import { observer } from "mobx-react";


type TabTitleProps = {
  title: string
  index: number
  isActive: boolean,
}

const RegisterTabTitle: React.FC<TabTitleProps> = observer(({ title, index, isActive }) => {
  const authService: AuthService = injector.get(AUTH_SERVICE);

  const onClickHandler = useCallback(() => {
    authService.openedMobileTab = index;
  }, [authService, index])

  return (
    <div
      className={`tabs-pane-header__element ${isActive ? "active" : ""}`}
      onClick={onClickHandler}
    >
      {title}
    </div>
  )
})

export default RegisterTabTitle
