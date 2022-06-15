import React, { FC } from "react";
import { observer } from "mobx-react";
import { injector } from "@/common/injector/Injector";
import { SessionUserService } from "@/common/session-user/domain/session-user.service";
import { SESSION_USER_SERVICE, } from "@/common/injector/constants";

import "./user-card.styles.scss";


const UserCard: FC = observer((): JSX.Element => {
  const sessionUserService: SessionUserService = injector.get(SESSION_USER_SERVICE);

  return (
    <div className="user-card">
      <p className="user-card__name">
        {`${sessionUserService.firstName} ${sessionUserService.lastName}`}
      </p>
      <p className="user-card__text">
        {sessionUserService.mobilePhone}
      </p>
      <p className="user-card__text">
        {sessionUserService.email}
      </p>
    </div>
  );
});

export default UserCard;
