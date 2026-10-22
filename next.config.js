/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: { optimizeCss: true },
  webpack(config, { dev }) {
    // Next 14's development filesystem cache is unreliable when multiple
    // Windows dev processes briefly share .next. Production caching is kept.
    if (dev) config.cache = false;
    return config;
  },
};

module.exports = nextConfig;
