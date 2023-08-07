import * as React from "react";

import WrapperComponent, {
  assertIsWrapperComponent,
} from "@/types/WrapperComponent";
import Box from "@mui/material/Box";

interface TBDProps extends React.PropsWithChildren<{}> {
  component?: WrapperComponent;
  innerComponent?: WrapperComponent;
}

export const TBD = ({
  children,
  // Default component to block "div".
  // This is the same default as Box.
  component = "div",
  // Default innerComponent to inline "span".
  // TBD styling will apply only to the inline text,
  // not to any entire surrounding block.
  innerComponent = "span",
}: TBDProps): React.ReactElement => {
  // MDX does not enforce this.
  assertIsWrapperComponent(component);

  const resultInnerComponent = (
    <Box
      component={innerComponent}
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

  // Create the outer component.
  if (component === innerComponent) {
    // No reason to duplicate the component.
    return resultInnerComponent;
  } else {
    return <Box component={component}>{resultInnerComponent}</Box>;
  }
};

export default TBD;
