import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const clientId = process.env.GOOGLE_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
        const redirectUri = process.env.GOOGLE_REDIRECT_URI || `https://${process.env.VERCEL_URL}/api/google-callback`;

        // Debug logging (will show in Vercel logs)
        console.log('API /google-auth Config Check:');
        console.log('- Client ID Present:', !!clientId);
        console.log('- Client Secret Present:', !!clientSecret);
        console.log('- Redirect URI:', redirectUri);

        if (!clientId || !clientSecret) {
            return res.status(500).json({
                error: 'Configuration manquante',
                details: 'GOOGLE_CLIENT_ID ou GOOGLE_CLIENT_SECRET est manquant dans les variables d\'environnement Vercel.'
            });
        }

        const oauth2Client = new google.auth.OAuth2(
            clientId,
            clientSecret,
            redirectUri
        );

        const scopes = [
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/calendar.events'
        ];

        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            prompt: 'consent'
        });

        return res.status(200).json({ authUrl });
    } catch (error: any) {
        console.error('Error handling /google-auth:', error);
        return res.status(500).json({
            error: 'Erreur interne',
            details: error.message
        });
    }
}
