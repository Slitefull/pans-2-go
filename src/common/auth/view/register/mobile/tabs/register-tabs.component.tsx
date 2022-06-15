import React, { FC, ReactElement } from "react";
import { observer } from "mobx-react";
import { AuthService } from "@/common/auth/domain/auth.service";
import { injector } from "@/common/injector/Injector";
import { AUTH_SERVICE } from "@/common/injector/constants";
import RegisterTabTitle from "./tab-title/register-tab-title.component";

import "./register-tabs.styles.scss";


interface TabsProps {
  children: ReactElement[];
}

const RegisterTabs: FC<TabsProps> = observer(({ children }): JSX.Element => {
  const authService: AuthService = injector.get(AUTH_SERVICE);
  const openedTab = authService.openedMobileTab;

  return (
    <div className="tabs-pane">
      <div className="tabs-pane-header">
        {children.map((item, index) => (
          <RegisterTabTitle
            key={index}
            title={item.props.title}
            index={index}
            isActive={openedTab === index}
          />
        ))}
      </div>
      <div className="tabs-pane__content">
        {children[openedTab]}
      </div>
    </div>
  )
})

export default RegisterTabs;
