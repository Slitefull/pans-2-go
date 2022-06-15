import React, { useState } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import { TextInput, TextInputProps, } from "../../components/text-input/text-input.component";


export default {
  title: "Computools UI Kit/Inputs/Text input",
  component: TextInput,
} as Meta;

const Template: Story<TextInputProps> = (args) => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return <TextInput {...args} value={value} onChange={handleChange}/>;
};

export const InputText = Template.bind({});
InputText.args = {
  type: "email",
  placeholder: "Email",
};

export const InputPassword = Template.bind({});
InputPassword.args = {
  type: "password",
  placeholder: "Password",
};

export const InputWithButton = Template.bind({});
InputWithButton.args = {
  type: "password",
  placeholder: "One time code",
  btnText: "Send again",
  onClick: (): void => alert("clicked button"),
};

export const WithError = Template.bind({});
WithError.args = {
  type: "password",
  placeholder: "Something",
  hasError: true,
};

export const WithHelper = Template.bind({});
WithHelper.args = {
  type: "password",
  placeholder: "Something",
  helperText: "I'm helper text",
};

export const WithSuccess = Template.bind({});
WithSuccess.args = {
  type: "password",
  placeholder: "Something",
  hasSuccess: true,
};
