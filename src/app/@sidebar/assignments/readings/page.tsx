import * as React from "react";

import { AppLink } from "@/components/AppLink";
import { Box, Stack } from "@mui/material";

export default function Sidebar(): React.ReactElement {
  const sidebarLinks: {
    anchor: React.ReactNode;
    href: string;
  }[] = [
    {
      anchor: "Reading Reports",
      href: "#reading-reports",
    },
    {
      anchor: "In-Class Discussion",
      href: "#in-class-discussion",
    },
  ];

  return (
    <Box>
      <Stack>
        <ul style={{ padding: "0px", margin: "0px" }}>
          <li key={"page"} style={{ listStyle: "none" }}>
            <AppLink href={"#readings-reading-reports-and-in-class-discussion"}>
              <b>Readings, Reading Reports, and In-Class Discussion</b>
            </AppLink>
          </li>
          {sidebarLinks.map((sidebarLink, sidebarLinkIndex) => {
            return (
              <li
                key={sidebarLinkIndex}
                style={{
                  listStyle: "none",
                  paddingLeft: "10px",
                  paddingTop: "5px",
                }}
              >
                <AppLink href={sidebarLink.href}>{sidebarLink.anchor}</AppLink>
              </li>
            );
          })}
        </ul>
      </Stack>
    </Box>
  );
}
