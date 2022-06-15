import React from "react";
import { render, screen } from "@testing-library/react";

import { Carousel } from "../carousel/carousel.component";


describe("expect <Carousel>", () => {
  test("to be rendered", () => {
    render(<Carousel>Test Text</Carousel>);

    const carousel = screen.getByText("Test Text");

    expect(carousel).toBeInTheDocument();
  });
});
