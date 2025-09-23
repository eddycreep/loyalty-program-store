/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Configure image domains to allow external image sources
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.squarespace-cdn.com',
                port: '',
                pathname: '/**',
            },
            // Add other potential image domains if needed
            {
                protocol: 'https',
                hostname: '**', // Allow all HTTPS domains for flexibility
                port: '',
                pathname: '/**',
            },
        ],
    },
}

export default nextConfig