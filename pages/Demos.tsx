import React, { useEffect, useState } from 'react';
import { SparklesCore } from '../components/ui/aceternity/sparkles';
import { ScrollReveal } from '../components/ui/scroll-reveal';
import { Building2, Phone, Wrench, CheckCircle, Play, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDraggableScroll } from '../hooks/useDraggableScroll';

const Demos: React.FC = () => {
    const [showVideoPopup, setShowVideoPopup] = useState(false);
    const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
    const scrollRef = React.useRef<HTMLDivElement>(null);
    useDraggableScroll(scrollRef as any);

    const openVideoPopup = (videoUrl: string, title: string) => {
        setActiveVideo({ url: videoUrl, title });
        setShowVideoPopup(true);
    };

    const closeVideoPopup = () => {
        setShowVideoPopup(false);
        setActiveVideo(null);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -window.innerWidth * 0.8, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: window.innerWidth * 0.8, behavior: 'smooth' });
        }
    };

    return (
        <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#0F1C2E', overflowX: 'hidden' }}>

            {/* Header Section */}
            <section className="relative w-full py-32 px-6 md:px-12 flex flex-col items-center justify-center text-center">
                {/* Sparkles Background */}
                <div className="absolute inset-0 w-full h-full">
                    <SparklesCore
                        id="tsparticlesdemos"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={80}
                        className="w-full h-full"
                        particleColor="#acc2ef"
                    />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-blue/10 border border-neon-blue/30 rounded-full mb-8">
                            <span className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></span>
                            <span className="font-tech text-neon-blue tracking-widest text-xs uppercase">DÉMONSTRATIONS EN CONDITIONS RÉELLES</span>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-6">
                            Écoutez Vocal Flow <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-accent-200">En Action</span>
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <p className="font-sans text-gray-400 text-lg max-w-2xl mx-auto">
                            Découvrez comment notre IA gère les appels pour différents secteurs d'activité. Des conversations naturelles, fluides et efficaces.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Horizontal Scroll Demos Section */}
            <section className="relative w-full py-20 overflow-hidden group/scroll">
                <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#0F1C2E] to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#0F1C2E] to-transparent z-20 pointer-events-none" />

                {/* Left Arrow */}
                <button
                    onClick={scrollLeft}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-bg-200/80 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary-300 hover:text-bg-100 transition-all duration-300 opacity-0 group-hover/scroll:opacity-100 translate-x-4 group-hover/scroll:translate-x-0 cursor-pointer shadow-lg"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right Arrow */}
                <button
                    onClick={scrollRight}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-bg-200/80 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary-300 hover:text-bg-100 transition-all duration-300 opacity-0 group-hover/scroll:opacity-100 -translate-x-4 group-hover/scroll:translate-x-0 cursor-pointer shadow-lg"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                <div ref={scrollRef} className="flex overflow-x-auto gap-8 px-6 md:px-12 pb-12 snap-x snap-mandatory scrollbar-hide pr-[20vw] cursor-grab active:cursor-grabbing" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {/* Demo 1: Medical */}
                    <div className="min-w-[90vw] md:min-w-[800px] snap-center bg-bg-200/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-primary-300/30 transition-all duration-500 group relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-300/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="flex flex-col md:flex-row h-full relative z-10">
                            {/* Content Side */}
                            <div className="p-8 md:p-10 md:w-3/5 flex flex-col">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white border border-white/10">
                                        <Building2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold text-3xl text-white">Maisons de Santé</h3>
                                        <p className="font-tech text-xs text-primary-300 uppercase tracking-widest">CABINETS DENTAIRES & MÉDICAUX</p>
                                    </div>
                                </div>

                                <p className="text-gray-300 leading-relaxed mb-6 border-l-2 border-primary-300/30 pl-4">
                                    "Bonjour, je souhaiterais prendre rendez-vous pour un détartrage s'il vous plaît." <br />
                                    <span className="text-gray-500 italic text-sm mt-2 block">L'IA gère l'agenda, identifie le patient et propose les créneaux libres en temps réel.</span>
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                                        <div className="text-2xl font-bold text-white mb-1">24/7</div>
                                        <div className="text-xs text-gray-400">Disponibilité</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                                        <div className="text-2xl font-bold text-white mb-1">-30%</div>
                                        <div className="text-xs text-gray-400">D'absentéisme</div>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8 flex-grow">
                                    <li className="flex items-center gap-3 text-sm text-gray-300">
                                        <CheckCircle className="w-4 h-4 text-primary-300" />
                                        <span>Gestion annulations & reports</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-300">
                                        <CheckCircle className="w-4 h-4 text-primary-300" />
                                        <span>Création dossier patient auto</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-300">
                                        <CheckCircle className="w-4 h-4 text-primary-300" />
                                        <span>Rappel SMS intelligent</span>
                                    </li>
                                </ul>

                                <button onClick={() => openVideoPopup("https://www.youtube.com/embed/p0WxxNbVySQ", "Maisons de Santé")} className="mt-auto px-6 py-4 bg-primary-300 text-bg-100 font-display font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-3 cursor-pointer z-50 relative">
                                    <Play className="w-5 h-5" />
                                    VOIR LA DÉMO
                                </button>
                            </div>

                            {/* Visual/Image Side with Background */}
                            <div
                                className="md:w-2/5 relative overflow-hidden border-t md:border-t-0 md:border-l border-white/5 cursor-pointer group/image"
                                onClick={() => openVideoPopup("https://www.youtube.com/embed/p0WxxNbVySQ", "Maisons de Santé")}
                            >
                                <img
                                    src="/medical_office.png"
                                    alt="Maison de Santé"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-bg-100 via-bg-100/80 to-bg-100/60 transition-opacity duration-300 group-hover/image:opacity-80"></div>
                                <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover/image:opacity-20"></div>
                                <div className="relative z-10 h-full p-8 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-20 h-20 mx-auto bg-primary-300/20 backdrop-blur-md rounded-full flex items-center justify-center animate-pulse mb-4 border border-primary-300/30 group-hover/image:scale-110 transition-transform duration-300">
                                            <Play className="w-8 h-8 text-primary-300 fill-primary-300/20" />
                                        </div>
                                        <p className="font-tech text-xs text-primary-300 uppercase tracking-wider group-hover/image:text-white transition-colors">LIVE DEMO AUDIO</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Demo 2: Call Centers */}
                    <div className="min-w-[90vw] md:min-w-[800px] snap-center bg-bg-200/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-primary-300/30 transition-all duration-500 group relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-300/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="flex flex-col md:flex-row h-full relative z-10">
                            <div className="p-8 md:p-10 md:w-3/5 flex flex-col">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white border border-white/10">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold text-3xl text-white">Call Centers</h3>
                                        <p className="font-tech text-xs text-primary-300 uppercase tracking-widest">SERVICE CLIENT & SUPPORT</p>
                                    </div>
                                </div>

                                <p className="text-gray-300 leading-relaxed mb-6 border-l-2 border-primary-300/30 pl-4">
                                    "Je voudrais savoir où en est ma commande #12345." <br />
                                    <span className="text-gray-500 italic text-sm mt-2 block">L'IA interroge votre ERP, localise le colis et informe le client instantanément.</span>
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                                        <div className="text-2xl font-bold text-white mb-1">100%</div>
                                        <div className="text-xs text-gray-400">Appels Décrochés</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                                        <div className="text-2xl font-bold text-white mb-1">x3</div>
                                        <div className="text-xs text-gray-400">Capacité de Traitement</div>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8 flex-grow">
                                    <li className="flex items-center gap-3 text-sm text-gray-300">
                                        <CheckCircle className="w-4 h-4 text-primary-300" />
                                        <span>Qualification des leads</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-300">
                                        <CheckCircle className="w-4 h-4 text-primary-300" />
                                        <span>Escalade vers humain si complexe</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-300">
                                        <CheckCircle className="w-4 h-4 text-primary-300" />
                                        <span>Sentiment Analysis</span>
                                    </li>
                                </ul>

                                <button onClick={() => openVideoPopup("https://www.youtube.com/embed/ahDNbwCvLaA", "Call Centers")} className="mt-auto px-6 py-4 bg-primary-300 text-bg-100 font-display font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-3 cursor-pointer z-50 relative">
                                    <Play className="w-5 h-5" />
                                    VOIR LA DÉMO
                                </button>
                            </div>

                            <div
                                className="md:w-2/5 relative overflow-hidden border-t md:border-t-0 md:border-l border-white/5 cursor-pointer group/image"
                                onClick={() => openVideoPopup("https://www.youtube.com/embed/ahDNbwCvLaA", "Call Centers")}
                            >
                                <img
                                    src="/call_center.png"
                                    alt="Call Center"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-bg-100 via-bg-100/80 to-bg-100/60 transition-opacity duration-300 group-hover/image:opacity-80"></div>
                                <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover/image:opacity-20"></div>
                                <div className="relative z-10 h-full p-8 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-20 h-20 mx-auto bg-primary-300/20 backdrop-blur-md rounded-full flex items-center justify-center animate-pulse mb-4 border border-primary-300/30 group-hover/image:scale-110 transition-transform duration-300">
                                            <Play className="w-8 h-8 text-primary-300 fill-primary-300/20" />
                                        </div>
                                        <p className="font-tech text-xs text-primary-300 uppercase tracking-wider group-hover/image:text-white transition-colors">LIVE DEMO AUDIO</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Demo 3: Garages */}
                    <div className="min-w-[90vw] md:min-w-[800px] snap-center bg-bg-200/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-primary-300/30 transition-all duration-500 group relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-300/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="flex flex-col md:flex-row h-full relative z-10">
                            <div className="p-8 md:p-10 md:w-3/5 flex flex-col">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white border border-white/10">
                                        <Wrench className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold text-3xl text-white">Garages & Concessions</h3>
                                        <p className="font-tech text-xs text-primary-300 uppercase tracking-widest">AUTOMOBILE</p>
                                    </div>
                                </div>

                                <p className="text-gray-300 leading-relaxed mb-6 border-l-2 border-primary-300/30 pl-4">
                                    "Mon voyant moteur est allumé sur ma Clio, est-ce que je peux passer ?" <br />
                                    <span className="text-gray-500 italic text-sm mt-2 block">L'IA pré-diagnostique, vérifie la dispo des ponts et booke l'intervention.</span>
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                                        <div className="text-2xl font-bold text-white mb-1">0</div>
                                        <div className="text-xs text-gray-400">Appels Perdus</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                                        <div className="text-2xl font-bold text-white mb-1">Auto</div>
                                        <div className="text-xs text-gray-400">Devis & Relances</div>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8 flex-grow">
                                    <li className="flex items-center gap-3 text-sm text-gray-300">
                                        <CheckCircle className="w-4 h-4 text-primary-300" />
                                        <span>Collecte infos véhicule</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-300">
                                        <CheckCircle className="w-4 h-4 text-primary-300" />
                                        <span>Envoi devis automatique</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-300">
                                        <CheckCircle className="w-4 h-4 text-primary-300" />
                                        <span>Relance révision périodique</span>
                                    </li>
                                </ul>

                                <button onClick={() => openVideoPopup("https://www.youtube.com/embed/7NFiiVx7JJA", "Garages & Concessionnaires")} className="mt-auto px-6 py-4 bg-primary-300 text-bg-100 font-display font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-3 cursor-pointer z-50 relative">
                                    <Play className="w-5 h-5" />
                                    VOIR LA DÉMO
                                </button>
                            </div>

                            <div
                                className="md:w-2/5 relative overflow-hidden border-t md:border-t-0 md:border-l border-white/5 cursor-pointer group/image"
                                onClick={() => openVideoPopup("https://www.youtube.com/embed/7NFiiVx7JJA", "Garages & Concessionnaires")}
                            >
                                <img
                                    src="/garage_workshop.png"
                                    alt="Garage Automobile"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-bg-100 via-bg-100/80 to-bg-100/60 transition-opacity duration-300 group-hover/image:opacity-80"></div>
                                <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover/image:opacity-20"></div>
                                <div className="relative z-10 h-full p-8 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-20 h-20 mx-auto bg-primary-300/20 backdrop-blur-md rounded-full flex items-center justify-center animate-pulse mb-4 border border-primary-300/30 group-hover/image:scale-110 transition-transform duration-300">
                                            <Play className="w-8 h-8 text-primary-300 fill-primary-300/20" />
                                        </div>
                                        <p className="font-tech text-xs text-primary-300 uppercase tracking-wider group-hover/image:text-white transition-colors">LIVE DEMO AUDIO</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Horizontal Scroll Indicator */}
                <div className="flex justify-center gap-2 mt-4">
                    <div className="w-16 h-1 bg-primary-300 rounded-full animate-pulse" />
                    <div className="w-2 h-1 bg-white/20 rounded-full" />
                    <div className="w-2 h-1 bg-white/20 rounded-full" />
                </div>
            </section >

            {/* Video Popup Modal */}
            {
                showVideoPopup && activeVideo && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                        onClick={closeVideoPopup}
                    >
                        <div
                            className="relative w-full max-w-5xl bg-bg-200 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(172,194,239,0.4)] border-2 border-primary-300/30"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeVideoPopup}
                                className="absolute top-4 right-4 z-10 w-10 h-10 bg-bg-100/80 hover:bg-primary-300 border border-primary-300/50 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Video Container */}
                            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={activeVideo.url}
                                    title="Vocal Flow Demo"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            {/* Demo Label */}
                            <div className="bg-gradient-to-r from-primary-300/20 to-accent-200/20 border-t border-primary-300/30 px-6 py-5">
                                <div className="flex items-center justify-center gap-3 mb-2">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-primary-300/20 rounded-full border border-primary-300/40">
                                        <Play className="w-4 h-4 text-primary-300" />
                                        <span className="text-primary-300 font-tech text-xs uppercase tracking-wider">Démo Réelle</span>
                                    </div>
                                    <h4 className="text-white font-display font-bold text-xl">
                                        {activeVideo.title}
                                    </h4>
                                </div>
                                <p className="text-center text-text-200 text-sm">
                                    Vocal Flow en action - Appel automatisé en conditions réelles
                                </p>

                                <div className="mt-6 flex justify-center">
                                    <a
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-8 py-3 bg-primary-300 text-bg-100 font-display font-bold rounded-full hover:bg-white hover:scale-105 transition-all duration-200 shadow-[0_0_20px_rgba(172,194,239,0.4)]"
                                    >
                                        <span>JE VEUX LE MÊME RÉSULTAT</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* CTA Bottom */}
            <section className="relative w-full py-20 px-6 bg-gradient-to-t from-bg-100 to-transparent">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-display font-bold text-3xl text-white mb-8">Convaincu par la démonstration ?</h2>
                    <a href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-neon-blue text-white font-display font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                        RÉSERVER MA DÉMO PERSONNALISÉE
                    </a>
                </div>
            </section>

        </div >
    );
};

export default Demos;
