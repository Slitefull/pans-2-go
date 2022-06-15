import React, { FC } from "react";
import { observer } from "mobx-react";
import PersonalDetailsForm from "./personal-details/personal-details.component";
import ChangePasswordForm from "./change-password/change-password.component";
import UserCard from "@/admin/profile/view/user-card/user-card.component";
import PageWrapper from "@/ui-kit/components/page-wrapper/page-wrapper.component";

import "./profile.styles.scss";


const Profile: FC = observer((): JSX.Element => {
  return (
    <PageWrapper title="My Account" withSidebar>
      <div className="profile-form">
        <UserCard/>
        <div className="profile-form__form">
          <PersonalDetailsForm/>
          <ChangePasswordForm/>
        </div>
      </div>
    </PageWrapper>
  );
});

export default Profile;
