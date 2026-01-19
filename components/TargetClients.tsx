import React, { useState } from 'react';
import { Building2, Phone, Wrench, CheckCircle, Play, X, ArrowRight } from 'lucide-react';

const targetClients = [
    {
        id: 1,
        icon: <Building2 className="w-8 h-8" />,
        title: "Maisons de Santé",
        subtitle: "Cabinets Dentaires & Médicaux",
        description: "Automatisez la prise de rendez-vous, les rappels de consultation et la gestion des annulations. Libérez votre secrétariat médical.",
        benefits: [
            "Prise de RDV 24/7 sans intervention humaine",
            "Rappels automatiques pour réduire les absences",
            "Gestion des urgences et redirections intelligentes",
            "Intégration agenda et logiciel métier"
        ],
        videoUrl: "https://www.youtube.com/embed/p0WxxNbVySQ",
        videoThumbnail: "https://img.youtube.com/vi/p0WxxNbVySQ/maxresdefault.jpg",
        backgroundImage: "C:/Users/bellu/.gemini/antigravity/brain/9d1c9dc3-d9c0-4061-a5e3-f3c581ae97c5/medical_office_background_1768219482650.png"
    },
    {
        id: 2,
        icon: <Phone className="w-8 h-8" />,
        title: "Call Centers",
        subtitle: "Centres d'Appels & Service Client",
        description: "Qualifiez vos leads automatiquement, traitez les demandes récurrentes et boostez la productivité de vos équipes.",
        benefits: [
            "Qualification client ultra-précise en temps réel",
            "Traitement automatique des demandes simples",
            "Transcription et résumé de chaque appel",
            "Dashboard de suivi et analytics avancés"
        ],
        videoUrl: "https://www.youtube.com/embed/ahDNbwCvLaA",
        videoThumbnail: "https://img.youtube.com/vi/ahDNbwCvLaA/maxresdefault.jpg",
        backgroundImage: "C:/Users/bellu/.gemini/antigravity/brain/9d1c9dc3-d9c0-4061-a5e3-f3c581ae97c5/call_center_background_1768219498056.png"
    },
    {
        id: 3,
        icon: <Wrench className="w-8 h-8" />,
        title: "Garages & Concessionnaires",
        subtitle: "Automobile & Mécanique",
        description: "Gérez les demandes de devis, les prises de RDV pour révisions et les suivis clients de manière entièrement automatisée.",
        benefits: [
            "Prise de RDV atelier automatique",
            "Collecte des informations véhicule (marque, modèle, km)",
            "Envoi automatique de devis et confirmations",
            "Rappels de révision et entretien préventif"
        ],
        videoUrl: "https://www.youtube.com/embed/7NFiiVx7JJA",
        videoThumbnail: "https://img.youtube.com/vi/7NFiiVx7JJA/maxresdefault.jpg",
        backgroundImage: "C:/Users/bellu/.gemini/antigravity/brain/9d1c9dc3-d9c0-4061-a5e3-f3c581ae97c5/garage_workshop_background_1768219513516.png"
    }
];

const TargetClients: React.FC = () => {
    const [activeClient, setActiveClient] = useState(0);
    const [showVideoPopup, setShowVideoPopup] = useState(false);
    const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

    const openVideoPopup = (videoUrl: string, title: string) => {
        setActiveVideo({ url: videoUrl, title });
        setShowVideoPopup(true);
    };

    const closeVideoPopup = () => {
        setShowVideoPopup(false);
        setActiveVideo(null);
    };

    return (
        <>
            <section id="target-clients" className="relative w-full py-24 overflow-hidden" style={{ backgroundColor: '#0F1C2E' }}>
                {/* Background Effect */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[120px]" style={{ backgroundColor: 'rgba(172, 194, 239, 0.3)' }}></div>
                </div>

                <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-300/10 border border-primary-300/30 rounded-full mb-6">
                            <span className="font-tech text-xs text-primary-300 uppercase tracking-wider">Secteurs d'Activité</span>
                        </div>
                        <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                            Conçu Pour Votre Métier
                        </h2>
                        <p className="text-text-200 text-lg max-w-2xl mx-auto">
                            Vocal Flow s'adapte parfaitement aux besoins spécifiques de votre secteur d'activité
                        </p>
                    </div>

                    {/* Target Clients Grid - Site Colors Only */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {targetClients.map((client, idx) => (
                            <div
                                key={client.id}
                                onMouseEnter={() => setActiveClient(idx)}
                                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 ${activeClient === idx
                                    ? 'shadow-[0_0_40px_rgba(172,194,239,0.3)] scale-105'
                                    : 'hover:shadow-[0_0_30px_rgba(172,194,239,0.2)]'
                                    }`}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={client.backgroundImage}
                                        alt={client.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Dark gradient overlay for text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-bg-100 via-bg-100/95 to-bg-100/80"></div>
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                                </div>

                                {/* Content */}
                                <div className={`relative backdrop-blur-sm border p-8 h-full transition-all duration-500 ${activeClient === idx
                                    ? 'border-primary-300/60'
                                    : 'border-white/10 hover:border-primary-300/40'
                                    }`}>
                                    {/* Icon */}
                                    <div className="w-16 h-16 bg-primary-300/20 backdrop-blur-md border border-primary-300/40 rounded-xl flex items-center justify-center mb-6 text-primary-300 group-hover:scale-110 group-hover:bg-primary-300/30 transition-all duration-300 shadow-lg">
                                        {client.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-display font-bold text-2xl text-white mb-2 drop-shadow-lg">
                                        {client.title}
                                    </h3>
                                    <p className="font-tech text-xs text-primary-300 uppercase tracking-wider mb-4">
                                        {client.subtitle}
                                    </p>

                                    {/* Description */}
                                    <p className="text-text-200 mb-6 leading-relaxed drop-shadow">
                                        {client.description}
                                    </p>

                                    {/* Benefits */}
                                    <ul className="space-y-3 mb-6">
                                        {client.benefits.map((benefit, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-primary-300 mt-0.5 flex-shrink-0" />
                                                <span className="text-text-200 text-sm">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Video Demo Button */}
                                    <button
                                        onClick={() => openVideoPopup(client.videoUrl, client.title)}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-300/20 backdrop-blur-md border-2 border-primary-300/50 text-primary-300 font-display font-bold rounded-lg hover:bg-primary-300 hover:text-bg-100 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(172,194,239,0.4)]"
                                    >
                                        <Play className="w-5 h-5" />
                                        <span>LANCER LA DÉMO</span>
                                    </button>

                                    {/* Hover Effect Line */}
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-300 to-accent-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-16">
                        <p className="text-text-200 mb-6">
                            Votre secteur n'est pas listé ? Vocal Flow s'adapte à tous les métiers nécessitant une gestion d'appels professionnelle.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-primary-300 text-bg-100 font-display font-bold rounded-full hover:scale-105 transition-all duration-200 shadow-[0_0_30px_rgba(172,194,239,0.4)]"
                        >
                            DISCUTER DE VOTRE PROJET
                        </a>
                    </div>
                </div>
            </section>

            {/* Video Popup Modal - Enhanced Title */}
            {showVideoPopup && activeVideo && (
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

                        {/* Demo Label - Enhanced */}
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
            )}
        </>
    );
};

export default TargetClients;
