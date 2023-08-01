import * as React from "react";

import Box from "@mui/material/Box";

interface TBDProps extends React.PropsWithChildren<{}> {}

const TBD: React.FunctionComponent<TBDProps> = ({ children }: TBDProps) => {
  return (
    <Box
      sx={{
        display: "inline",
        // Apply a background to this element.
        backgroundColor: "lightpink",
        // Apply a background to immediate descendents of this element.
        "& > *": {
          backgroundColor: "lightpink",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default TBD;
