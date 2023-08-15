// Based on example:
// https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-ts
// Accessed 2023-08-08.

"use client";

import * as React from "react";

import AppStoreProvider from "@/components/AppStoreProvider";
import ThemeRegistry from "@/components/ThemeRegistry";
import { AppStoreData } from "@/types/AppStore";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Theme as MUITheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/system";

import { HTML_ELEMENT_STYLES, LAYOUT_STYLES } from "./styles";

const DRAWER_WIDTH = 240;

interface outerLayoutProps extends React.PropsWithChildren<{}> {
  initialData: AppStoreData;
  htmlElementStyles: React.CSSProperties;
  layoutStyles: SxProps<MUITheme>;
}
function OuterLayout({
  children,
  initialData,
  htmlElementStyles,
  layoutStyles,
}: outerLayoutProps): React.ReactElement {
  return (
    <html lang="en" style={htmlElementStyles}>
      <body>
        <ThemeRegistry>
          <AppStoreProvider initialData={initialData}>
            <Box sx={layoutStyles}>{children}</Box>
          </AppStoreProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}

interface innerLayoutProps extends React.PropsWithChildren<{}> {
  drawerChildren: React.ReactNode;
}

function InnerLayout({
  children,
  drawerChildren,
}: innerLayoutProps): React.ReactElement {
  return (
    <React.Fragment>
      <AppBar id="rootLayout-appBar" className="catdog" position="sticky">
        <Toolbar>
          <Typography id="rootLayout-title" component="div" noWrap>
            {/* TODO: Pull course title from a configuration */}
            CSE 510 - Advanced Topics in HCI - Autumn 2023
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex" }}>
        <Drawer
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              height: "auto",
              bottom: 0,
            },
          }}
          variant="permanent"
          anchor="left"
        >
          {/* Empty ToolBar pushes Drawer content downward. */}
          <Toolbar />
          <Box id="rootLayout-drawer" component="nav">
            {drawerChildren}
          </Box>
        </Drawer>
        <Box
          id="rootLayout-main"
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    </React.Fragment>
  );
}

interface RootLayoutProps extends React.PropsWithChildren<{}> {
  drawerChildren: React.ReactNode;
  initialData: AppStoreData;
}

export default function RootLayout({
  children,
  drawerChildren,
  initialData,
}: RootLayoutProps): React.ReactElement {
  return (
    <OuterLayout
      initialData={initialData}
      htmlElementStyles={HTML_ELEMENT_STYLES}
      layoutStyles={LAYOUT_STYLES}
    >
      <InnerLayout drawerChildren={drawerChildren}>{children}</InnerLayout>
    </OuterLayout>
  );
}
