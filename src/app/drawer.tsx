import * as React from "react";

import { AppLink } from "@/components/AppLink";
import { Box, Stack } from "@mui/material";

export default function Drawer(): React.ReactElement {
  const drawerLinks: {
    anchor: React.ReactNode;
    href: string;
  }[] = [
    {
      anchor: "Course Description",
      href: "#course-description",
    },
    {
      anchor: "Learning Objectives",
      href: "#learning-objectives",
    },
    {
      anchor: "Course Staff",
      href: "#course-staff",
    },
    {
      anchor: "Course Coordination",
      href: "#course-coordination",
    },
    {
      anchor: "Assignments",
      href: "#assignments",
    },
    {
      anchor: "Grading",
      href: "#grading",
    },
    {
      anchor: "Wellness and Safety",
      href: "#wellness-and-safety",
    },
    {
      anchor: "Accommodations and University Policies",
      href: "#accommodations-and-university-policies",
    },
    {
      anchor: "Contributing",
      href: "#contributing",
    },
  ];

  return (
    <Box>
      <Stack>
        <ul style={{ padding: "0px", margin: "0px" }}>
              <li key={"page"} style={{ listStyle: "none" }}>
                <AppLink href={"#course-overview"}><b>Course Overview</b></AppLink>
              </li>
          {drawerLinks.map((drawerLink, drawerLinkIndex) => {
            return (
              <li key={drawerLinkIndex} style={{ listStyle: "none", paddingLeft: "10px", paddingTop: "5px" }}>
                <AppLink href={drawerLink.href}>{drawerLink.anchor}</AppLink>
              </li>
            );
          })}
        </ul>
      </Stack>
    </Box>
  );
}
