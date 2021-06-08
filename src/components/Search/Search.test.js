import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Search from "./Search";
import "@testing-library/jest-dom";
import "../../utils/searchUtils";

describe("Search", () => {
  jest.mock("../../utils/searchUtils", () => {
    const data = {
      search: "default",
      suggestions: [
        {
          searchterm: "test",
          nrResults: 1100,
        },
        {
          searchterm: "new term",
          nrResults: 1501,
        },
      ],
    };
    return {
      search: jest.fn(() => Promise.resolve(data)),
    };
  });

  afterEach(cleanup);

  test("it should mount", () => {
    const { getByTestId } = render(<Search />);

    expect(getByTestId("Search")).toBeInTheDocument();
  });

  test("it should always display search button", () => {
    const newInputValue = "new value";
    const { container, getByRole } = render(<Search />);
    const searchButton = container.querySelector(".search-button");
    const input = getByRole("textbox");

    expect(searchButton).toBeInTheDocument();

    fireEvent.change(input, { target: { value: newInputValue } });

    expect(searchButton).toBeInTheDocument();
  });

  test("it should have autocomplete = off", () => {
    const { getByRole } = render(<Search />);
    const input = getByRole("textbox");

    expect(input.autocomplete).toEqual("off");
  });
  test("it should not have autofocus by default", () => {
    const { getByRole } = render(<Search />);

    expect(getByRole("textbox")).not.toHaveFocus();
  });
  test("it should have autofocus if passed in props", () => {
    const { getByRole } = render(<Search autofocus />);

    expect(getByRole("textbox")).toHaveFocus();
  });
  test("it should display clear button when input has value", () => {
    const newInputValue = "new value";
    const { getByRole, container } = render(<Search />);
    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: newInputValue } });
    const clearButton = container.querySelector(".clear-button");

    expect(input.value).toEqual(newInputValue);
    expect(clearButton).toBeInTheDocument();
  });

  test("it should not display clear button when input is empty", () => {
    const { getByRole, container } = render(<Search />);
    const input = getByRole("textbox");
    const clearButton = container.querySelector(".clear-button");

    expect(input.value).toEqual("");
    expect(clearButton).not.toBeInTheDocument();
  });

  test("it should not display clear button after click on it", () => {
    const newInputValue = "new value";
    const { getByRole, container } = render(<Search />);
    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: newInputValue } });

    const clearButton = container.querySelector(".clear-button");

    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);

    expect(clearButton).not.toBeInTheDocument();
  });

  test("it should clear input and set focus on clear button click", () => {
    const newInputValue = "new value";
    const { getByRole, container } = render(<Search />);
    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: newInputValue } });

    const clearButton = container.querySelector(".clear-button");

    expect(input.value).toEqual(newInputValue);

    fireEvent.click(clearButton);

    expect(input.value).toEqual("");
    expect(getByRole("textbox")).toHaveFocus();
  });

  test("it should search on Enter", () => {
    const onSubmit = jest.fn();
    const newInputValue = "new value";
    const { getByRole, container } = render(<Search onSubmit={onSubmit} />);
    const input = getByRole("textbox");
    const searchButton = container.querySelector(".search-button");

    fireEvent.change(input, { target: { value: newInputValue } });

    expect(input.value).toEqual(newInputValue);

    fireEvent.click(searchButton);

    expect(onSubmit).toHaveBeenCalledWith(newInputValue);
  });

  test("it should display suggest when input value is not empty", () => {
    const newInputValue = "test";
    const { getByTestId, getByRole } = render(<Search />);
    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: newInputValue } });

    expect(input.value).toEqual(newInputValue);
    expect(getByTestId("Suggest")).toBeInTheDocument();
  });
  test("it should not display suggest when input value is an empty string", () => {
    const newInputValue = " ";
    const { queryByTestId, getByRole } = render(<Search />);
    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: newInputValue } });

    expect(input.value).toEqual(newInputValue);
    expect(queryByTestId("Suggest")).toBeNull();
  });
  test("it should not display suggestions when input value does not match any", () => {
    const newInputValue = "test";
    const { getByTestId, getByRole } = render(<Search />);
    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: newInputValue } });

    expect(input.value).toEqual(newInputValue);
    expect(getByTestId("Suggest").children.length).toEqual(0);
  });
  test("it should not display suggestions when input value is less than 2 characters", () => {
    const newInputValue = "t";
    const { getByTestId, getByRole } = render(<Search />);
    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: newInputValue } });

    expect(input.value).toEqual(newInputValue);
    expect(getByTestId("Suggest").children.length).toEqual(0);
  });
});
