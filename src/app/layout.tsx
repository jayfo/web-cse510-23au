// Based on example:
// https://github.com/mui/material-ui/blob/master/examples/material-next-app-router-ts/
// Accessed 2023-07-21.

import * as React from "react";

import RootLayout from "@/components/RootLayout";
import ThemeRegistry from "@/components/ThemeRegistry";
import { Roboto } from "next/font/google";

export const metadata = {
  title: "Next.js App Router + Material UI v5",
  description: "Next.js App Router + Material UI v5",
};

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className={roboto.className}>
        <ThemeRegistry>
          <RootLayout>{children}</RootLayout>
        </ThemeRegistry>
      </body>
    </html>
  );
}
