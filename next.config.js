/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/thumbnail/:videoID/:path*",
      destination: "/api/thumbnail/:videoID/:path*",
    },
  ],
};

export default config;
