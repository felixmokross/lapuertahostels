import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [{ source: "/", destination: "/admin", permanent: false }];
  },
};

export default withPayload(nextConfig);
