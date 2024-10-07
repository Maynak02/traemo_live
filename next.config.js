/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config.js");
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  i18n: {
    locales: ["de", "en"],
    defaultLocale: "de",
    localeDetection: false,
  },
  compiler: {
    styledComponents: true,
  },

  env: {
    NEXT_PUBLIC_PROJECT_ENV: process.env.NEXT_PUBLIC_PROJECT_ENV,
  },
  reactStrictMode: false,
};
