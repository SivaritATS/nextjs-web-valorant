module.exports = {
  images: {
    domains: [
      'cmsassets.rgpub.io',
      'static.wikia.nocookie.net'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cmsassets.rgpub.io',
        pathname: '/sanity/images/**',
      },
      {
        protocol: 'https',
        hostname: 'static.wikia.nocookie.net',
        pathname: '/**',
      },
    ],
  },

  webpack: (config) => {
    config.resolve.fallback = { 
      net: false,
      tls: false,
      dns: false,
      fs: false 
    };
    return config;
  }
};