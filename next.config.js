/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['mongoose'],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: "https",
                hostname: "replicate.com",
            },
            {
                protocol: "https",
                hostname: "replicate.delivery",
            },
        ],
    },
    webpack(config)
    {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config
    },
}

module.exports = nextConfig