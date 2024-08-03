import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname, 'src');
        return config;
    },
    images: {
        domains: ['files.cdn.printful.com'],
        unoptimized: true,
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
                      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.stripe.com https://*.stripe.network;
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
                    `.replace(/\s{2,}/g, ' ').trim()
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()'
                    }
                ],
            },
        ];
    },
    env: {
        STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    },
};

export default nextConfig;