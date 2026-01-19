import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppointmentType = 'visio' | 'phone';
export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Appointment {
    id: string;
    type: AppointmentType;
    date: string; // ISO string 
    time: string;
    name: string;
    email: string;
    phone?: string;
    status: AppointmentStatus;
    meetLink?: string; // For confirmed visio appointments
    createdAt: number;
}

interface BookingContextType {
    appointments: Appointment[];
    addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => void;
    updateAppointmentStatus: (id: string, status: AppointmentStatus, meetLink?: string) => void;
    deleteAppointment: (id: string) => void;
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [appointments, setAppointments] = useState<Appointment[]>(() => {
        const saved = localStorage.getItem('vocalflow_appointments');
        try {
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Failed to parse appointments", e);
            return [];
        }
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Save to localStorage whenever appointments change
    useEffect(() => {
        localStorage.setItem('vocalflow_appointments', JSON.stringify(appointments));
    }, [appointments]);

    const addAppointment = (data: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
        const newAppointment: Appointment = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            status: 'pending',
            createdAt: Date.now(),
        };
        setAppointments(prev => [newAppointment, ...prev]);
    };

    const updateAppointmentStatus = (id: string, status: AppointmentStatus, meetLink?: string) => {
        setAppointments(prev => prev.map(app =>
            app.id === id ? { ...app, status, meetLink } : app
        ));
    };

    const deleteAppointment = (id: string) => {
        setAppointments(prev => prev.filter(app => app.id !== id));
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <BookingContext.Provider value={{
            appointments,
            addAppointment,
            updateAppointmentStatus,
            deleteAppointment,
            isModalOpen,
            openModal,
            closeModal
        }}>
            {children}
        </BookingContext.Provider>
    );
};
