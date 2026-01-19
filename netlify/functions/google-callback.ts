import { Handler, HandlerEvent } from '@netlify/functions';
import { createOAuth2Client, getTokensFromCode } from '../../lib/google-calendar';

const handler: Handler = async (event: HandlerEvent) => {
    try {
        const { code } = event.queryStringParameters || {};

        if (!code) {
            return {
                statusCode: 400,
                body: 'Missing authorization code',
            };
        }

        const config = {
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            redirectUri: process.env.GOOGLE_REDIRECT_URI || `${process.env.URL}/.netlify/functions/google-callback`,
        };

        const oauth2Client = createOAuth2Client(config);
        const tokens = await getTokensFromCode(oauth2Client, code);

        // In production, you should store these tokens securely in a database
        // For now, we'll redirect to admin with tokens in URL (NOT SECURE for production)
        const redirectUrl = `${process.env.URL}/admin?google_auth=success&access_token=${encodeURIComponent(tokens.access_token || '')}&refresh_token=${encodeURIComponent(tokens.refresh_token || '')}`;

        return {
            statusCode: 302,
            headers: {
                Location: redirectUrl,
            },
            body: '',
        };
    } catch (error: any) {
        console.error('Error in OAuth callback:', error);
        return {
            statusCode: 500,
            body: `Error: ${error.message}`,
        };
    }
};

export { handler };
