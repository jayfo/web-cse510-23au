// Required to use MDX in app directory, based on example:
// https://github.com/vercel/next.js/tree/canary/examples/app-dir-mdx
// Accessed 2023-07-21.

import * as React from "react";

import AppLink from "@/components/AppLink";
import { assertNotNull } from "@/types/Guards";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,

    // MDX links should all be our AppLink.
    a: ({ children, href }) => {
      assertNotNull(href);

      return <AppLink href={href}>{children}</AppLink>;
    },

    // MDX is by default using raw html heading tags.
    // This means MUI theming is not being applied to them.
    // If we wanted to apply MUI theming, we would start with this.
    // As is, the default MUI them heading font-sizes are much too large.
    //
    // h1: ({ children}) => {
    //   return <Typography variant="h1">{children}</Typography>
    // },
    // h2: ({ children}) => {
    //   return <Typography variant="h2">{children}</Typography>
    // },
    // h3: ({ children}) => {
    //   return <Typography variant="h3">{children}</Typography>
    // },
    // h4: ({ children}) => {
    //   return <Typography variant="h4">{children}</Typography>
    // },
    // h5: ({ children}) => {
    //   return <Typography variant="h5">{children}</Typography>
    // },
    // h6: ({ children}) => {
    //   return <Typography variant="h6">{children}</Typography>
    // },

    ...components,
  };
}
