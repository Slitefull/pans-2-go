import React from "react";
import { render, screen } from "@testing-library/react";

import { Checkbox } from "../checkbox/checkbox.component";


describe("expect <Checkbox>", () => {
  test("to be rendered properly", () => {
    render(<Checkbox label="Test text"/>);

    const label = screen.getByTestId("checkbox-label");
    const checkbox = screen.getByTestId("checkbox");

    expect(label).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test("to be checked", () => {
    render(<Checkbox label="Test text" defaultChecked/>);

    const label = screen.getByTestId("checkbox-label");
    const checkbox = screen.getByTestId("checkbox");

    expect(label).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });
});
