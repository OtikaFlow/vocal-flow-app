import { Handler, HandlerEvent } from '@netlify/functions';
import { createOAuth2Client, createCalendarEvent, CalendarEvent } from '../../lib/google-calendar';

const handler: Handler = async (event: HandlerEvent) => {
    // Handle CORS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
            },
            body: '',
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    try {
        const { accessToken, refreshToken, event: calendarEvent } = JSON.parse(event.body || '{}') as {
            accessToken: string;
            refreshToken: string;
            event: CalendarEvent;
        };

        if (!accessToken) {
            return {
                statusCode: 401,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ error: 'Missing access token' }),
            };
        }

        const config = {
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            redirectUri: process.env.GOOGLE_REDIRECT_URI || `${process.env.URL}/.netlify/functions/google-callback`,
        };

        const oauth2Client = createOAuth2Client(config);
        oauth2Client.setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken,
        });

        // Create the calendar event
        const createdEvent = await createCalendarEvent(oauth2Client, calendarEvent);

        // Extract Google Meet link if available
        const meetLink = createdEvent.conferenceData?.entryPoints?.find(
            (entry: any) => entry.entryPointType === 'video'
        )?.uri;

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                success: true,
                event: {
                    id: createdEvent.id,
                    htmlLink: createdEvent.htmlLink,
                    meetLink,
                    summary: createdEvent.summary,
                    start: createdEvent.start,
                    end: createdEvent.end,
                },
            }),
        };
    } catch (error: any) {
        console.error('Error creating calendar event:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                error: error.message,
                details: error.response?.data || 'No additional details'
            }),
        };
    }
};

export { handler };
