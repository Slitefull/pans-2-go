import React, { useLayoutEffect } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";
import { Button } from "../../components/button/button.component";
import { initRecaptcha, useRecaptcha, verify } from "../../hooks/use-recaptcha";


export default {
  title: "Computools UI Kit/Recaptcha example",
  component: Button,
} as Meta;

export const RecaptchaWithHook: Story = () => {
  const verifySubmit = useRecaptcha("submit");

  const handleSubmit = (token: string) => {
    action("get token")(token);
  };

  return (
    <div>
      <Button
        type="button"
        className="kit-button"
        onClick={() => verifySubmit(handleSubmit)}
      >
        Submit with hook
      </Button>
    </div>
  );
};

export const RecaptchaWithoutHook: Story = () => {
  useLayoutEffect(initRecaptcha, []);

  const handleSubmit = (token: string) => {
    action("get token")(token);
  };

  return (
    <div>
      <Button
        type="button"
        className="kit-button"
        onClick={() => verify("submit", handleSubmit)}
      >
        Submit without hook
      </Button>
    </div>
  );
};
