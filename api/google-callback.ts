import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createOAuth2Client, getTokensFromCode } from '../lib/google-calendar';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const { code } = req.query;

        if (!code || typeof code !== 'string') {
            return res.status(400).send('Missing authorization code');
        }

        const config = {
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            redirectUri: process.env.GOOGLE_REDIRECT_URI || `${process.env.VERCEL_URL}/api/google-callback`,
        };

        const oauth2Client = createOAuth2Client(config);
        const tokens = await getTokensFromCode(oauth2Client, code);

        // In production, you should store these tokens securely in a database
        // For now, we'll redirect to admin with tokens in URL (NOT SECURE for production)
        const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
        const redirectUrl = `${baseUrl}/admin?google_auth=success&access_token=${encodeURIComponent(tokens.access_token || '')}&refresh_token=${encodeURIComponent(tokens.refresh_token || '')}`;

        return res.redirect(302, redirectUrl);
    } catch (error: any) {
        console.error('Error in OAuth callback:', error);
        return res.status(500).send(`Error: ${error.message}`);
    }
}
