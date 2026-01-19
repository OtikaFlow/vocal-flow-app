import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle, Clock, Zap, Settings, Database, Phone, MessageSquare, Users, Shield, Headphones, Euro } from 'lucide-react';
import { ScrollReveal } from '../components/ui/scroll-reveal';
import { SparklesCore } from '../components/ui/aceternity/sparkles';

const Installation: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Onboarding steps
    const onboardingSteps = [
        {
            icon: <Database className="w-6 h-6" />,
            title: "Audit Initial",
            description: "Analyse complète de vos besoins, de votre activité et de vos objectifs d'automatisation."
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Livraison V1",
            description: "Configuration initiale de votre assistant vocal avec votre base de données métier sous 3-5 jours."
        },
        {
            icon: <Settings className="w-6 h-6" />,
            title: "Phase de Test",
            description: "Test complet de la voix, de la BDD, du parcours d'appel. Vous challengez l'IA sur votre business."
        },
        {
            icon: <CheckCircle className="w-6 h-6" />,
            title: "Validation",
            description: "Validation de la V1 puis activation finale à distance. Connexion à tous vos outils."
        },
        {
            icon: <Headphones className="w-6 h-6" />,
            title: "Accès Dashboard",
            description: "Accès complet à votre tableau de bord envoyé par email ou WhatsApp."
        }
    ];

    // ... (keep technicalIntegrations)
    // Technical integrations
    const technicalIntegrations = [
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Appels Entrants & Sortants",
            description: "Gestion complète des appels inbound et outbound via Vocalflow"
        },
        {
            icon: <MessageSquare className="w-6 h-6" />,
            title: "Intégration WhatsApp",
            description: "Émission et réception de messages WhatsApp automatisés"
        },
        {
            icon: <Database className="w-6 h-6" />,
            title: "Connexion CRM",
            description: "Synchronisation bidirectionnelle avec votre CRM existant"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Sécurisation Données",
            description: "Chiffrement end-to-end et conformité RGPD garantie"
        }
    ];

    // ... (keep configurationCategories)
    // Client configuration categories
    const configurationCategories = [
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Stratégie d'Appel",
            description: "Définition des objectifs (Inbound/Outbound), Critères de succès (ex: RDV confirmé), KPIs de performance."
        },
        {
            icon: <MessageSquare className="w-6 h-6" />,
            title: "Scénarisation IA",
            description: "Arbres de décision, Logique de questions/réponses, Qualification de leads, Réponses aux objections."
        },
        {
            icon: <Headphones className="w-6 h-6" />,
            title: "Identité Vocale",
            description: "Choix du timbre (Homme/Femme, Âge), Ton (Formel/Dynamique), Rythme et style conversationnel."
        },
        {
            icon: <Settings className="w-6 h-6" />,
            title: "Routage Intelligent",
            description: "Règles de transfert vers humain, Gestion horaires/jours fériés, Files d'attente, débordement."
        },
        {
            icon: <Database className="w-6 h-6" />,
            title: "Infrastructure",
            description: "Numéros (Fixe/Mobile), Trunk SIP, Connexion CRM, Webhooks, Gestion multi-lignes."
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Volume & Scale",
            description: "Estimation trafic, Gestion pics d'appels, Calcul forfaits minutes, Alertes dépassement."
        }
    ];

    // ... (keep installationPricing)
    // Installation pricing
    const installationPricing = [
        {
            name: "Installation Minimum",
            price: "1 500€",
            description: "Configuration de base pour un seul agent vocal sur un numéro",
            features: [
                "1 agent vocal configuré",
                "1 numéro de téléphone",
                "Formation initiale incluse",
                "Support installation"
            ]
        },
        {
            name: "Installation Standard",
            price: "3 000€ - 5 000€",
            description: "Configuration complète avec personnalisation avancée",
            features: [
                "Personnalisation complète de l'IA",
                "Intégration CRM sur mesure",
                "Formation équipe complète",
                "Multi-numéros possibles",
                "Support prioritaire"
            ],
            popular: true
        },
        {
            name: "Multi-Agents",
            price: "+500€/agent",
            description: "Ajout d'agents différents par numéro",
            features: [
                "Agent vocal supplémentaire",
                "Personnalité et voix distinctes",
                "Configuration métier spécifique",
                "Formation dédiée"
            ]
        }
    ];

    return (
        <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#0F1C2E', overflowX: 'hidden' }}>

            {/* Hero Section */}
            <section className="relative w-full min-h-[85vh] flex items-center justify-center px-6 md:px-12 pt-32 pb-20 overflow-hidden">
                {/* Sparkles Background */}
                <div className="absolute inset-0 w-full h-full">
                    <SparklesCore
                        id="tsparticlesfullpage"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={100}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />
                </div>

                {/* Soft gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F1C2E]/50 via-transparent to-[#0F1C2E] pointer-events-none"></div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <ScrollReveal direction="down" duration={0.8}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-300/10 border border-primary-300/30 rounded-full mb-8 backdrop-blur-sm">
                            <Zap className="w-4 h-4 text-primary-300" />
                            <span className="font-tech text-xs text-primary-300 uppercase tracking-wider">Installation Clé en Main</span>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2} blur>
                        <h1 className="font-display font-bold text-5xl md:text-7xl text-white mb-6 leading-tight drop-shadow-2xl">
                            Installation <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-white to-accent-200 animate-gradient-x">Done For You</span><br />
                            <span className="text-4xl md:text-6xl text-text-200 mt-2 block">En 3 à 5 Jours</span>
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={0.4} direction="up">
                        <p className="font-sans text-xl text-text-200 max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-lg">
                            Nous nous occupons de tout : configuration, intégration, formation. Vous n'avez qu'à valider et profiter de votre assistant vocal IA.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.6} direction="up">
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a href="/contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-primary-300 text-bg-100 font-display font-bold rounded-full hover:scale-105 transition-all duration-200 shadow-[0_0_30px_rgba(172,194,239,0.4)] hover:shadow-[0_0_50px_rgba(172,194,239,0.6)]">
                                DÉMARRER L'INSTALLATION
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="/tarification" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/20 text-white font-display font-bold rounded-full hover:bg-white/5 transition-all duration-200 backdrop-blur-sm">
                                VOIR LES TARIFS
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Onboarding Process */}
            <section className="relative w-full py-24 px-6 md:px-12" style={{ backgroundColor: '#1f2b3e' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                            Processus d'Onboarding
                        </h2>
                        <p className="text-text-200 text-lg max-w-2xl mx-auto">
                            Un accompagnement complet de A à Z pour une mise en service rapide et efficace
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {onboardingSteps.map((step, idx) => (
                            <ScrollReveal key={idx} delay={idx * 0.1} className="h-full">
                                <div className="relative group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-primary-300/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(172,194,239,0.15)] h-full flex flex-col">
                                    {/* Step Number */}
                                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary-300 rounded-full flex items-center justify-center font-display font-bold text-bg-100 text-sm shadow-lg z-10">
                                        {idx + 1}
                                    </div>

                                    {/* Icon */}
                                    <div className="w-12 h-12 bg-primary-300/10 rounded-lg flex items-center justify-center text-primary-300 mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                                        {step.icon}
                                    </div>

                                    {/* Content */}
                                    <h3 className="font-display font-bold text-lg text-white mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-text-200 text-sm leading-relaxed flex-grow">
                                        {step.description}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Integrations */}
            <section className="relative w-full py-24 px-6 md:px-12" style={{ backgroundColor: '#0F1C2E' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                            Intégrations Techniques
                        </h2>
                        <p className="text-text-200 text-lg max-w-2xl mx-auto">
                            Connexion complète à tous vos outils et systèmes existants
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {technicalIntegrations.map((integration, idx) => (
                            <ScrollReveal key={idx} delay={idx * 0.1}>
                                <div className="bg-gradient-to-br from-primary-300/10 to-accent-200/10 border border-primary-300/30 rounded-xl p-6 hover:shadow-[0_0_30px_rgba(172,194,239,0.2)] transition-all duration-300">
                                    <div className="w-12 h-12 bg-primary-300/20 rounded-lg flex items-center justify-center text-primary-300 mb-4">
                                        {integration.icon}
                                    </div>
                                    <h3 className="font-display font-bold text-xl text-white mb-2">
                                        {integration.title}
                                    </h3>
                                    <p className="text-text-200 text-sm">
                                        {integration.description}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Client Configuration */}
            <section className="relative w-full py-24 px-6 md:px-12" style={{ backgroundColor: '#1f2b3e' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-300/10 border border-primary-300/30 rounded-full mb-6">
                            <Settings className="w-4 h-4 text-primary-300" />
                            <span className="font-tech text-xs text-primary-300 uppercase tracking-wider">Sur Mesure</span>
                        </div>
                        <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                            Paramétrage Client Complet
                        </h2>
                        <p className="text-text-200 text-lg max-w-3xl mx-auto">
                            Tout est configuré pour une performance maximale
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {configurationCategories.map((cat, idx) => (
                            <ScrollReveal key={idx} delay={idx * 0.1}>
                                <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:border-primary-300/50 hover:shadow-[0_0_40px_-10px_rgba(172,194,239,0.3)]">
                                    {/* Hover Gradient Border Effect */}
                                    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary-300/30 transition-colors duration-500 pointer-events-none"></div>

                                    <div className="w-14 h-14 bg-primary-300/10 rounded-xl flex items-center justify-center text-primary-300 mb-6 group-hover:scale-110 group-hover:bg-primary-300/20 transition-all duration-500">
                                        {cat.icon}
                                    </div>

                                    <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">
                                        {cat.title}
                                    </h3>

                                    <p className="text-text-200 text-sm leading-relaxed">
                                        {cat.description}
                                    </p>

                                    {/* Decorative Corner */}
                                    <div className="absolute top-4 right-4 text-white/5 group-hover:text-primary-300/20 transition-colors duration-500 group-hover:rotate-12 group-hover:scale-110">
                                        {cat.icon}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                </div>
            </section>

            {/* Installation Pricing */}
            <section className="relative w-full py-24 px-6 md:px-12" style={{ backgroundColor: '#0F1C2E' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-300/10 border border-primary-300/30 rounded-full mb-6">
                            <Euro className="w-4 h-4 text-primary-300" />
                            <span className="font-tech text-xs text-primary-300 uppercase tracking-wider">Prix d'Installation</span>
                        </div>
                        <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                            Tarifs Installation
                        </h2>
                        <p className="text-text-200 text-lg max-w-2xl mx-auto">
                            Investissement unique pour une configuration professionnelle et personnalisée
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {installationPricing.map((pricing, idx) => (
                            <ScrollReveal key={idx} delay={idx * 0.15}>
                                <div className={`relative group rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 ${pricing.popular
                                    ? 'bg-gradient-to-b from-primary-300/20 to-bg-100 border-2 border-primary-300 shadow-[0_0_50px_rgba(172,194,239,0.3)] scale-105'
                                    : 'bg-bg-100 border border-white/10 hover:border-primary-300/50 hover:shadow-[0_0_30px_rgba(172,194,239,0.15)]'
                                    }`}>
                                    {pricing.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-300 text-bg-100 font-tech text-xs uppercase tracking-wider rounded-full">
                                            Recommandé
                                        </div>
                                    )}

                                    <h3 className="font-display font-bold text-2xl text-white mb-2">{pricing.name}</h3>
                                    <div className="font-display font-bold text-4xl text-primary-300 mb-4">{pricing.price}</div>
                                    <p className="text-text-200 mb-6 leading-relaxed">{pricing.description}</p>

                                    <div className="space-y-3">
                                        {pricing.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-primary-300 mt-0.5 flex-shrink-0" />
                                                <span className="text-text-200 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>


                </div>
            </section>

            {/* CTA Section */}
            <section className="relative w-full py-32 px-6 bg-gradient-to-b from-bg-100 to-bg-200 border-t border-white/5">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px]" style={{ backgroundColor: 'rgba(172, 194, 239, 0.1)' }}></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <ScrollReveal direction="down">
                        <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-8">
                            Prêt à Lancer <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-200">Votre Assistant Vocal ?</span>
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <p className="font-sans text-text-200 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                            Commencez par un audit gratuit. Nous analysons vos besoins et vous proposons une solution sur mesure.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.4} direction="up">
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a href="/contact" className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-bg-100 font-display font-bold rounded-full hover:scale-105 transition-all duration-200 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                                DEMANDER UN AUDIT GRATUIT
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="/tarification" className="inline-flex items-center gap-3 px-10 py-5 border-2 border-white/20 text-white font-display font-bold rounded-full hover:bg-white/5 transition-all duration-200">
                                VOIR LES ABONNEMENTS
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
};

export default Installation;
