import React, { FC, ReactElement, ReactNode, useCallback, useMemo, } from "react";
import findLast from "lodash/findLast";

import { Modal, ModalProps } from "@/ui-kit/components/modal/modal.component";

import "./modal-stack.styles.scss";


type ModalPropsWithChildren = ModalProps & { children?: ReactNode };

type Children =
  | ReactElement<ModalPropsWithChildren>
  | Array<ReactElement<ModalPropsWithChildren>>;

interface ModalStackProps {
  children: Children;
}

export const ModalStack: FC<ModalStackProps> = (props) => {
  let currentElementIndex = -1;
  const children = props.children as Children;
  const modalProps: ModalPropsWithChildren = useMemo(
    () =>
      Array.isArray(children)
        ? findLast(children, (child, index) => {
        const isVisible = child.props.visible === true;

        if (isVisible) {
          currentElementIndex = index;
        }

        return isVisible;
      })?.props || children[0].props
        : children.props,
    [children]
  );

  const onClose = useCallback(() => {
    if (Array.isArray(children)) {
      const prevModals = children.slice(0, currentElementIndex + 1).reverse();
      prevModals.forEach((modal) => {
        if (modal.props.visible) {
          modal.props.onClose();
        }
      });
    } else {
      children.props.onClose();
    }
  }, [currentElementIndex, children]);

  return (
    <Modal
      {...modalProps}
      onBack={currentElementIndex === 0 ? undefined : modalProps.onClose}
      onClose={onClose}
    >
      {modalProps.children}
    </Modal>
  );
};
