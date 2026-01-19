import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

const CtaSection: React.FC = () => {
    const { openModal } = useBooking();
    const navigate = useNavigate();

    return (
        <section id="demo" className="relative w-full py-32 bg-gradient-to-b from-bg-100 to-bg-200 border-t border-white/5 overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px]" style={{ backgroundColor: 'rgba(172, 194, 239, 0.1)' }}></div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">
                    Demandez votre démo en <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-white">LIVE</span>
                </h2>

                <p className="font-sans text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                    Découvrez comment Vocal Flow peut améliorer l’engagement vocal et augmenter les conversions avec une intelligence vocale naturelle et performante.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    {/* Primary CTA - Booking */}
                    <button
                        onClick={openModal}
                        className="group relative inline-flex items-center justify-center px-10 py-5 font-display font-bold text-black transition-all duration-200 bg-white rounded-full focus:outline-none hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)] w-full md:w-auto"
                    >
                        <span className="relative flex items-center gap-3">
                            PLANIFIER UNE DÉMO LIVE <Calendar className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                        </span>
                    </button>

                    {/* Secondary CTA - Contact/Quote */}
                    <button
                        onClick={() => navigate('/contact')}
                        className="group relative inline-flex items-center justify-center px-10 py-5 font-display font-bold text-white transition-all duration-200 bg-white/5 border border-white/20 rounded-full focus:outline-none hover:bg-white/10 hover:border-white/40 w-full md:w-auto"
                    >
                        <span className="relative flex items-center gap-3">
                            OBTENIR UN DEVIS <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
