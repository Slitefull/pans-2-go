import React, { useCallback, useState } from "react";
import { Meta } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";

import { SearchInput, } from "../../components/search-input/search-input.component";
import { Container } from "@/ui-kit/stories/helpers";


export default {
  title: "Computools UI Kit/Inputs/Search",
  component: SearchInput,
} as Meta;

export const Search = () => {
  const [value, setValue] = useState("");
  const [option, setOption] = useState<number | string | undefined>(undefined);
  const onChange = useCallback(
    (text: string) => {
      setValue(text);
      action("radioSelected")(text);
    },
    [setValue]
  );

  const radioValues = [
    {
      id: 1,
      label: "Male",
    },
    {
      id: 2,
      label: "Female",
    },
    {
      id: 3,
      label: "Other",
    },
    {
      id: 4,
      label: "Male",
    },
    {
      id: 5,
      label: "Female",
    },
    {
      id: 6,
      label: "Other",
    },
    {
      id: 7,
      label: "Male",
    },
    {
      id: 8,
      label: "Female",
    },
    {
      id: 9,
      label: "Other",
    },
  ];

  const options = radioValues.filter((option) =>
    option.label.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <Container width={500} height={600} backgroundColor="white">
      <SearchInput
        label={"country"}
        initialValue={value}
        onTextChange={onChange}
        options={options}
        selectedOptionId={option}
        onOptionSelect={(id: number | string) => setOption(id)}
        onOptionDeselect={() => setOption(undefined)}
        isLoading={options.length === 0}
      />
    </Container>
  );
};
