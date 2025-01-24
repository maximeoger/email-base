import NextIntlPlugin from "next-intl/plugin";
//const withNextIntl = require("next-intl/plugin")();

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
});

