import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

const corsMiddleware = Cors({
    methods: ['GET', 'HEAD', 'POST', 'OPTIONS'],
    origin: process.env.NEXT_PUBLIC_FRONTEND_URL || '*',
    credentials: true,
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function): Promise<any> {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export function withCors(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
    return async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
        try {
            await runMiddleware(req, res, corsMiddleware);
            await handler(req, res);
        } catch (error) {
            console.error('CORS or handler error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}