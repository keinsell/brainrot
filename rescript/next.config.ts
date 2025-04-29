import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  compiler: {
    styledComponents: true,
    removeConsole: true,
  },
  experimental: {
    typedEnv: true,
    cssChunking: true,
    dynamicIO: true,
    inlineCss: true,
    ppr: "incremental",
    useLightningcss: false,
    viewTransition: true,
    useCache: true,
    mdxRs: true,
    authInterrupts: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
