import NextIntlPlugin from "next-intl/plugin";

const withNextIntl = NextIntlPlugin()

export default withNextIntl({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/ingest/:path*",
        destination: "https://eu.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://eu.posthog.com/decide",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://eu.posthog.com/array/:path*"
      }
    ]
  },
  skipTrailingSlashRedirect: true,
});

