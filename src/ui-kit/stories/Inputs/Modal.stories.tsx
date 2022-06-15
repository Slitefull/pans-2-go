import React, { FC, useState } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";

import { Modal, ModalProps, } from "../../components/modal/modal.component";
import { Button } from "../../components/button/button.component";


export default {
  title: "Computools UI Kit/Modal",
  component: Modal,
} as Meta;

const Template: Story<ModalProps> = ({ ...args }) => {
  const [isVisible, setVisible] = useState(false);
  const onModalClose = (callback?: () => void) => () => {
    setVisible(false);
    action("Modal is closed")();
  };
  const openModal = () => setVisible(true);
  return (
    <div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
      <Button type="button" className="kit-button" onClick={openModal}>
        Open Modal
      </Button>
      <Modal {...args} onClose={onModalClose}>
        <BodyExample/>
      </Modal>
    </div>
  );
};

const buttonClickExampleHandler = () => action("Modal button is clicked")();

const submitExampleHandler = () => action("Submit button is clicked")();

const BodyExample: FC = (): JSX.Element => {
  return (
    <div className="modal-body modal-body-example">
      <div>Lorem</div>
      <section>Ipsum dolor sir amet</section>
      <div>etc etc</div>
    </div>
  );
};

const submitButtonExample = {
  onClick: submitExampleHandler,
  children: "Ok",
};

const secondaryButtonExample = {
  onClick: buttonClickExampleHandler,
  outline: true,
  children: "Cancel",
};

export const SimpleModal = Template.bind({});
SimpleModal.args = {
  header: {
    label: "Modal example header",
  },
  footer: { right: [submitButtonExample, secondaryButtonExample] },
};

export const AlertModal = Template.bind({});
AlertModal.args = {
  header: {
    label: "Alert",
    appearance: "success",
  },
  footer: {
    right: [
      {
        children: "Ok",
        onClick: () => {
          alert("Ok");
        },
      },
    ],
  },
  onClose: () => alert("close"),
};

export const ComplexModal = Template.bind({});
ComplexModal.args = {
  header: {
    label:
      "ComplexModalComplexModalComplexModalComplexModalComplexModalComplexModalComplexModalComplexModalComplexModalComplexModalComplexModalComplexModal",
    appearance: "success",
  },
  footer: {
    right: [
      {
        children: "Ok",
        onClick: () => {
          alert("Ok");
        },
      },
      {
        children: "Cancel",
        outline: true,
        onClick: () => {
          alert("Cancel");
        },
      },
    ],
  },
  onClose: () => alert("close"),
};
