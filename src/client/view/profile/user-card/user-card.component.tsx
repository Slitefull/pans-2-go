import React, { FC, useState } from "react";
import { observer } from "mobx-react";
import { injector } from "@/common/injector/Injector";
import { SessionUserService } from "@/common/session-user/domain/session-user.service";
import { SESSION_USER_SERVICE, } from "@/common/injector/constants";
import {
  FilesDropzoneUploader,
  ImagePreview,
} from "@/ui-kit/components/files-dropzone-uploader/files-dropzone-uploader.component";
import { onCreateImageHTTP } from "@/common/helpers/onCreateMediaHTTP.helper";
import { useTranslation } from "react-i18next";

import "./user-card.styles.scss";


const MAX_FILE_SIZE = 1024 * 1024 * 10;

const UserCard: FC = observer((): JSX.Element => {
  const { t } = useTranslation();

  const sessionUserService: SessionUserService = injector.get(SESSION_USER_SERVICE);

  const [newBackgroundImage, setBackgroundImage] = useState<File | string>();
  const avatar = sessionUserService.media?.imageUrl;

  const removeBackgroundImage = () => {
    if (sessionUserService.media?.id) {
      sessionUserService.deleteUserAvatar(sessionUserService.media.id)
    }
    setBackgroundImage(undefined);
  }

  const backgroundImageHandler = (acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];
    onCreateImageHTTP({
      file,
      onCreateMediaHandler: sessionUserService.createProfileImage.bind(sessionUserService),
    })
    setBackgroundImage(acceptedFiles[0]);
  };

  return (
    <div className="user-card">
      <div className="user-card__header">
        <p className="text">
          {t("client.profileImage")}
        </p>
        <div className="user-card__status">
          {sessionUserService.isActive ? t("client.active") : t("client.notActive")}
        </div>
      </div>
      {newBackgroundImage || avatar ? (
        <ImagePreview
          image={newBackgroundImage || `https://wheels2go-dev.s3.us-west-2.amazonaws.com/${avatar}`}
          onRemove={removeBackgroundImage}
        />
      ) : (
        <FilesDropzoneUploader
          options={{
            onDrop: backgroundImageHandler,
            maxSize: MAX_FILE_SIZE,
            maxFiles: 1,
            accept: 'image/jpeg, image/png, image/jpg',
          }}
          style={{ margin: 'auto', width: '100%' }}
        />
      )}
      <p className="user-card__name">
        {`${sessionUserService.firstName} ${sessionUserService.lastName}`}
      </p>
      {sessionUserService.mobilePhone &&
        <p className="user-card__text">
          {sessionUserService.mobilePhone}
        </p>
      }
      {sessionUserService.email &&
        <p className="user-card__text">
          {sessionUserService.email}
        </p>
      }
      {sessionUserService.whatsAppPhone &&
        <p className="user-card__text">
          {sessionUserService.whatsAppPhone}
        </p>
      }

      {sessionUserService.address &&
        <p className="user-card__text">
          {sessionUserService.address}
        </p>
      }
      {sessionUserService.state &&
        <p className="user-card__text">
          State: {sessionUserService.state}
        </p>
      }
      {sessionUserService.zip &&
        <p className="user-card__text">
          ZIP: {sessionUserService.zip}
        </p>
      }
    </div>
  );
});

export default UserCard;
