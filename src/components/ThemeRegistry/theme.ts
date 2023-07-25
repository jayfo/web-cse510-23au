// Based on example:
// https://github.com/mui/material-ui/blob/master/examples/material-next-app-router-ts/
// Accessed 2023-07-21.

import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
  // A purple and green palette from the DUB branding.
  palette: {
    mode: "light",
    primary: {
      main: "#4b2e83",
    },
    secondary: {
      main: "#4cdc31",
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

export default defaultTheme;
