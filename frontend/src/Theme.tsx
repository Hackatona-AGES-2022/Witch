import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#ffc0cb",
    },
    secondary: {
      light: "#f0e6e6",
      main: "#c93434",
      dark: "#3c3c3c",
      contrastText: "#000"
    }
  }
});
