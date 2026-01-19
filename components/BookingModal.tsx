import React, { useState } from 'react';
import { X, Video, Phone, Calendar, Clock, User, Mail, CheckCircle, Smartphone } from 'lucide-react';
import { useBooking, AppointmentType } from '../context/BookingContext';

const BookingModal: React.FC = () => {
    const { addAppointment, isModalOpen, closeModal } = useBooking();
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [type, setType] = useState<AppointmentType | null>(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

    if (!isModalOpen) return null;

    const handleNext = () => setStep(prev => (prev < 4 ? prev + 1 : prev) as 1 | 2 | 3 | 4);
    const handleBack = () => setStep(prev => (prev > 1 ? prev - 1 : prev) as 1 | 2 | 3 | 4);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (type && date && time && formData.name && formData.email) {
            addAppointment({
                type,
                date,
                time,
                name: formData.name,
                email: formData.email,
                phone: formData.phone
            });
            handleNext(); // Go to step 4 (Success)
        }
    };

    // Close and Reset
    const handleClose = () => {
        closeModal();
        // Reset state after transition
        setTimeout(() => {
            setStep(1);
            setType(null);
            setDate('');
            setTime('');
            setFormData({ name: '', email: '', phone: '' });
        }, 300);
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-bg-200 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
                    <h3 className="text-xl font-display font-bold text-white">Prendre Rendez-vous</h3>
                    <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/5">
                    <div
                        className="h-full bg-primary-300 transition-all duration-300 ease-out"
                        style={{ width: `${(step / 4) * 100}%` }}
                    />
                </div>

                <div className="p-6">
                    {/* Step 1: Type Selection */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <h4 className="text-lg text-white font-medium text-center mb-8">Comment souhaitez-vous échanger ?</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => { setType('visio'); handleNext(); }}
                                    className="group p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-primary-300/10 hover:border-primary-300/50 transition-all duration-300 flex flex-col items-center gap-4"
                                >
                                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Video className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <span className="font-display font-bold text-white">Visio Conférence</span>
                                    <span className="text-xs text-gray-400 text-center">Via Google Meet. Idéal pour une démo.</span>
                                </button>
                                <button
                                    onClick={() => { setType('phone'); handleNext(); }}
                                    className="group p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-primary-300/10 hover:border-primary-300/50 transition-all duration-300 flex flex-col items-center gap-4"
                                >
                                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Smartphone className="w-8 h-8 text-green-400" />
                                    </div>
                                    <span className="font-display font-bold text-white">Appel Téléphonique</span>
                                    <span className="text-xs text-gray-400 text-center">Direct et rapide. Pour vos questions.</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Date & Time */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h4 className="text-lg text-white font-medium text-center">Choisissez un créneau</h4>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="date"
                                            className="w-full bg-bg-100 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-primary-300 focus:outline-none"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]} // Disable past dates
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Heure</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map(t => (
                                            <button
                                                key={t}
                                                onClick={() => setTime(t)}
                                                className={`py-2 rounded-lg text-sm transition-colors ${time === t ? 'bg-primary-300 text-bg-100 font-bold' : 'bg-bg-100 text-gray-300 hover:bg-white/10'}`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <button
                                    onClick={handleBack}
                                    className="text-gray-400 hover:text-white text-sm font-medium px-4 py-2 hover:bg-white/5 rounded-lg transition-colors"
                                >
                                    Retour
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={!date || !time}
                                    className="px-6 py-2 bg-primary-300 text-bg-100 font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                                >
                                    Suivant
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Contact Form */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h4 className="text-lg text-white font-medium text-center">Vos Coordonnées</h4>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-4">
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="text"
                                            placeholder="Votre Nom"
                                            required
                                            className="w-full bg-bg-100 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-primary-300 focus:outline-none"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="email"
                                            placeholder="Votre Email"
                                            required
                                            className="w-full bg-bg-100 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-primary-300 focus:outline-none"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    {type === 'phone' && (
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="tel"
                                                placeholder="Numéro de téléphone"
                                                required
                                                className="w-full bg-bg-100 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-primary-300 focus:outline-none"
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="text-gray-400 hover:text-white text-sm font-medium px-4 py-3 hover:bg-white/5 rounded-lg transition-colors"
                                    >
                                        Retour
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 bg-gradient-to-r from-primary-300 to-neon-blue text-bg-100 font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
                                    >
                                        Confirmer le RDV
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Step 4: Success */}
                    {step === 4 && (
                        <div className="text-center py-8 space-y-4">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Rendez-vous Confirmé !</h3>
                            <p className="text-gray-300">
                                Merci {formData.name}. Nous avons bien reçu votre demande pour le <span className="text-primary-300">{date} à {time}</span>.
                            </p>
                            <p className="text-sm text-gray-500">
                                Un email de confirmation vous sera envoyé prochainement à {formData.email}.
                            </p>
                            <button
                                onClick={handleClose}
                                className="mt-8 px-8 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
                            >
                                Fermer
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
