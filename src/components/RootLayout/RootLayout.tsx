// Based on example:
// https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-ts
// Accessed 2023-08-08.

"use client";

import * as React from "react";

import AppStoreProvider from "@/components/AppStoreProvider";
import { AppLink } from "@/components/links/AppLink";
import ThemeRegistry from "@/components/ThemeRegistry";
import { AppStoreData } from "@/types/AppStore";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Theme as MUITheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/system";

import rootLayoutStyles from "./rootLayout.module.css";
import { useLayoutStyles } from "./styles";

interface outerLayoutProps extends React.PropsWithChildren<{}> {
  initialData: AppStoreData;
  layoutStyles: SxProps<MUITheme>;
}
function OuterLayout({
  children,
  initialData,
  layoutStyles,
}: outerLayoutProps): React.ReactElement {
  return (
    <html lang="en" className={rootLayoutStyles.html}>
      <body>
        <ThemeRegistry>
          <AppStoreProvider initialData={initialData}>
            <Box id="app-root" sx={layoutStyles}>
              {children}
            </Box>
          </AppStoreProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}

interface innerLayoutProps extends React.PropsWithChildren<{}> {
  sidebar: React.ReactNode;
}

function InnerLayout({
  children,
  sidebar,
}: innerLayoutProps): React.ReactElement {
  return (
    <React.Fragment>
      <AppBar id="rootLayout-appBar" position="sticky">
        <Container>
          <Toolbar>
            <AppLink href="/">
              <Typography id="rootLayout-title" component="div" noWrap>
                {/* TODO: Pull course title from a configuration */}
                CSE 510 - Advanced Topics in HCI - Autumn 2023
              </Typography>
            </AppLink>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <Box id="rootLayout-container">
          <Box id="rootLayout-sidebar">
            <Box id="rootLayout-sidebar-content" component="nav">
              {sidebar}
            </Box>
          </Box>
          <Box
            id="rootLayout-main-content"
            component="main"
            sx={{
              flexGrow: 1,
            }}
          >
            {children}
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

interface RootLayoutProps extends React.PropsWithChildren<{}> {
  sidebar: React.ReactNode;
  initialData: AppStoreData;
}

export default function RootLayout({
  children,
  sidebar,
  initialData,
}: RootLayoutProps): React.ReactElement {
  return (
    <OuterLayout initialData={initialData} layoutStyles={useLayoutStyles()}>
      <InnerLayout sidebar={sidebar}>{children}</InnerLayout>
    </OuterLayout>
  );
}
