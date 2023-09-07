import * as React from "react";

import { Sidebar } from "@/components/Sidebar";

export default function Page(): React.ReactElement {
  return (
    <Sidebar
      siteLinks={[
        { anchor: "Course Overview", href: "/#course-overview" },
        { anchor: "Assignments", href: "/assignments/#assignments" },
        { anchor: "Calendar", href: "/calendar/#calendar" },
      ]}
      pageLinks={[
        {
          anchor: "Readings, Reading Reports, and In-Class Discussion",
          href: "#readings-reading-reports-and-in-class-discussion",
        },
        [
          {
            anchor: "Reading Reports",
            href: "#reading-reports",
          },
          {
            anchor: "In-Class Discussion",
            href: "#in-class-discussion",
          },
        ],
      ]}
    />
  );
}
