import React, { useState, useEffect } from 'react';
import { ArrowUpRight, X, Phone, MessageSquare, Calendar, UserCheck } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

// Import case study images
import retailImage from '../assets/retail.png';
import autoImage from '../assets/auto.png';
import medicalImage from '../assets/medical.png';

interface MissionSection {
    title: string;
    text: string | string[];
    icon?: React.ReactNode;
}

interface MissionData {
    id: string;
    tag: string;
    title: string;
    shortDesc: string;
    modalContent: {
        mainTitle: string;
        intro: string;
        sections: MissionSection[];
        conclusion: string;
    };
    image: string;
}

const missions: MissionData[] = [
    {
        id: 'retail',
        tag: 'ACTUALITÉS · VOICE AI',
        title: 'Déploiement Retail',
        shortDesc: 'Comment Vocal Flow transforme l’expérience client en magasin avec une interaction vocale naturelle.',
        modalContent: {
            mainTitle: 'Vocal Flow — L’assistant Retail Nouvelle Génération',
            intro: 'Dans le retail, l’immédiateté est la clé. Les clients en magasin ou en ligne cherchent des réponses rapides sur les stocks, les localisations de produits et les caractéristiques techniques. Vocal Flow fluidifie ce parcours sans friction.',
            sections: [
                {
                    title: 'Disponibilité Produit Instantanée',
                    text: 'Connecté directement à l\'ERP, Vocal Flow répond instantanément aux questions de stock : "Avez-vous le modèle X en taille 42 ?"',
                    icon: <MessageSquare className="w-5 h-5 text-neon-blue" />
                },
                {
                    title: 'Guidage en Magasin',
                    text: 'L\'IA oriente les clients vers le bon rayon ou la bonne allée, agissant comme un concierge virtuel toujours disponible.'
                },
                {
                    title: 'Support Multilingue',
                    text: 'Vocal Flow détecte la langue du client et s\'adapte instantanément, brisant les barrières linguistiques pour les touristes internationaux.'
                }
            ],
            conclusion: 'Résultat : Une augmentation significative de la satisfaction client et une réduction de la charge de travail des vendeurs au sol.'
        },
        image: retailImage
    },
    {
        id: 'auto',
        tag: 'CAS D’USAGE · AUTOMOBILE',
        title: 'Centre Auto Intelligent',
        shortDesc: 'Vocal Flow devient l’assistant téléphonique d’un centre automobile, capable de conseiller et planifier.',
        modalContent: {
            mainTitle: 'Vocal Flow — L’assistant téléphonique intelligent pour centres auto',
            intro: 'Dans un centre automobile, chaque appel compte. Demandes de renseignements, conseils produits, prises de rendez-vous, urgences… Vocal Flow devient le premier point de contact vocal, disponible 24h/24, capable de comprendre, conseiller et agir comme un véritable membre du staff.',
            sections: [
                {
                    title: 'Accueil immédiat, humain et rassurant',
                    text: [
                        'Vocal Flow décroche instantanément et comprend le langage naturel du client.',
                        'Pas de menus vocaux rigides : le client parle librement, Vocal Flow comprend l’intention.'
                    ],
                    icon: <Phone className="w-5 h-5 text-neon-blue" />
                },
                {
                    title: 'Un conseiller formé sur toute la base du centre auto',
                    text: [
                        'Vocal Flow est entraîné sur l’ensemble des produits, services et références du centre automobile.',
                        'Il peut recommander pneus, batteries, freins ou accessoires en fonction du véhicule du client.'
                    ]
                },
                {
                    title: 'Planification intelligente connectée à l’agenda',
                    text: 'Vocal Flow consulte l’agenda du centre en temps réel, propose des créneaux disponibles et réserve le rendez-vous immédiatement.',
                    icon: <Calendar className="w-5 h-5 text-neon-cyan" />
                },
                {
                    title: 'L’humain reprend la main à tout moment',
                    text: 'Si le client souhaite parler à un membre du staff, Vocal Flow transfère l’appel avec tout le contexte de la conversation.',
                    icon: <UserCheck className="w-5 h-5 text-white" />
                }
            ],
            conclusion: 'Résultat : moins d’appels manqués, plus de rendez-vous confirmés, une meilleure expérience client et une équipe libérée des tâches répétitives.'
        },
        image: autoImage
    },
    {
        id: 'health',
        tag: 'SANTÉ · CAS CLIENT',
        title: 'Santé Connectée',
        shortDesc: 'Usage de Vocal Flow pour fluidifier l’assistance vocale dans les services médicaux.',
        modalContent: {
            mainTitle: 'Vocal Flow — L’assistant Médical Empathique',
            intro: 'La prise de charge patient demande rigueur et empathie. Vocal Flow permet de trier les demandes non-urgentes, gérer les rendez-vous et rassurer les patients, permettant au personnel médical de se concentrer sur le soin.',
            sections: [
                {
                    title: 'Pré-qualification des demandes',
                    text: 'L\'IA identifie le motif de l\'appel et évalue l\'urgence selon des protocoles définis, orientant le patient vers le bon service ou le SAMU si nécessaire.'
                },
                {
                    title: 'Gestion de l\'Agenda Médical',
                    text: 'Synchronisation temps réel avec les logiciels médicaux pour la prise, l\'annulation ou le déplacement de rendez-vous.'
                },
                {
                    title: 'Suivi Post-Opératoire',
                    text: 'Campagnes d\'appels automatisés pour prendre des nouvelles des patients après une intervention et détecter d\'éventuelles anomalies.'
                }
            ],
            conclusion: 'Résultat : Une meilleure accessibilité aux soins et une réduction drastique du secrétariat téléphonique médical.'
        },
        image: medicalImage
    }
];

const MissionModal: React.FC<{ mission: MissionData; onClose: () => void }> = ({ mission, onClose }) => {
    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    const { openModal } = useBooking();
    const content = mission.modalContent;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl animate-scale-in custom-scrollbar overflow-hidden group"
                onClick={e => e.stopPropagation()}
            >
                {/* Border Gradient Animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-300 via-purple-500 to-neon-blue opacity-50 blur-xl group-hover:opacity-70 transition-opacity duration-1000"></div>
                <div className="absolute inset-[1px] bg-bg-200 rounded-3xl z-0"></div>

                <div className="relative z-10 bg-bg-200/50 backdrop-blur-3xl">
                    {/* Header Image Background */}
                    <div className="relative h-64 overflow-hidden mask-gradient-b">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/40 to-bg-200 z-10"></div>
                        <img
                            src={mission.image}
                            alt={mission.title}
                            className="w-full h-full object-cover transform scale-110 blur-sm opacity-50"
                        />
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-20 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full transition-all duration-200 hover:rotate-90"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="px-8 md:px-12 pb-12 -mt-20 relative z-20">
                        {/* Title Section */}
                        <div className="mb-10 text-center">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-300/10 border border-primary-300/30 font-tech text-xs text-primary-300 uppercase tracking-widest mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(172,194,239,0.3)]">
                                {mission.tag}
                            </span>
                            {/* Improved Title Legibility: Solid White with subtle glow instead of dark gradient */}
                            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6 leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                {content.mainTitle}
                            </h2>
                            <p className="font-sans text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
                                {content.intro}
                            </p>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 gap-6 mb-12">
                            {content.sections.map((section, idx) => (
                                <div key={idx} className="group/card relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-primary-300/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(172,194,239,0.1)] hover:-translate-y-1">
                                    <div className="flex items-start gap-5">
                                        <div className="mt-1 p-3 bg-gradient-to-br from-primary-300/20 to-neon-blue/20 rounded-xl border border-primary-300/20 shadow-inner shrink-0 group-hover/card:scale-110 transition-transform duration-300">
                                            <div className="text-primary-300">
                                                {section.icon || <ArrowUpRight className="w-5 h-5" />}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-display font-bold text-xl text-white mb-2 group-hover/card:text-primary-300 transition-colors">
                                                {section.title}
                                            </h3>
                                            {Array.isArray(section.text) ? (
                                                <ul className="space-y-2">
                                                    {section.text.map((line, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                                                            <span className="text-primary-300 mt-1.5">•</span>
                                                            <span className="leading-relaxed">{line}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="font-sans text-gray-400 leading-relaxed text-sm">
                                                    {section.text}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Conclusion Box & CTA */}
                        <div className="space-y-8">
                            <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-r from-primary-900/30 to-bg-200 border border-primary-300/20 text-center">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-300/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                <div className="relative z-10">
                                    <h4 className="font-tech text-sm text-primary-300 uppercase tracking-widest mb-3">L'Impact Vocal Flow</h4>
                                    <p className="font-display font-medium text-xl text-white italic">
                                        "{content.conclusion}"
                                    </p>
                                </div>
                            </div>

                            {/* Booking CTA */}
                            <div className="flex justify-center">
                                <button
                                    onClick={() => {
                                        onClose();
                                        openModal();
                                    }}
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary-300 text-bg-100 font-display font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(172,194,239,0.5)]"
                                >
                                    <span className="relative z-10">RÉSERVER MA DÉMO OFFERTE</span>
                                    <ArrowUpRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95) translateY(20px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
                .animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(172,194,239,0.5); }
                
                .mask-gradient-b {
                    mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
                }
            `}</style>
        </div>
    );
};

const MissionLog: React.FC = () => {
    const [selectedMission, setSelectedMission] = useState<MissionData | null>(null);

    return (
        <section id="log" className="relative w-full py-24 border-t border-white/5" style={{ backgroundColor: '#0F1C2E' }}>
            <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="font-display font-bold text-4xl text-white mb-2">Cas d'Usage Concrets</h2>
                        <p className="text-gray-400">Vocal Flow en action dans différents secteurs</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {missions.map((mission) => (
                        <article
                            key={mission.id}
                            className="group cursor-pointer perspective-1000"
                            onClick={() => setSelectedMission(mission)}
                        >
                            {/* Card Container */}
                            <div className="relative flex flex-col h-full border border-white/10 rounded-xl overflow-hidden transition-all duration-300 group-hover:border-primary-300/50 group-hover:shadow-[0_0_30px_rgba(172,194,239,0.15)] group-hover:-translate-y-2" style={{ backgroundColor: '#1f2b3e' }}>

                                {/* Image Area */}
                                <div className="h-48 relative bg-gradient-to-br from-gray-900 to-black border-b border-white/5 overflow-hidden">
                                    <img
                                        src={mission.image}
                                        alt={mission.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1f2b3e] via-transparent to-transparent"></div>
                                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 p-2 rounded-full transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        <ArrowUpRight className="w-4 h-4 text-white" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <span className="font-tech text-[10px] text-neon-cyan uppercase tracking-[0.2em] mb-3">
                                        {mission.tag}
                                    </span>
                                    <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-neon-blue transition-colors">
                                        {mission.title}
                                    </h3>
                                    <p className="font-sans text-sm text-gray-400 leading-relaxed mb-6 flex-1">
                                        {mission.shortDesc}
                                    </p>

                                    {/* Indicator */}
                                    <div className="flex justify-center pt-4 border-t border-white/5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-primary-300 group-hover:shadow-[0_0_8px_rgba(172,194,239,0.8)] transition-all duration-300"></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedMission && (
                <MissionModal mission={selectedMission} onClose={() => setSelectedMission(null)} />
            )}
        </section>
    );
};

export default MissionLog;
