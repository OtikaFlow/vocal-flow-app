import { useState } from 'react';

export interface CalendarEventData {
    summary: string;
    description?: string;
    startTime: string;
    endTime: string;
    attendees?: string[];
    meetingType?: 'meet' | 'phone';
}

export interface CalendarEventResult {
    id: string;
    htmlLink: string;
    meetLink?: string;
    summary: string;
    start: any;
    end: any;
}

export function useGoogleCalendar() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createEvent = async (
        eventData: CalendarEventData,
        accessToken: string,
        refreshToken: string
    ): Promise<CalendarEventResult | null> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/create-calendar-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accessToken,
                    refreshToken,
                    event: eventData,
                }),
            });

            // Check content type for JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create calendar event');
            }

            const data = await response.json();
            setIsLoading(false);
            return data.event;
        } catch (err: any) {
            console.error('API Error:', err);
            // Handle JSON parse errors from HTML responses
            if (err.message.includes('Unexpected token') || err.message.includes('JSON')) {
                setError('API non disponible. Assurez-vous de lancer le site avec "npm run start" (Netlify Dev).');
            } else {
                setError(err.message);
            }
            setIsLoading(false);
            return null;
        }
    };

    const getAuthUrl = async (): Promise<string | null> => {
        try {
            const response = await fetch('/api/google-auth');

            // Check content type for JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data.authUrl;
        } catch (err: any) {
            console.error('API Error:', err);
            if (err.message.includes('Unexpected token') || err.message.includes('JSON')) {
                setError('API non disponible. Assurez-vous de lancer le site avec "npm run start" (Netlify Dev).');
            } else {
                setError(err.message);
            }
            return null;
        }
    };

    return {
        createEvent,
        getAuthUrl,
        isLoading,
        error,
    };
}
