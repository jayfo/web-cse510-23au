// Based on example:
// https://github.com/mui/material-ui/blob/master/examples/material-next-app-router-ts/
// Accessed 2023-07-26.

import * as React from "react";

import RootLayout from "@/components/RootLayout";
import ThemeRegistry from "@/components/ThemeRegistry";

import DrawerChildren from "./drawer";

// TODO: Pull course title from a configuration
export const metadata = {
  title: "CSE 510 - Advanced Topics in HCI - Autumn 2023",
  description: "CSE 510 - Advanced Topics in HCI - Autumn 2023",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <RootLayout drawer={<DrawerChildren />}>{children}</RootLayout>
        </ThemeRegistry>
      </body>
    </html>
  );
}
