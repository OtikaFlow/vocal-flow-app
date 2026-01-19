import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createOAuth2Client, createCalendarEvent, CalendarEvent } from '../lib/google-calendar';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    try {
        const { accessToken, refreshToken, event: calendarEvent } = req.body as {
            accessToken: string;
            refreshToken: string;
            event: CalendarEvent;
        };

        if (!accessToken) {
            return res.status(401).json({ error: 'Missing access token' });
        }

        const config = {
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            redirectUri: process.env.GOOGLE_REDIRECT_URI || `${process.env.VERCEL_URL}/api/google-callback`,
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

        return res.status(200).json({
            success: true,
            event: {
                id: createdEvent.id,
                htmlLink: createdEvent.htmlLink,
                meetLink,
                summary: createdEvent.summary,
                start: createdEvent.start,
                end: createdEvent.end,
            },
        });
    } catch (error: any) {
        console.error('Error creating calendar event:', error);
        return res.status(500).json({
            error: error.message,
            details: error.response?.data || 'No additional details'
        });
    }
}
