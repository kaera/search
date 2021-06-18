import { render, cleanup, fireEvent } from "@testing-library/react";
import Suggest from "./Suggest";
import "@testing-library/jest-dom";

describe("Suggest", () => {
  let props = {
    suggestions: [
      {
        searchterm: "test item",
        nrResults: 2,
        html: "<strong>test</strong> item",
      },
      { searchterm: "item", nrResults: 4 },
    ],
    onSelect: jest.fn(),
  };
  afterEach(cleanup);

  test("it should mount", async () => {
    const { getByTestId } = render(<Suggest {...props} />);

    expect(getByTestId("Suggest")).toBeInTheDocument();
  });

  test("it should highlight user input in suggestions", async () => {
    const { getAllByText } = render(<Suggest {...props} />);
    const userInput = "test";

    const filteredSuggestions = getAllByText(userInput);
    for (let suggestion of filteredSuggestions) {
      expect(suggestion).toContainHTML("strong");
    }
  });

  test("it should highlight number of results", async () => {
    const { getByText } = render(<Suggest {...props} />);

    const numberOfResults = getByText(`(${props.suggestions[0].nrResults})`);

    expect(numberOfResults).toHaveClass("highlighted");
  });

  test("it should pass selected suggestion on click", async () => {
    const { container } = render(<Suggest {...props} />);

    fireEvent.click(container.querySelector(".suggest-item"));

    expect(props.onSelect).toHaveBeenCalledWith(
      props.suggestions[0].searchterm
    );
  });
});
