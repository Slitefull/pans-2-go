import React, { FC, useCallback } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { CustomerService } from "@/admin/customer/domain/customer.service";
import { injector } from "@/common/injector/Injector";
import { CUSTOMER_SERVICE } from "@/common/injector/constants";
import { createImageUrl } from "@/common/helpers/createImageUrl.helper";
import { CustomerImagePreview } from "../image-preview/image-preview.component";
import defaultImage from "../../../../../ui-kit/icons/default-avatar.svg";

import "./user-card.styles.scss";


const UserCard: FC = observer((): JSX.Element => {
  const { t } = useTranslation();
  const customerService: CustomerService = injector.get(CUSTOMER_SERVICE);
  const userAvatar = customerService.selectedCustomer?.media;

  const getProfileImage = (): string => {
    if (userAvatar) return createImageUrl(userAvatar.imageUrl);
    return defaultImage;
  }

  const onRemoveHandler = useCallback(() => {
    customerService.deleteCustomerProfilePhoto(customerService.selectedCustomer!.id, userAvatar!.id)
  }, [customerService])

  return (
    <div className="user-card">
      <div className="user-card__header">
        <p className="text">
          {t("client.profileImage")}
        </p>
        <div className="user-card__status">
          {customerService.selectedCustomer?.isActive ? 'Active' : 'Not Active'}
        </div>
      </div>
      <CustomerImagePreview
        image={getProfileImage()}
        onRemove={onRemoveHandler}
        isShowRemoveButton={!!userAvatar?.imageUrl}
      />
      <p className="user-card__name">
        {`${customerService.selectedCustomer?.firstName} ${customerService.selectedCustomer?.lastName}`}
      </p>
      {customerService.selectedCustomer?.mobilePhone &&
        <p className="user-card__text">
          {customerService.selectedCustomer?.mobilePhone}
        </p>
      }
      {customerService.selectedCustomer?.email &&
        <p className="user-card__text">
          {customerService.selectedCustomer?.email}
        </p>
      }
      {customerService.selectedCustomer?.whatsAppPhone &&
        <p className="user-card__text">
          {customerService.selectedCustomer?.whatsAppPhone}
        </p>
      }

      {customerService.selectedCustomer?.address &&
        <p className="user-card__text">
          {customerService.selectedCustomer?.address}
        </p>
      }
      {customerService.selectedCustomer?.state &&
        <p className="user-card__text">
          State: {customerService.selectedCustomer?.state}
        </p>
      }
      {customerService.selectedCustomer?.zip &&
        <p className="user-card__text">
          ZIP: {customerService.selectedCustomer?.zip}
        </p>
      }
    </div>
  );
});

export default UserCard;
