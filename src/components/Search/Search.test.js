import React from "react";
import { render, cleanup } from "@testing-library/react";
import Search from "./Search";
import "@testing-library/jest-dom";
describe("Search", () => {
  afterEach(cleanup);

  test("it should mount", () => {
    const { getByTestId } = render(<Search />);
    expect(getByTestId("Search")).toBeInTheDocument();
  });
});
