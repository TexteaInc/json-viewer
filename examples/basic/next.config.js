/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  images: {
    domains: ['i.imgur.com', 'www.netlify.com']
  },
  experimental: {
    externalDir: true
  }
}

const withTM = require('next-transpile-modules')([], {
  resolveSymlinks: true,
  debug: false
})

module.exports = withTM(nextConfig)
