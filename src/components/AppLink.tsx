import * as React from "react";

import MUILink from "@mui/material/Link";
import NextJSLink from "next/link";

interface AppLinkProps extends React.PropsWithChildren<{}> {
  href: string;
  linkType?: "auto" | "internal" | "external" | "file";
}

export const AppLink = ({
  children,
  href,
  // Default linkType to "auto".
  linkType = "auto",
}: AppLinkProps): React.ReactElement => {
  // Determine whether this link is external to the app.
  // In that case, we should not use the app internal Link component.
  function isExternalLink(): boolean {
    if (linkType === "internal") {
      return false;
    }

    return (
      linkType === "external" ||
      href.startsWith("http:") ||
      href.startsWith("https:")
    );
  }

  // Determine whether this link is a file to be downloaded / viewed.
  // Such a file may be within the app, but should not use the app internal Link component.
  function isFile(): boolean {
    return (
      linkType === "file" ||
      href.toLocaleLowerCase().endsWith(".mp4") ||
      href.toLocaleLowerCase().endsWith(".pdf") ||
      href.toLocaleLowerCase().endsWith(".ppt")
    );
  }

  // Both types of link are rendered as <Link /> so it's easier to consistently style them.
  // Passing the <RouterLink /> as component then gets the desired behavior.
  //
  // External links and file downloads are currently treated the same
  if (isExternalLink() || isFile()) {
    // External links use normal MUI <Link>, are opened in "_blank".
    return (
      <MUILink href={href} target="_blank" rel="noopener">
        {children}
      </MUILink>
    );
  } else {
    // Internal links use NextJS <Link>, opened without a page load.
    return (
      <MUILink component={NextJSLink} href={href}>
        {children}
      </MUILink>
    );
  }
};

export default AppLink;
