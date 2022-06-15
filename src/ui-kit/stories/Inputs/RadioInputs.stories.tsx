import React, { useCallback, useState } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";

import { RadioInput, RadioInputProps, } from "../../components/radio-input/radio-input.component";


export default {
  title: "Computools UI Kit/Inputs/Radio",
  component: RadioInput,
} as Meta;

const Template: Story<RadioInputProps> = (args) => <RadioInput {...args} />;

export const Radio = Template.bind({});
Radio.args = {
  label: "Radio",
  checked: false,
};

export const MultipleRadio = () => {
  const [selectedBtn, setSelectedBtn] = useState("");
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBtn(event.target.value);
    action("radioSelected")(event.target.value);
  }, []);

  const radioValues = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Other",
      value: "other",
    },
  ];

  return (
    <div>
      Select your gender:
      {radioValues.map((radio) => (
        <RadioInput
          label={radio.label}
          value={radio.value}
          name="f-option"
          onChange={onChange}
          checked={selectedBtn === radio.value}
        />
      ))}
    </div>
  );
};
