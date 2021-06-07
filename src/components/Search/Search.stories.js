/* eslint-disable */
import React from "react";
import Search from "./Search";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

export default {
  title: "Stories",
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
};

export const SearchDefault = () => <Search />;
SearchDefault.parameters = {
  viewport: {
    defaultViewport: "responsive",
  },
};

export const SearchWithAutofocus = () => <Search autofocus />;
SearchWithAutofocus.parameters = {
  viewport: {
    defaultViewport: "responsive",
  },
};
