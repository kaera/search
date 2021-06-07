import React from "react";
import App from "./App";
import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";

describe("App", () => {
  afterEach(cleanup);

  it("renders without crashing", () => {
    const div = document.createElement("div");
    const { getByTestId } = render(<App />, div);
    expect(getByTestId("App")).toBeInTheDocument();
  });
});
