import React, { FC, ReactNode, useCallback } from "react";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";

import { Button, ButtonProps, HeadlessButton, } from "../button/button.component";
import { Icon } from "../icon/icon.component";
import { getCssTransitionClassNames } from "@/ui-kit/helpers/get-css-transition-class-names";
import { stopPropagation } from "@/ui-kit/hooks/use-outsid-click";

import "./modal.styles.scss";


export type HeaderAppearance = "success" | "info" | "error";

export interface ModalProps {
  modalClassName?: string;
  closeOnOverlayClick?: boolean;
  header: {
    label: string;
    appearance?: HeaderAppearance;
  };
  onClose: () => void;
  onBack?: () => void;
  footer: Footer;
  visible: boolean;
  children: ReactNode;
}

type FooterFragment = Array<ButtonProps | ReactNode>;

type Footer =
  | {
  left: FooterFragment;
  right?: FooterFragment;
}
  | {
  left?: FooterFragment;
  right: FooterFragment;
};

const getModalIconNameFromType = (headerType: HeaderAppearance): string => {
  switch (headerType) {
    case "success":
      return "check_circle";

    case "info":
      return "info";

    case "error":
      return "error";
    default:
      return "";
  }
};

const getModalHeaderClassFromType = (
  headerType?: HeaderAppearance
): string | undefined => {
  switch (headerType) {
    case "success":
      return "modal__header_success";

    case "info":
      return "modal__header_info";

    case "error":
      return "modal__header_error";
    default:
      return "";
  }
};

const getModalHeaderLabelClassFromType = (
  headerType?: HeaderAppearance
): string | undefined => {
  switch (headerType) {
    case "success":
      return "modal__headerLabel_success";

    case "info":
      return "modal__headerLabel_info";

    case "error":
      return "modal__headerLabel_error";
    default:
      return "";
  }
};

const getModalIconClassFromType = (
  headerType?: HeaderAppearance
): string | undefined => {
  switch (headerType) {
    case "success":
      return "modal__headerIcon_success";

    case "info":
      return "modal__headerIcon_info";

    case "error":
      return "modal__headerIcon_error";

    default:
      return "";
  }
};

const MODAL_ANIMATION_TIMING = 50;

export const Modal: FC<ModalProps> = ({ children, ...props }): JSX.Element => {
  const { t } = useTranslation();

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (props.closeOnOverlayClick) {
        stopPropagation(event);
        props.onClose();
      }
    },
    [props.onClose, props.closeOnOverlayClick]
  );

  return (
    <CSSTransition
      in={props.visible}
      timeout={MODAL_ANIMATION_TIMING}
      classNames={getCssTransitionClassNames("modal__container")}
    >
      <div className="modal__container">
        <CSSTransition
          in={props.visible}
          timeout={MODAL_ANIMATION_TIMING}
          classNames={getCssTransitionClassNames("modal__overlay")}
        >
          <section className="modal__overlay" onClick={handleOverlayClick}/>
        </CSSTransition>
        <CSSTransition
          in={props.visible}
          timeout={MODAL_ANIMATION_TIMING}
          classNames={getCssTransitionClassNames("modal")}
        >
          <div className={cn("modal", props.modalClassName)}>
            <div
              className={cn(
                "modal__header",
                getModalHeaderClassFromType(props.header.appearance),
                {
                  modal__header_withBackButton: !!props.onBack,
                }
              )}
            >
              {props.onBack && (
                <HeadlessButton
                  className="modal__backButton"
                  onClick={props.onBack}
                  type="button"
                >
                  <Icon name="arrow_back" size={24}/>
                </HeadlessButton>
              )}
              {props.header.appearance && (
                <Icon
                  name={getModalIconNameFromType(props.header.appearance)}
                  size={29}
                  className={cn(
                    "modal__headerIcon",
                    getModalIconClassFromType(props.header.appearance)
                  )}
                />
              )}
              <div
                className={cn(
                  "modal__headerLabel",
                  getModalHeaderLabelClassFromType(props.header.appearance)
                )}
              >
                {t(props.header.label)}
              </div>
              <HeadlessButton
                className="modal__closeButton"
                onClick={props.onClose}
                type="button"
              >
                <Icon marketplug name="close" size={24}/>
              </HeadlessButton>
            </div>
            <div className="modal__content">{children}</div>
            <div className="modal__footer">
              <div className="modal__footerContainer">
                {props.footer.left &&
                  Array.isArray(props.footer.left) &&
                  props.footer.left.map(
                    (
                      componentOrButtonProps: ButtonProps | ReactNode,
                      index
                    ) => {
                      if (React.isValidElement(componentOrButtonProps)) {
                        return (
                          <div
                            key={index}
                            className="modal__footerButton modal__footerButton_left"
                          >
                            {componentOrButtonProps}
                          </div>
                        );
                      }
                      const buttonProps = componentOrButtonProps as ButtonProps;
                      return (
                        <div
                          key={index}
                          className="modal__footerButton modal__footerButton_left"
                        >
                          <Button {...buttonProps} key={index}>
                            {t(
                              typeof buttonProps.children === "string"
                                ? buttonProps.children
                                : ""
                            )}
                          </Button>
                        </div>
                      );
                    }
                  )}
              </div>
              <div className="modal__footerContainer">
                {props.footer.right &&
                  Array.isArray(props.footer.right) &&
                  props.footer.right.map(
                    (
                      componentOrButtonProps: ButtonProps | ReactNode,
                      index
                    ) => {
                      if (React.isValidElement(componentOrButtonProps)) {
                        return (
                          <div key={index} className="modal__footerButton">
                            {componentOrButtonProps}
                          </div>
                        );
                      }
                      const buttonProps = componentOrButtonProps as ButtonProps;
                      return (
                        <div key={index} className="modal__footerButton">
                          <Button {...buttonProps} key={index}>
                            {t(
                              typeof buttonProps.children === "string"
                                ? buttonProps.children
                                : ""
                            )}
                          </Button>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
};
