// Based on example:
// https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-ts
// Accessed 2023-08-08.

import * as React from "react";

import RootLayout from "@/components/RootLayout";
import { appStoreInitialData } from "@/stores/AppStoreInitialData";

import Drawer from "./drawer";

// TODO: Pull course title from a configuration
export const metadata = {
  title: "CSE 510 - Advanced Topics in HCI - Autumn 2023",
  description: "CSE 510 - Advanced Topics in HCI - Autumn 2023",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const initialData = appStoreInitialData();

  return (
    <RootLayout drawerChildren={<Drawer />} initialData={initialData}>
      {children}
    </RootLayout>
  );
}
