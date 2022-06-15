import React, { useCallback, useState } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import { DropdownInput, DropdownInputProps, } from "../../components/dropdown-input/dropdown-input.component";
import { Container } from "../helpers";


export default {
  title: "Computools UI Kit/Inputs/Dropdown",
  component: DropdownInput,
} as Meta;

const Template: Story<DropdownInputProps> = ({
                                               value: defaultValue,
                                               ...args
                                             }) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = useCallback((selectedValue) => {
    setValue(selectedValue);
  }, []);

  return (
    <Container width={500} backgroundColor="white" height={400}>
      <DropdownInput {...args} value={value} onChange={onChange}/>
    </Container>
  );
};

export const Dropdown = Template.bind({});
Dropdown.args = {
  placeholder: "Select month",
  options: [
    { id: "january", value: "January" },
    { id: "february", value: "February" },
    { id: "march", value: "March" },
    { id: "april", value: "April" },
    { id: "may", value: "May" },
    { id: "june", value: "June" },
    { id: "july", value: "July" },
    { id: "august", value: "August" },
    { id: "september", value: "September" },
    { id: "october", value: "October" },
    { id: "november", value: "November" },
    { id: "december", value: "December" },
  ],
};

export const DropdownWithPrefilledValue = Template.bind({});
DropdownWithPrefilledValue.args = {
  placeholder: "Select month",
  options: [
    { id: "january", value: "January" },
    { id: "february", value: "February" },
    { id: "march", value: "March" },
    { id: "april", value: "April" },
    { id: "may", value: "May" },
    { id: "june", value: "June" },
    { id: "july", value: "July" },
    { id: "august", value: "August" },
    { id: "september", value: "September" },
    { id: "october", value: "October" },
    { id: "november", value: "November" },
    { id: "december", value: "December" },
  ],
  value: "december",
};

export const DropdownWithCustomValueRenderer = Template.bind({});
DropdownWithCustomValueRenderer.args = {
  placeholder: "Select month",
  options: [
    {
      id: "january",
      value: (
        <span>
          THIS IS <b>JANUARY</b>
        </span>
      ),
    },
    { id: "february", value: "February" },
    { id: "march", value: "March" },
    { id: "april", value: "April" },
    { id: "may", value: "May" },
    { id: "june", value: "June" },
    { id: "july", value: "July" },
    { id: "august", value: "August" },
    { id: "september", value: "September" },
    { id: "october", value: "October" },
    { id: "november", value: "November" },
    { id: "december", value: "December" },
  ],
  value: "december",
};

export const MultipleDropdown = Template.bind({});
MultipleDropdown.args = {
  placeholder: "Select month",
  options: [
    { id: "january", value: "January" },
    { id: "february", value: "February" },
    { id: "march", value: "March" },
    { id: "april", value: "April" },
    { id: "may", value: "May" },
    { id: "june", value: "June" },
    { id: "july", value: "July" },
    { id: "august", value: "August" },
    { id: "september", value: "September" },
    { id: "october", value: "October" },
    { id: "november", value: "November" },
    { id: "december", value: "December" },
  ],
  multiple: true,
};

export const MultipleDropdownWithCustomValue = Template.bind({});
MultipleDropdownWithCustomValue.args = {
  placeholder: "Select month",
  options: [
    {
      id: "january",
      value: (
        <span>
          THIS IS <b>JANUARY</b>
        </span>
      ),
    },
    { id: "february", value: "February" },
    { id: "march", value: "March" },
    { id: "april", value: "April" },
    { id: "may", value: "May" },
    { id: "june", value: "June" },
    { id: "july", value: "July" },
    { id: "august", value: "August" },
    { id: "september", value: "September" },
    { id: "october", value: "October" },
    { id: "november", value: "November" },
    { id: "december", value: "December" },
  ],
  multiple: true,
};
