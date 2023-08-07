// Based on example:
// https://github.com/mui/material-ui/blob/master/examples/material-next-app-router-ts/
// Accessed 2023-07-21.

"use client";

import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const DRAWER_WIDTH = 240;

interface RootLayoutProps extends React.PropsWithChildren<{}> {
  drawer: React.ReactNode;
}

export default function RootLayout({
  drawer,
  children,
}: RootLayoutProps): React.ReactElement {
  return (
    <React.Fragment>
      <AppBar
        position="sticky"
        sx={{
          // Set zIndex to ensure shadow over drawer.
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" noWrap>
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
          <Box
            component="nav"
            sx={{
              // Apply consistent padding and force 0 margin top for first child.
              pt: 3,
              "& > :first-child": {
                mt: 0,
              },
            }}
          >
            {drawer}
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // Apply consistent padding and force 0 margin top for first child.
            p: 3,
            "& > :first-child": {
              mt: 0,
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </React.Fragment>
  );
}
