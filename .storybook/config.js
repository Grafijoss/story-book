import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { ThemeProvider, injectGlobal } from "styled-components";
import theme from "../src/styles/theme";

const Theme = ({ children }) => {
  const themeContext = useContext(ThemeContext);
  // The theme context is available here.
  console.log(themeContext);
  return children;
};

const ThemeDecorator = (storyFn) => (
  <ThemeProvider theme={theme}>
    <>{storyFn()}</>
  </ThemeProvider>
);

const req = require.context("../src/components", true, /\.stories\.js$/);

addDecorator(ThemeDecorator);

function loadStories() {
  req.keys().forEach((fileName) => req(fileName));
}

configure(loadStories, module);
