import { Handler, HandlerEvent } from '@netlify/functions';
import { createOAuth2Client, getAuthUrl } from '../../lib/google-calendar';

const handler: Handler = async (event: HandlerEvent) => {
    // Handle CORS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            },
            body: '',
        };
    }

    try {
        const config = {
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            redirectUri: process.env.GOOGLE_REDIRECT_URI || `${process.env.URL}/.netlify/functions/google-callback`,
        };

        if (!config.clientId || !config.clientSecret) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Google OAuth credentials not configured' }),
            };
        }

        const oauth2Client = createOAuth2Client(config);
        const authUrl = getAuthUrl(oauth2Client);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ authUrl }),
        };
    } catch (error: any) {
        console.error('Error generating auth URL:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ error: error.message }),
        };
    }
};

export { handler };
