import React from "react";
import { render, screen } from "@testing-library/react";

import { Button } from "../button/button.component";


describe("expect <Button>", () => {
  test("to be rendered properly", () => {
    render(
      <Button className="testClass" fullWidth>
        Test Text
      </Button>
    );

    const button = screen.getByText("Test Text");

    expect(button).toHaveClass("kit-button--full-width");
    expect(button).toHaveClass("testClass");
    expect(button).toBeInTheDocument();
  });

  test("to have fullWidth default property equal to false", () => {
    render(<Button>Test Text</Button>);

    const button = screen.getByText("Test Text");

    expect(button).not.toHaveClass("kit-button--full-width");
    expect(button).toBeInTheDocument();
  });
});
