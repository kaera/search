import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Suggest from "./Suggest";
import "@testing-library/jest-dom";

describe("Suggest", () => {
  afterEach(cleanup);

  test("it should mount", async () => {
    const { getByTestId } = render(<Suggest suggestions={[]} />);

    expect(getByTestId("Suggest")).toBeInTheDocument();
  });

  test("it should highlight user input", async () => {
    const props = {
      userInput: "test",
      suggestions: [
        { searchterm: "test item", nrResults: 2 },
        { searchterm: "item", nrResults: 4 },
      ],
      onSelect: jest.fn(),
    };
    const { getAllByText } = render(<Suggest {...props} />);

    const filteredSuggestions = getAllByText(props.userInput);
    for (let suggestion of filteredSuggestions) {
      expect(suggestion).toContainHTML("strong");
    }
  });

  test("it should highlight number of results", async () => {
    const props = {
      userInput: "test",
      suggestions: [{ searchterm: "test item", nrResults: 2 }],
      onSelect: jest.fn(),
    };
    const { getByText } = render(<Suggest {...props} />);

    const numberOfresults = getByText(
      `(${props.suggestions[0].nrResults.toString()})`
    );

    expect(numberOfresults).toHaveClass("highlighted");
  });

  test("it should pass selected suggestion on click", async () => {
    const onSelect = jest.fn();
    const props = {
      userInput: "test",
      suggestions: [{ searchterm: "test item", nrResults: 2 }],
      onSelect: onSelect,
    };
    const { container } = render(<Suggest {...props} />);
    const selected = container.querySelector("span");
    fireEvent.click(selected);

    expect(onSelect).toHaveBeenCalledWith(props.suggestions[0].searchterm);
  });
});
