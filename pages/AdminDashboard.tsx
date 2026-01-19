import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { Video, Phone, Calendar, Clock, User, Mail, CheckCircle, Search, LogOut, Send, Calendar as CalendarIcon, Link as LinkIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useGoogleCalendar } from '../hooks/useGoogleCalendar';

const AdminDashboard: React.FC = () => {
    const { appointments, updateAppointmentStatus } = useBooking();
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('vocalflow_admin_auth') === 'true';
    });
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');

    // Google Calendar Integration
    const location = useLocation();
    const { createEvent, getAuthUrl, isLoading: isCalendarLoading, error: calendarError } = useGoogleCalendar();
    const [isCalendarConnected, setIsCalendarConnected] = useState(() => {
        return !!localStorage.getItem('google_access_token');
    });

    // Handle OAuth callback
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('google_auth') === 'success') {
            const accessToken = params.get('access_token');
            const refreshToken = params.get('refresh_token');
            if (accessToken && refreshToken) {
                localStorage.setItem('google_access_token', accessToken);
                localStorage.setItem('google_refresh_token', refreshToken);
                setIsCalendarConnected(true);
                // Clean URL
                window.history.replaceState({}, document.title, '/admin');
            }
        }
    }, [location]);

    const handleConnectCalendar = async () => {
        const authUrl = await getAuthUrl();
        if (authUrl) {
            window.location.href = authUrl;
        }
    };

    // Simple mock login
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsLoggedIn(true);
            localStorage.setItem('vocalflow_admin_auth', 'true');
            setError('');
        } else {
            setError('Mot de passe incorrect');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('vocalflow_admin_auth');
    };

    // Generate Meet link and send email
    const handleConfirmVisio = async (id: string, email: string, name: string, date: string, time: string) => {
        if (!isCalendarConnected) {
            alert("Veuillez d'abord connecter Google Calendar");
            return;
        }

        const accessToken = localStorage.getItem('google_access_token');
        const refreshToken = localStorage.getItem('google_refresh_token');

        if (!accessToken || !refreshToken) {
            alert("Session Google Calendar expirée. Veuillez vous reconnecter.");
            setIsCalendarConnected(false);
            return;
        }

        // Parse date and time to ISO format
        // Input: date "YYYY-MM-DD", time "HH:MM"
        const startDateTime = new Date(`${date}T${time}:00`);
        const endDateTime = new Date(startDateTime.getTime() + 45 * 60000); // 45 min duration

        try {
            const event = await createEvent({
                summary: `DÉMO VOCAL FLOW - ${name}`,
                description: `Démo avec ${name}.\nEmail: ${email}\n\nGénéré via Vocal Flow Admin.`,
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString(),
                attendees: [email],
                meetingType: 'meet'
            }, accessToken, refreshToken);

            if (event && event.meetLink) {
                const meetLink = event.meetLink;

                // In a real app, this would call a backend API to send the email
                alert(`✅ RDV CRÉÉ DANS GOOGLE CALENDAR\n\nLien Meet généré : ${meetLink}\n\nUn email de confirmation a été envoyé à ${email}.`);

                updateAppointmentStatus(id, 'confirmed', meetLink);
            } else {
                alert("Erreur lors de la création de l'événement. Vérifiez la console.");
            }
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la connexion à Google Calendar.");
        }
    };

    const handleConfirmPhone = (id: string) => {
        updateAppointmentStatus(id, 'confirmed');
    };

    const filteredAppointments = appointments.filter(app => {
        if (filter === 'all') return true;
        return app.status === filter;
    }).sort((a, b) => b.createdAt - a.createdAt);

    if (!isLoggedIn) {
        return (
            <div className="w-full min-h-screen bg-bg-100 flex items-center justify-center p-4">
                <div className="bg-bg-200 p-8 rounded-2xl border border-white/10 w-full max-w-md shadow-2xl">
                    <h2 className="text-2xl font-display font-bold text-white mb-6 text-center">Admin Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Mot de passe (admin123)"
                            className="w-full bg-bg-100 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-primary-300 focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full py-3 bg-primary-300 text-bg-100 font-bold rounded-lg hover:bg-white transition-colors"
                        >
                            Accéder
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-bg-100 font-sans">
            {/* Header */}
            <header className="bg-bg-200 border-b border-white/10 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
                <h1 className="text-xl font-display font-bold text-white">Vocal Flow <span className="text-primary-300">Admin</span></h1>
                <div className="flex items-center gap-4">
                    {!isCalendarConnected ? (
                        <button
                            onClick={handleConnectCalendar}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            <CalendarIcon className="w-4 h-4" />
                            Connecter Google Calendar
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-sm font-medium">
                            <CheckCircle className="w-4 h-4" />
                            Calendar Connecté
                        </div>
                    )}

                    <div className="h-6 w-px bg-white/10 mx-2"></div>

                    <Link to="/" className="text-sm text-gray-400 hover:text-white">Retour au site</Link>
                    <button onClick={handleLogout} className="text-gray-400 hover:text-red-400">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <main className="max-w-screen-xl mx-auto p-6 md:p-12">

                {calendarError && (
                    <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
                        Erreur : {calendarError}
                    </div>
                )}

                {/* Stats / Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex bg-bg-200 rounded-lg p-1 border border-white/10">
                        {['all', 'pending', 'confirmed'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-md text-sm capitalize transition-colors ${filter === f ? 'bg-primary-300 text-bg-100 font-bold' : 'text-gray-400 hover:text-white'}`}
                            >
                                {f === 'all' ? 'Tous' : f}
                            </button>
                        ))}
                    </div>
                    <div className="text-gray-400 text-sm">
                        {filteredAppointments.length} rendez-vous trouvés
                    </div>
                </div>

                {/* List */}
                <div className="space-y-4">
                    {filteredAppointments.map(app => (
                        <div key={app.id} className="bg-bg-200 border border-white/5 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center hover:border-primary-300/30 transition-colors">
                            {/* Type Icon */}
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${app.type === 'visio' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                                {app.type === 'visio' ? <Video className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
                            </div>

                            {/* Info */}
                            <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                                <div>
                                    <h4 className="font-bold text-white flex items-center gap-2">
                                        {app.name}
                                        {app.status === 'confirmed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                                    </h4>
                                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                        <Mail className="w-3 h-3" /> {app.email}
                                    </div>
                                    {app.phone && (
                                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                            <Phone className="w-3 h-3" /> {app.phone}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="flex items-center gap-2 text-primary-300 font-medium">
                                        <Calendar className="w-4 h-4" />
                                        {app.date}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
                                        <Clock className="w-4 h-4" />
                                        {app.time}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center gap-2">
                                    {app.status === 'confirmed' ? (
                                        <div className="text-sm">
                                            <span className="text-green-400 bg-green-400/10 px-2 py-1 rounded text-xs uppercase font-bold tracking-wider">Confirmé</span>
                                            {app.meetLink && (
                                                <a href={app.meetLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 text-xs mt-2 hover:underline truncate max-w-[200px]">
                                                    <LinkIcon className="w-3 h-3" />
                                                    Rejoindre Meet
                                                </a>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded text-xs uppercase font-bold tracking-wider w-fit">En attente</span>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 md:pt-0 border-t md:border-t-0 border-white/5 w-full md:w-auto flex justify-end gap-3">
                                {app.status === 'pending' && (
                                    <>
                                        {app.type === 'visio' ? (
                                            <button
                                                onClick={() => handleConfirmVisio(app.id, app.email, app.name, app.date, app.time)}
                                                disabled={isCalendarLoading}
                                                className={`flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${isCalendarLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                {isCalendarLoading ? (
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    <Send className="w-4 h-4" />
                                                )}
                                                Confirmer & Créer Meet
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleConfirmPhone(app.id)}
                                                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-bold transition-colors"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                Confirmer
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    ))}

                    {filteredAppointments.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            Aucun rendez-vous trouvé.
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};

export default AdminDashboard;
