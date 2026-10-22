/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Investor page is hidden for now; the code stays in app/investor
  async redirects() {
    return [{ source: '/investor', destination: '/', permanent: false }]
  },
}

module.exports = nextConfig
