import * as React from "react";

import { SxProps } from "@mui/material";
import { Theme as MUITheme } from "@mui/material/styles";
import { SystemStyleObject } from "@mui/system";

// TODO: scrollPaddingTop currently hacked in for NavBar.
export const HTML_ELEMENT_STYLES: React.CSSProperties = {
  scrollPaddingTop: "64px",
  overflowY: "auto",
};

const sxContentElements: SxProps = {
  // Apply padding
  // and force 0 margin top for first child.
  p: 3,
  "& > :first-child": {
    mt: 0,
  },
};

// Disable warning due to inline function objects.
// noinspection BadExpressionStatementJS
export const LAYOUT_STYLES: SxProps<MUITheme> = [
  // Consistent styling of the two content regions.
  {
    "#rootLayout-drawer": {
      ...sxContentElements,
    },
    "#rootLayout-main": {
      ...sxContentElements,
    },
  },
  {
    "#rootLayout-title": {
      typography: "h6",
    },
  },
  // Ensure the appBar floats above everything.
  (theme): SystemStyleObject => ({
    "#rootLayout-appBar": {
      zIndex: theme.zIndex.drawer + 1,
    },
  }),
];
