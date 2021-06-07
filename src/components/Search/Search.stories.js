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

export const SearchStory = () => <Search />;
SearchStory.parameters = {
  viewport: {
    defaultViewport: "responsive",
  },
};
