import React, { FC } from "react";
import { observer } from "mobx-react";
import { injector } from "@/common/injector/Injector";
import { RESERVATION_SERVICE, } from "@/common/injector/constants";
import { ImagePreview, } from "@/ui-kit/components/files-dropzone-uploader/files-dropzone-uploader.component";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import ProfileIcon from "@/ui-kit/components/profile-icon/profile-icon.component";

import "./customer-card.styles.scss";


const CustomerCard: FC = observer((): JSX.Element => {
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);

  const user = reservationService.user;
  const avatar = user?.media?.imageUrl;

  return (
    <div className="customer-card">
      <div className="customer-card__header">
        <div className="customer-card__title">Profile image</div>
        <div className="customer-card__status">Active</div>
      </div>
      {avatar ? (
        <ImagePreview
          image={`https://wheels2go-dev.s3.us-west-2.amazonaws.com/${avatar}`}
        />
      ) : (
        <div className="customer-card__avatar">
          <div className="customer-card__avatar_icon">
            <ProfileIcon color="gray" size={20}/>
          </div>
        </div>
      )}
      <p className="customer-card__name">
        {`${user.firstName} ${user.lastName}`}
      </p>
      <div className="customer-card__phones">{user.mobilePhone}</div>
      <p className="customer-card__email">{user.email}</p>
      {user.emergencyPhone ? <div className="customer-card__phones">{user.emergencyPhone}</div> : ''}
      {user.whatsAppPhone ? <div className="customer-card__phones">{user.whatsAppPhone}</div> : ''}
      {user.address ? <p className="customer-card__rows">{user.address}</p> : ''}
      <p className="customer-card__rows">State: {user.state}</p>
      <p className="customer-card__rows">ZIP: {user.zip}</p>
    </div>
  );
});

export default CustomerCard;
