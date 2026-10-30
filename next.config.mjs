if (process.env.NODE_ENV === 'development') {
  process.env.CHOKIDAR_USEPOLLING = 'true'
  process.env.CHOKIDAR_INTERVAL = '500'
  process.env.WATCHPACK_POLLING = 'true'
}

import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  async redirects() {
    return [
      { source: '/opengraph-image', destination: '/og/image.png', permanent: true },
      { source: '/CI-CD/:slug*', destination: '/docs/ci-cd/:slug*', permanent: true },
      { source: '/Containerization/:slug*', destination: '/docs/containerization/:slug*', permanent: true },
      { source: '/Cloud/:slug*', destination: '/docs/cloud/:slug*', permanent: true },
      { source: '/Infrastructure-Management/:slug*', destination: '/docs/infrastructure-management/:slug*', permanent: true },
      { source: '/Monitoring/:slug*', destination: '/docs/monitoring/:slug*', permanent: true },
      { source: '/Networking/:slug*', destination: '/docs/networking/:slug*', permanent: true },
      { source: '/Security/:slug*', destination: '/docs/security/:slug*', permanent: true },
      { source: '/Version-Control/:slug*', destination: '/docs/version-control/:slug*', permanent: true },
    ]
  },
  async rewrites() {
    return [
      { source: '/docs.md', destination: '/llms.mdx/docs' },
      { source: '/docs/:path+.md', destination: '/llms.mdx/docs/:path+' },
    ]
  },
}

export default withMDX(config)
