// MDX Configuration.
// https://nextjs.org/docs/pages/building-your-application/configuring/mdx
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    // If we later use remark-gfm, we will need to use next.config.mjs.
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure build and dev always assume a static export.
  output: "export",

  // Build output to dist directory.
  distDir: "dist",

  // Configure pageExtensions to include md and mdx.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

  experimental: {
    // Disable mdxRs in order to allow plugins.
    mdxRs: false,
  },
};

module.exports = withMDX(nextConfig);
