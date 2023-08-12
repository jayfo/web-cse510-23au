"use client";

import * as React from "react";

import { useAppStore } from "@/components/AppStoreProvider";
import TBD from "@/components/TBD";
import {
  assertIsCourseStoreLinkKey,
  CourseStoreLinkKey,
} from "@/types/CourseStore";
import WrapperComponent from "@/types/WrapperComponent";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { observer } from "mobx-react";

interface CourseLinkProps extends React.PropsWithChildren<{}> {
  component?: WrapperComponent;
  outerComponent?: WrapperComponent;
  linkKey: CourseStoreLinkKey;
}

export const CourseLink = observer(
  ({
    children,
    // Default component to inline "span".
    component = "span",
    // Default no outer component.
    outerComponent,
    linkKey,
  }: CourseLinkProps): React.ReactElement => {
    const appStore = useAppStore();

    // MDX does not enforce this.
    assertIsCourseStoreLinkKey(linkKey);

    // Actual href retrieved from CourseStore.
    const href = appStore.courseStore[linkKey];

    const resultComponentAnchor: React.ReactNode = (() => {
      if (children) {
        // If we have any anchor content, use that.
        return children;
      } else {
        // If we do not have any anchor content, use an appropriate default.
        if (href) {
          // If we have an actual href, default to the link itself.
          return appStore.courseStore[linkKey];
        } else {
          // Without an actual href, indicate the link is TBD.
          return "Link TBD.";
        }
      }
    })();

    const resultComponent: React.ReactElement = (() => {
      if (href) {
        // Href is available, create the link.
        // TODO: Use correct type of link.
        return (
          <Link href={href}>
            <Box component={component}>{resultComponentAnchor}</Box>
          </Link>
        );
      } else {
        // Actual href is not available, create a TBD.
        return <TBD component={component}>{resultComponentAnchor}</TBD>;
      }
    })();

    if (outerComponent) {
      return <Box component={outerComponent}>{resultComponent}</Box>;
    } else {
      return resultComponent;
    }
  },
);

export default CourseLink;
