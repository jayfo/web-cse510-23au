/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure build and dev always assume a static export.
  output: "export",

  // Build output to dist directory.
  distDir: "dist",
};

module.exports = nextConfig;
