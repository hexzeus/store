// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'files.cdn.printful.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: `
                            default-src 'self';
                            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.stripe.com https://*.stripe.network https://js.stripe.com;
                            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                            font-src 'self' https://fonts.gstatic.com;
                            img-src 'self' data: https: blob:;
                            media-src 'self' https: data: blob:;
                            connect-src 'self' https://*.stripe.com https://*.stripe.network;
                            frame-src 'self' https://*.stripe.com https://*.stripe.network;
                            object-src 'none';
                            base-uri 'self';
                            form-action 'self' https://*.stripe.com;
                            upgrade-insecure-requests;
                        `.replace(/\s{2,}/g, ' ').trim(),
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
