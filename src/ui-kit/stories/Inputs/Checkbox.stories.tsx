import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import { Checkbox, CheckboxProps, } from "../../components/checkbox/checkbox.component";


export default {
  title: "Computools UI Kit/Inputs/Checkbox",
  component: Checkbox,
} as Meta;

const Template: Story<CheckboxProps> = (args) => {
  return <Checkbox {...args} />;
};

export const CheckboxSample = Template.bind({});
CheckboxSample.args = {
  label: "I am  18 years or older",
};
