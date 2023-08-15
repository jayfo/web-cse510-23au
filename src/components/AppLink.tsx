import * as React from "react";

import MUILink from "@mui/material/Link";
import NextJSLink, { LinkProps as NextJSLinkProps } from "next/link";

interface NextJSMUILinkProps extends NextJSLinkProps, React.PropsWithChildren {}
export const NextJSMUILink = ({
  children,
  href,
}: NextJSMUILinkProps): React.ReactElement => {
  // Because MUILink internally provides the <a> element, we need passHref and legacyBehavior.
  //
  // As of 2023-08-14, this is described with the pages router:
  // https://nextjs.org/docs/pages/api-reference/components/link
  //
  // As of 2023-08-14, this is not explicitly described with the app router:
  // https://nextjs.org/docs/app/api-reference/components/link
  //
  // Without this, links were behaving strangely
  // (e.g., not always honoring the hash component of a link).
  //
  // As of 2023-08-14, the NextJS <Link> prefetch functionality was problematic.
  // Perhaps due to a negative interaction with the MUI <Link> hover behavior.
  // Use Chrome to view a page, follow a <Link>, and then go back.
  // Upon hovering over that same link, the app navigates to that link (i.e., without a click).
  // Prefetch is therefore intentionally disabled here.
  return (
    <NextJSLink prefetch={false} href={href} passHref legacyBehavior>
      <MUILink>{children}</MUILink>
    </NextJSLink>
  );
};

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
    // External links use a normal MUI <Link>, are opened in "_blank".
    return (
      <MUILink href={href} target="_blank" rel="noopener">
        {children}
      </MUILink>
    );
  } else {
    // Internal links use a NextJS <Link>, are opened without a page load.
    return <NextJSMUILink href={href}>{children}</NextJSMUILink>;
  }
};

export default AppLink;
