/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const nextConfig = {
  reactStrictMode: true,
  i18n,
  transpilePackages: ['react-countup'],
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
  },
}

module.exports = nextConfig
