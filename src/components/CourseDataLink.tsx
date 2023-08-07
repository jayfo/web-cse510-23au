"use client";

import * as React from "react";

import { useAppStore } from "@/components/AppStoreProvider";
import TBD from "@/components/TBD";
import {
  assertIsCourseDataStoreLinkKey,
  CourseDataStoreLinkKey,
} from "@/types/CourseDataStore";
import WrapperComponent from "@/types/WrapperComponent";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { observer } from "mobx-react";

interface CourseDataLinkProps extends React.PropsWithChildren<{}> {
  linkKey: CourseDataStoreLinkKey;
  component?: WrapperComponent;
  innerComponent?: WrapperComponent;
}

export const CourseDataLink = observer(
  ({
    children,
    // Default component to inline "span".
    // This is the same default as <a>.
    component = "span",
    // Default innerComponent to inline "span".
    // TBD styling will apply only to the inline text,
    // not to any entire surrounding block.
    innerComponent = "span",
    linkKey,
  }: CourseDataLinkProps): React.ReactElement => {
    const appStore = useAppStore();

    // MDX does not enforce this.
    assertIsCourseDataStoreLinkKey(linkKey);

    // Actual href retrieved from CourseDataStore.
    const href = appStore.courseDataStore[linkKey];

    // If we do not have any anchor content,
    // populate with some appropriate default.
    if (children === undefined) {
      if (href) {
        // If we have an actual href, default to the link itself.
        children = appStore.courseDataStore[linkKey];
      } else {
        // Without an actual href, indicate the link is TBD.
        children = "Link TBD.";
      }
    }

    // Create the inner component.
    const resultInnerComponent: React.ReactElement = (() => {
      if (href) {
        // Actual href is available, create the link.

        // TODO: Use correct type of link.
        return (
          <Link href={href}>
            <Box component={innerComponent}>{children}</Box>
          </Link>
        );
      } else {
        // Actual href is not available, create a TBD.
        return <TBD component={innerComponent}>{children}</TBD>;
      }
    })();

    // Create the outer component.
    if (component === innerComponent) {
      // No reason to duplicate the component.
      return resultInnerComponent;
    } else {
      return <Box component={component}>{resultInnerComponent}</Box>;
    }
  },
);

export default CourseDataLink;
