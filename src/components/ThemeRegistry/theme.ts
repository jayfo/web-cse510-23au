// Based on example:
// https://github.com/mui/material-ui/blob/master/examples/material-next-app-router-ts/
// Accessed 2023-07-21.

import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
});

export default defaultTheme;
