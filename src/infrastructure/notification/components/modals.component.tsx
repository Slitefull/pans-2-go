import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";

import { Modal } from "@/ui-kit/components/modal/modal.component";
import {
  ModalAppearance,
  ModalType,
} from "@/infrastructure/notification/notification.repo";

import "./modals.styles.scss";
import { injector } from "@/common/injector/Injector";
import { NotificationService } from "../notification.service";

const getTittleFromAppearanceForAlert = (appearance?: ModalAppearance) => {
  switch (appearance) {
    case "info":
      return "notification.info";

    case "success":
      return "notification.success";

    case "error":
      return "notification.error";

    default:
      return "notification.alert";
  }
};

const getTittleFromAppearanceForConfirm = (appearance?: ModalAppearance) => {
  switch (appearance) {
    case "info":
      return "notification.info";

    case "success":
      return "notification.success";

    case "error":
      return "notification.error";

    default:
      return "notification.confirm";
  }
};

export const Modals: FC = observer(() => {
  const { t } = useTranslation();
  const [animationStatus, setAnimationStatus] = useState(false);
  const notificationService = injector.get<NotificationService>(
    "NOTIFICATION_SERVICE"
  );

  const { modal } = notificationService;

  useEffect(() => {
    if (modal) {
      setTimeout(setAnimationStatus, 0, true);
    } else {
      setAnimationStatus(false);
    }
  }, [modal]);

  switch (modal?.type) {
    case ModalType.ALERT:
      return (
        <Modal
          visible={animationStatus}
          header={{
            label:
              modal.title || getTittleFromAppearanceForAlert(modal.appearance),
            appearance: modal.appearance,
          }}
          onClose={notificationService.removeFirstModal}
          footer={{
            right: [
              {
                children: t("notification.ok"),
                onClick: notificationService.removeFirstModal,
              },
            ],
          }}
        >
          <span className="modals__text">{t(modal.text)}</span>
        </Modal>
      );

    case ModalType.CONFIRM:
      const close = () => {
        if (modal?.type === ModalType.CONFIRM) {
          modal.onClose();
          notificationService.removeFirstModal();
        }
      };

      return (
        <Modal
          visible={animationStatus}
          header={{
            label:
              modal.title ||
              getTittleFromAppearanceForConfirm(modal.appearance),
            appearance: modal.appearance,
          }}
          onClose={close}
          footer={{
            right: modal.resultOptions.map((resultOption) => ({
              children: t(resultOption.label),
              outline: resultOption.type === "outline",
              onClick: () => {
                if (modal?.type === ModalType.CONFIRM) {
                  modal.onResult(resultOption.value);
                  notificationService.removeFirstModal();
                }
              },
            })),
          }}
        >
          <span className="modals__text">{t(modal.text)}</span>
        </Modal>
      );

    default:
      return null;
  }
});
