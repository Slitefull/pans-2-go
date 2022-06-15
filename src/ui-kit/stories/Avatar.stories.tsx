import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import { Avatar, AvatarProps, AvatarStatus, } from "../components/avatar/avatar.component";
import { Container } from "./helpers";


export default {
  title: "Computools UI Kit/Avatar",
  component: Avatar,
} as Meta;

const Template: Story<Partial<AvatarProps>> = (args) => {
  // @ts-ignore
  return (
    <Container width={800}>
      <Avatar
        image="https://html5css.ru/css/rock600x400.jpg"
        alt="Don Yagan"
        size={24}
        {...args}
      />
    </Container>
  );
};

export const AvatarSample = Template.bind({});

AvatarSample.args = {
  image: "https://html5css.ru/css/rock600x400.jpg",
  alt: "Don Yagan",
  size: 24,
  status: AvatarStatus.ONLINE,
  statusPosition: {
    right: -1,
    bottom: -1,
  },
};
