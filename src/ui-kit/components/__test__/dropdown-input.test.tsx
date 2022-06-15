import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { DropdownInput } from "../dropdown-input/dropdown-input.component";


const dropdownProps = {
  value: null,
  options: [
    {
      id: "1",
      value: "asdasd",
    },
    {
      id: "2",
      value: "asdasd",
    },
  ],
  placeholder: "testtesttest",
};

describe("expect <DropdownInput>", () => {
  test("to be rendered properly", () => {
    const onChange = jest.fn();
    render(<DropdownInput {...dropdownProps} onChange={onChange} multiple/>);

    const root = screen.getByTestId("dropdown-root");
    const value = screen.getByTestId("dropdown-value");
    const list = screen.getByTestId("dropdown-list");

    expect(root).not.toHaveClass("active");
    expect(root).toBeInTheDocument();

    expect(value.firstChild!.textContent).toBe(dropdownProps.placeholder);

    expect(list).toHaveClass("hidden");
    expect(list).not.toHaveClass("visible");

    expect(onChange).not.toBeCalled();
  });

  test("to render label of selected value", () => {
    const onChange = jest.fn();
    render(
      <DropdownInput
        {...dropdownProps}
        onChange={onChange}
        value={dropdownProps.options[0].id}
      />
    );

    const value = screen.getByTestId("dropdown-value");

    expect(value.firstChild!.textContent).toBe(dropdownProps.options[0].value);
  });

  test("to open list of options", () => {
    const onChange = jest.fn();

    render(<DropdownInput {...dropdownProps} onChange={onChange}/>);

    const toggler = screen.getByTestId("dropdown-toggler");
    const root = screen.getByTestId("dropdown-root");
    const list = screen.getByTestId("dropdown-list");

    fireEvent.click(toggler);

    expect(root).toHaveClass("active");

    expect(list).toHaveClass("visible");
    expect(list).not.toHaveClass("hidden");

    expect(onChange).not.toBeCalled();
  });

  test("to hide list of option", async () => {
    const onChange = jest.fn();

    render(<DropdownInput {...dropdownProps} onChange={onChange}/>);

    const toggler = screen.getByTestId("dropdown-toggler");
    const firstOption = screen.getByTestId("dropdown-option-1");

    fireEvent.click(toggler);
    fireEvent.click(firstOption);

    const root = screen.getByTestId("dropdown-root");
    const list = screen.getByTestId("dropdown-list");

    expect(root).not.toHaveClass("active");

    expect(list).toHaveClass("hidden");
    expect(list).not.toHaveClass("visible");
  });

  test("to select one list option", async () => {
    const onChange = jest.fn();

    render(<DropdownInput {...dropdownProps} onChange={onChange}/>);

    const toggler = screen.getByTestId("dropdown-toggler");
    const firstOption = screen.getByTestId("dropdown-option-1");

    fireEvent.click(toggler);
    fireEvent.click(firstOption);

    expect(onChange).toBeCalledWith(dropdownProps.options[0].id);
  });

  test("to return array in onTextChange fn", () => {
    const onChange = jest.fn();

    render(
      <DropdownInput
        {...dropdownProps}
        onChange={onChange}
        value={dropdownProps.options[0].id}
        multiple
      />
    );

    const root = screen.getByTestId("dropdown-root");
    const toggler = screen.getByTestId("dropdown-toggler");
    const value = screen.getByTestId("dropdown-value");
    const list = screen.getByTestId("dropdown-list");
    const secondOption = screen.getByTestId("dropdown-option-2");

    fireEvent.click(toggler);
    fireEvent.click(secondOption);

    expect(value.firstChild!.textContent).toBe(dropdownProps.options[0].value);

    expect(onChange).toBeCalledWith([dropdownProps.options[1].id]);
  });

  test("to return array of multiple values in onTextChange fn", () => {
    const onChange = jest.fn();

    render(
      <DropdownInput
        {...dropdownProps}
        onChange={onChange}
        value={[dropdownProps.options[0].id]}
        multiple
      />
    );

    const toggler = screen.getByTestId("dropdown-toggler");
    const secondOption = screen.getByTestId("dropdown-option-2");

    fireEvent.click(toggler);
    fireEvent.click(secondOption);

    expect(onChange).toBeCalledWith([
      dropdownProps.options[0].id,
      dropdownProps.options[1].id,
    ]);
  });

  test("to deselect option", () => {
    const onChange = jest.fn();

    render(
      <DropdownInput
        {...dropdownProps}
        onChange={onChange}
        value={[dropdownProps.options[0].id, dropdownProps.options[1].id]}
        multiple
      />
    );

    const toggler = screen.getByTestId("dropdown-toggler");
    const secondOption = screen.getByTestId("dropdown-option-2");

    fireEvent.click(toggler);
    fireEvent.click(secondOption);

    expect(onChange).toBeCalledWith([dropdownProps.options[0].id]);
  });
});
