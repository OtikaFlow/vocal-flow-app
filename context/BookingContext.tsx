import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';

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
    addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => Promise<void>;
    updateAppointmentStatus: (id: string, status: AppointmentStatus, meetLink?: string) => Promise<void>;
    deleteAppointment: (id: string) => Promise<void>;
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
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Real-time synchronization with Firestore
    useEffect(() => {
        const q = query(collection(db, "appointments"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const apps: Appointment[] = [];
            snapshot.forEach((doc) => {
                apps.push({ id: doc.id, ...doc.data() } as Appointment);
            });
            setAppointments(apps);
        });

        return () => unsubscribe();
    }, []);

    const addAppointment = async (data: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
        try {
            await addDoc(collection(db, "appointments"), {
                ...data,
                status: 'pending',
                createdAt: Date.now(),
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const updateAppointmentStatus = async (id: string, status: AppointmentStatus, meetLink?: string) => {
        const appointmentRef = doc(db, "appointments", id);
        try {
            await updateDoc(appointmentRef, { status, ...(meetLink ? { meetLink } : {}) });
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    };

    const deleteAppointment = async (id: string) => {
        try {
            await deleteDoc(doc(db, "appointments", id));
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
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
