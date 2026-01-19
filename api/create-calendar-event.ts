import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

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
        const { accessToken, refreshToken, event: calendarEvent } = req.body;

        console.log('[Create Event] Request received for:', calendarEvent?.summary);

        if (!accessToken) {
            console.error('[Create Event] Missing access token');
            return res.status(401).json({ error: 'Missing access token' });
        }

        const clientId = process.env.GOOGLE_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
        const redirectUri = process.env.GOOGLE_REDIRECT_URI || `https://${process.env.VERCEL_URL}/api/google-callback`;

        if (!clientId || !clientSecret) {
            console.error('[Create Event] Missing credentials env vars');
            return res.status(500).json({ error: 'Server configuration error: Missing Google Credentials' });
        }

        const oauth2Client = new google.auth.OAuth2(
            clientId,
            clientSecret,
            redirectUri
        );

        oauth2Client.setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken, // Important: allows refreshing if access token is old
        });

        // Event resource structure
        const eventResource: any = {
            summary: calendarEvent.summary,
            description: calendarEvent.description,
            start: {
                dateTime: calendarEvent.startTime,
                timeZone: 'Europe/Paris',
            },
            end: {
                dateTime: calendarEvent.endTime,
                timeZone: 'Europe/Paris',
            },
            attendees: calendarEvent.attendees?.map((email: string) => ({ email })),
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 },
                    { method: 'popup', minutes: 30 },
                ],
            },
        };

        // Add Google Meet conference if requested
        if (calendarEvent.meetingType === 'meet') {
            eventResource.conferenceData = {
                createRequest: {
                    requestId: `meet-${Date.now()}`,
                    conferenceSolutionKey: { type: 'hangoutsMeet' },
                },
            };
        }

        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        console.log('[Create Event] Inserting event to Google Calendar...');
        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: eventResource,
            conferenceDataVersion: calendarEvent.meetingType === 'meet' ? 1 : 0,
            sendUpdates: 'all',
        });

        const createdEvent = response.data;
        console.log('[Create Event] Success! Event ID:', createdEvent.id);

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
        console.error('[Create Event] CRASH:', error);
        return res.status(500).json({
            error: error.message,
            details: error.response?.data || 'No additional details'
        });
    }
}
