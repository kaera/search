import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Search from "./Search";
import "@testing-library/jest-dom";

describe("Search", () => {
  afterEach(cleanup);

  test("it should mount", () => {
    const { getByTestId } = render(<Search />);
    expect(getByTestId("Search")).toBeInTheDocument();
  });

  test("it should display search button when input is empty and with value", () => {
    const { container, getByRole } = render(<Search />);
    const searchButton = container.querySelector(".search-button");
    const input = getByRole("textbox");

    expect(input.value).toEqual("");
    expect(searchButton).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "new value" } });

    expect(input.value).toEqual("new value");
    expect(searchButton).toBeInTheDocument();
  });

  test("it should have autocomplete = off", () => {
    const { getByRole } = render(<Search />);
    const input = getByRole("textbox");
    expect(input.autocomplete).toEqual("off");
  });
  test("it should not have autofocus", () => {
    const { getByRole } = render(<Search />);
    expect(getByRole("textbox")).not.toHaveFocus();
  });
  test("it should have autofocus", () => {
    const { getByRole } = render(<Search autofocus />);
    expect(getByRole("textbox")).toHaveFocus();
  });
  test("it should display clear button when input has value", () => {
    const { getByRole, container } = render(<Search />);
    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "new value" } });
    const clearButton = container.querySelector(".clear-button");

    expect(input.value).toEqual("new value");
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
    const { getByRole, container } = render(<Search />);
    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: "new value" } });
    const clearButton = container.querySelector(".clear-button");
    expect(input.value).toEqual("new value");

    fireEvent.click(clearButton);

    expect(input.value).toEqual("");
    expect(clearButton).not.toBeInTheDocument();
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
});
