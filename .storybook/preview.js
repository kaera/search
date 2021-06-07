import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { configure } from "@storybook/react";

configure(require.context("../src", true, /\.stories\.js$/), module);

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: "responsive",
  },
};
