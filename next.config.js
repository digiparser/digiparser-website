
const { withContentlayer } = require("next-contentlayer")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.digiparser.com',
      },
      {
        protocol: 'https',
        hostname: 'app.digiparser.com',
      },
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
      },
      {
        protocol: 'https',
        hostname: 'marketplace.canva.com',
      },
      {
        protocol: 'https',
        hostname: 'template.canva.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
      }
    ],
  },
}

module.exports = withContentlayer(nextConfig)
