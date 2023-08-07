import * as React from "react";

import WrapperComponent, {
  assertIsWrapperComponent,
} from "@/types/WrapperComponent";
import Box from "@mui/material/Box";

interface TBDProps extends React.PropsWithChildren<{}> {
  component?: WrapperComponent;
  outerComponent?: WrapperComponent;
}

export const TBD = ({
  children,
  // Default component to inline "span".
  component = "span",
  // Default no outer component.
  outerComponent,
}: TBDProps): React.ReactElement => {
  // MDX does not enforce this.
  assertIsWrapperComponent(component);

  const resultComponent: React.ReactElement = (
    <Box
      component={component}
      sx={{
        // Apply a background.
        // If this background is not appearing,
        // that is generally due to an invalid HTML hierarchy
        // (e.g., <p> cannot contain <div>, <span> cannot contain <p>).
        backgroundColor: "lightpink",
      }}
    >
      {children}
    </Box>
  );

  if (outerComponent) {
    return <Box component={outerComponent}>{resultComponent}</Box>;
  } else {
    return resultComponent;
  }
};

export default TBD;
