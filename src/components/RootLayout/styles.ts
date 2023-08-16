"use client";

import * as React from "react";

import { SxProps, useMediaQuery } from "@mui/material";
import { Theme as MUITheme } from "@mui/material/styles";
import { SystemStyleObject } from "@mui/system";

const DRAWER_WIDTH = 240;

function useAppBarHeight(): number {
  // The height of the AppBar is controlled by this:
  // https://github.com/mui/material-ui/blob/master/packages/mui-material/src/styles/createMixins.js
  //
  // toolbar: {
  //   minHeight: 56,
  //   [breakpoints.up('xs')]: {
  //     '@media (orientation: landscape)': {
  //       minHeight: 48,
  //     },
  //   },
  //   [breakpoints.up('sm')]: {
  //     minHeight: 64,
  //   },
  // },

  // Always perform both queries.
  const matchMinWidth600 = useMediaQuery("(min-width: 600px)");
  const matchLandscape = useMediaQuery("(orientation: landscape");

  if (matchMinWidth600) {
    // 600px is "sm". At or above that, always height 64.
    return 64;
  }

  if (matchLandscape) {
    // If less than 600px, detect a landscape orientation.
    return 48;
  }

  return 56;
}

// Disable warning due to inline function objects.
// noinspection BadExpressionStatementJS
export function useHTMLElementStyles(): React.CSSProperties {
  return {
    // The height of the AppBar determines our need for ScrollPaddingTop.
    scrollPaddingTop: useAppBarHeight() + "px",
    overflowY: "auto",
  };
}

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
export function useLayoutStyles(): SxProps<MUITheme> {
  return [
    // Ensure the AppBar floats above everything.
    (theme): SystemStyleObject => ({
      "#rootLayout-appBar": {
        zIndex: theme.zIndex.drawer + 1,
      },
    }),
    // Typography of the page title.
    {
      "#rootLayout-title": {
        typography: "h6",
      },
    },
    // Consistent styling of the two content regions.
    {
      "#rootLayout-drawer-content": {
        ...sxContentElements,
      },
      "#rootLayout-main-content": {
        ...sxContentElements,
      },
    },
    {
      "#rootLayout-drawer": {
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          height: "auto",
          bottom: 0,
        },
      },
    },
    // The scrollPaddingTop of the page works with the scrollMarginTop of each element.
    // We want the scrollMarginTop to be the same as the marginTop.
    // By default, these are specified in em.
    // https://www.w3schools.com/cssref/css_default_values.php
    {
      h1: {
        scrollMarginTop: "0.67em",
      },
      h2: {
        scrollMarginTop: "0.83em",
      },
      h3: {
        scrollMarginTop: "1.00em",
      },
      h4: {
        scrollMarginTop: "1.33em",
      },
      h5: {
        scrollMarginTop: "1.67em",
      },
      h6: {
        scrollMarginTop: "2.33em",
      },
    },
  ];
}
