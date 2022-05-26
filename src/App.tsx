import React from "react";
import styled, {ThemeProvider} from "styled-components";
import {GlobalStyles} from "./styles/globalStyles";
import {useThemeContext} from "./context";
import themes from "./styles/Themes";
import Calculator from "./components/Calculator";
import {operatorType} from "./types";

const App = () => {
  const {idx} = useThemeContext();
  const theme = themes[idx];
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppWrapper>
        <Calculator />
      </AppWrapper>
    </ThemeProvider>
  );
};

const AppWrapper = styled.main`
  color: white;
  p {
    color: ${(props) => props.theme.equalsKeyBackgroundColor};
  }
`;

export default App;
