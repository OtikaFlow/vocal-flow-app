import { google } from 'googleapis';

export interface CalendarEvent {
    summary: string;
    description?: string;
    startTime: string; // ISO 8601 format
    endTime: string; // ISO 8601 format
    attendees?: string[]; // email addresses
    meetingType?: 'meet' | 'phone';
}

export interface GoogleCalendarConfig {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
}

/**
 * Create OAuth2 client for Google Calendar API
 */
export function createOAuth2Client(config: GoogleCalendarConfig) {
    const { clientId, clientSecret, redirectUri } = config;

    return new google.auth.OAuth2(
        clientId,
        clientSecret,
        redirectUri
    );
}

/**
 * Generate authorization URL for OAuth flow
 */
export function getAuthUrl(oauth2Client: any): string {
    const scopes = [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events'
    ];

    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        prompt: 'consent'
    });
}

/**
 * Exchange authorization code for tokens
 */
export async function getTokensFromCode(oauth2Client: any, code: string) {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
}

/**
 * Create a calendar event with optional Google Meet link
 */
export async function createCalendarEvent(
    oauth2Client: any,
    event: CalendarEvent
): Promise<any> {
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const eventResource: any = {
        summary: event.summary,
        description: event.description,
        start: {
            dateTime: event.startTime,
            timeZone: 'Europe/Paris',
        },
        end: {
            dateTime: event.endTime,
            timeZone: 'Europe/Paris',
        },
        attendees: event.attendees?.map(email => ({ email })),
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'email', minutes: 24 * 60 }, // 1 day before
                { method: 'popup', minutes: 30 }, // 30 minutes before
            ],
        },
    };

    // Add Google Meet conference if requested
    if (event.meetingType === 'meet') {
        eventResource.conferenceData = {
            createRequest: {
                requestId: `meet-${Date.now()}`,
                conferenceSolutionKey: { type: 'hangoutsMeet' },
            },
        };
    }

    const response = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: eventResource,
        conferenceDataVersion: event.meetingType === 'meet' ? 1 : 0,
        sendUpdates: 'all', // Send email notifications to attendees
    });

    return response.data;
}

/**
 * Get upcoming events from calendar
 */
export async function getUpcomingEvents(
    oauth2Client: any,
    maxResults: number = 10
): Promise<any[]> {
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const response = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults,
        singleEvents: true,
        orderBy: 'startTime',
    });

    return response.data.items || [];
}

/**
 * Delete a calendar event
 */
export async function deleteCalendarEvent(
    oauth2Client: any,
    eventId: string
): Promise<void> {
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    await calendar.events.delete({
        calendarId: 'primary',
        eventId,
    });
}

/**
 * Update a calendar event
 */
export async function updateCalendarEvent(
    oauth2Client: any,
    eventId: string,
    updates: Partial<CalendarEvent>
): Promise<any> {
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // First, get the existing event
    const existingEvent = await calendar.events.get({
        calendarId: 'primary',
        eventId,
    });

    // Merge updates
    const updatedEvent = {
        ...existingEvent.data,
        summary: updates.summary || existingEvent.data.summary,
        description: updates.description || existingEvent.data.description,
        start: updates.startTime ? {
            dateTime: updates.startTime,
            timeZone: 'Europe/Paris',
        } : existingEvent.data.start,
        end: updates.endTime ? {
            dateTime: updates.endTime,
            timeZone: 'Europe/Paris',
        } : existingEvent.data.end,
    };

    const response = await calendar.events.update({
        calendarId: 'primary',
        eventId,
        requestBody: updatedEvent,
        sendUpdates: 'all',
    });

    return response.data;
}
