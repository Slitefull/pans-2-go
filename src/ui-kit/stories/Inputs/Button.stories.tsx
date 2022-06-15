import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import { Button, ButtonProps } from "../../components/button/button.component";
import { Container } from "../helpers";


export default {
  title: "Computools UI Kit/Inputs/Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => {
  return (
    <Container width={800}>
      <Button {...args}>Login</Button>

      <Button {...args} disabled>
        Login
      </Button>
    </Container>
  );
};

export const ButtonSample = Template.bind({});
