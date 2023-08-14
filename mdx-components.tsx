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
    a: ({ children, href }) => {
      assertNotNull(href);

      return <AppLink href={href}>{children}</AppLink>;
    },
    ...components,
  };
}
