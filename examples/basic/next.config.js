/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  experimental: {
    externalDir: true
  }
}

const withTM = require('next-transpile-modules')([], {
  resolveSymlinks: true,
  debug: false
})

module.exports = withTM(nextConfig)
