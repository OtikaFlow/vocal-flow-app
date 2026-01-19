import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createOAuth2Client, getAuthUrl } from '../lib/google-calendar';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const config = {
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            redirectUri: process.env.GOOGLE_REDIRECT_URI || `${process.env.VERCEL_URL}/api/google-callback`,
        };

        if (!config.clientId || !config.clientSecret) {
            return res.status(500).json({ error: 'Google OAuth credentials not configured' });
        }

        const oauth2Client = createOAuth2Client(config);
        const authUrl = getAuthUrl(oauth2Client);

        return res.status(200).json({ authUrl });
    } catch (error: any) {
        console.error('Error generating auth URL:', error);
        return res.status(500).json({ error: error.message });
    }
}
