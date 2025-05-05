import nextra from 'nextra'

const withNextra = nextra({
  staticImage: true,
  defaultShowCopyCode: true
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.imgur.com', 'www.netlify.com']
  },
  transpilePackages: ['@textea/json-viewer']
}

export default withNextra(nextConfig)
