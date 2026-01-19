import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    console.log('[Google Callback] Starting...');

    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { code } = req.query;
        console.log('[Google Callback] Code received:', code ? 'YES' : 'NO');

        if (!code || typeof code !== 'string') {
            return res.status(400).json({ error: 'Missing authorization code' });
        }

        const clientId = process.env.GOOGLE_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

        // Ensure we use the exact same redirect URI logic as /google-auth
        // Priority: Env Var > Vercel Custom Domain > Vercel URL
        const redirectUri = process.env.GOOGLE_REDIRECT_URI || `https://${process.env.VERCEL_URL}/api/google-callback`;

        console.log('[Google Callback] Config:', {
            hasClientId: !!clientId,
            hasClientSecret: !!clientSecret,
            redirectUri
        });

        if (!clientId || !clientSecret) {
            throw new Error("Missing Server Credentials (GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET)");
        }

        const oauth2Client = new google.auth.OAuth2(
            clientId,
            clientSecret,
            redirectUri
        );

        console.log('[Google Callback] Exchanging code for tokens...');
        const { tokens } = await oauth2Client.getToken(code);
        console.log('[Google Callback] Tokens received:', !!tokens);

        // Redirect logic using standard Node.js response
        // Using relative path '/admin' relies on the browser resolving it against the current domain (api/google-callback -> admin)
        // Ideally we want absolute URL to be safe

        // We can try to infer origin from headers if possible, or fallback to relative
        const protocol = req.headers['x-forwarded-proto'] || 'https';
        const host = req.headers['host'];
        const baseUrl = host ? `${protocol}://${host}` : ''; // If no host, empty string implies relative path might loop or fail, but usually host is present.

        // Safer fallback: hardcode the known domain if Env Var is missing? 
        // Or just use relative path "/admin" which works on same domain.
        const targetUrl = `/admin?google_auth=success&access_token=${encodeURIComponent(tokens.access_token || '')}&refresh_token=${encodeURIComponent(tokens.refresh_token || '')}`;

        console.log('[Google Callback] Redirecting to:', targetUrl);

        res.writeHead(302, { Location: targetUrl });
        res.end();

    } catch (error: any) {
        console.error('[Google Callback] CRASH:', error);

        // Attempt to return JSON error if headers sent, otherwise text
        if (!res.headersSent) {
            res.status(500).json({
                error: 'Callback Process Failed',
                message: error.message,
                stack: error.stack
            });
        }
    }
}
