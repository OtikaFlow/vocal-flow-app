import React, { useEffect, useState } from 'react';
import {
    ArrowRight, CheckCircle, Zap, Settings, TrendingUp,
    HelpCircle, ChevronDown, Sparkles, Euro, Clock
} from 'lucide-react';
import { ScrollReveal } from '../components/ui/scroll-reveal';
import { SparklesCore } from '../components/ui/aceternity/sparkles';
import CostCalculator from '../components/CostCalculator';

const PricingUnified: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // FAQ items
    const faqItems = [
        {
            question: 'Comment est calculé l\'abonnement mensuel ?',
            answer: 'L\'abonnement est calculé automatiquement selon votre volume d\'appels : nombre d\'appels/jour × durée moyenne × 30 jours × tarif/minute de votre pack. Tout est inclus : maintenance, hébergement, crédits d\'appel IA.'
        },
        {
            question: 'Puis-je changer de pack ?',
            answer: 'Oui ! Votre pack s\'ajuste automatiquement selon votre volume d\'appels. Si votre activité évolue, le tarif s\'adapte pour vous offrir le meilleur prix.'
        },
        {
            question: 'Que se passe-t-il si je dépasse mon forfait ?',
            answer: 'Aucune coupure ! VocalFlow continue de travailler pour vous à un tarif préférentiel de +0,20€/min supplémentaire, quel que soit votre abonnement. Le tarif "hors forfait" s\'applique uniquement si vous dépassez exceptionnellement votre volume habituel.'
        },
        {
            question: 'Que comprend l\'installation à 3000€ ?',
            answer: 'L\'installation comprend : audit métier complet, conception du parcours IA, création de la base de connaissances, connexion CRM & agenda, configuration complète, livraison en 3-5 jours, phase de test, ajustements illimités et formation.'
        },
        {
            question: 'Puis-je connecter mon CRM ?',
            answer: 'Oui, la connexion CRM est incluse dans l\'installation. Synchronisation bidirectionnelle avec la plupart des CRM (Salesforce, HubSpot, Pipedrive, etc.).'
        },
        {
            question: 'L\'IA peut-elle gérer plusieurs agents ?',
            answer: 'Oui ! Chaque agent supplémentaire identique coûte +500€ en installation. Un agent différent (autre rôle) coûte +3000€ en installation, puis son propre abonnement mensuel calculé selon son usage.'
        },
        {
            question: 'Support disponible ?',
            answer: 'Support technique inclus dans l\'abonnement, disponible sous 24h via WhatsApp privé. Vous pouvez aussi configurer des transferts vers un humain à tout moment.'
        }
    ];

    return (
        <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#0F1C2E', overflowX: 'hidden' }}>

            {/* HERO SECTION */}
            <section className="relative w-full min-h-[95vh] flex items-center justify-center px-6 md:px-12 pt-32 pb-20 overflow-hidden">
                {/* Sparkles Background */}
                <div className="absolute inset-0 w-full h-full">
                    <SparklesCore
                        id="pricing-hero-sparkles"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={80}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F1C2E]/30 via-transparent to-[#0F1C2E] pointer-events-none"></div>

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <ScrollReveal direction="down" duration={0.8}>
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary-300/10 border border-primary-300/30 rounded-full mb-10 backdrop-blur-md">
                            <Sparkles className="w-5 h-5 text-primary-300" />
                            <span className="font-tech text-sm text-primary-300 uppercase tracking-wider">Tarification Simple & Transparente</span>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2} blur>
                        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-9xl text-white mb-8 leading-[1.05] drop-shadow-2xl">
                            Un Prix.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-white to-accent-200 animate-gradient-x">
                                Tout Inclus.
                            </span>
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={0.4} direction="up">
                        <p className="font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl text-text-200 max-w-4xl mx-auto mb-12 leading-relaxed">
                            Installation + Abonnement calculé selon votre usage réel
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.6} direction="up">
                        <a
                            href="#calculator"
                            className="group inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-primary-300 to-primary-400 text-bg-100 font-display font-bold text-xl rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_50px_rgba(172,194,239,0.6)] hover:shadow-[0_0_70px_rgba(172,194,239,0.8)]"
                        >
                            CALCULER MON TARIF
                            <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </ScrollReveal>
                </div>
            </section>

            {/* INSTALLATION PRICING SECTION */}
            <section className="relative w-full py-40 px-6 md:px-12" style={{ backgroundColor: '#0F1C2E' }}>
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ACC2EF]/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF6B6B]/5 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-24">
                        <ScrollReveal>
                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#ACC2EF]/10 border border-[#ACC2EF]/30 rounded-full mb-8 backdrop-blur-sm">
                                <Euro className="w-5 h-5 text-[#ACC2EF]" />
                                <span className="font-tech text-sm text-[#ACC2EF] uppercase tracking-wider">Prix Installation</span>
                            </div>
                            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight">
                                Tarifs<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ACC2EF] to-white">Installation</span>
                            </h2>
                            <p className="text-[#8B9DC3] text-sm sm:text-base md:text-xl max-w-3xl mx-auto">
                                Investissement unique pour une configuration professionnelle
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Installation Minimum */}
                        <ScrollReveal delay={0.1}>
                            <div className="group relative">
                                <div className="absolute -inset-[2px] bg-gradient-to-br from-[#1C2A3A] to-[#0F1C2E] rounded-3xl"></div>
                                <div className="relative bg-gradient-to-br from-[#1C2A3A]/90 to-[#0F1C2E]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-[#ACC2EF]/50 transition-all duration-500 hover:-translate-y-2">
                                    <div className="mb-6">
                                        <div className="text-[#8B9DC3] text-sm uppercase tracking-wider mb-3">Installation</div>
                                        <h3 className="font-display font-bold text-2xl text-white mb-4">
                                            Minimum
                                        </h3>
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-display font-bold text-6xl text-[#ACC2EF]">1 500</span>
                                            <span className="text-[#8B9DC3] text-xl">€</span>
                                        </div>
                                    </div>

                                    <p className="text-[#8B9DC3] text-sm mb-8 leading-relaxed">
                                        Configuration de base pour un seul agent vocal sur un numéro
                                    </p>

                                    <div className="space-y-3">
                                        {[
                                            '1 agent vocal configuré',
                                            '1 numéro de téléphone',
                                            'Formation initiale incluse',
                                            'Support installation'
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full bg-[#ACC2EF]/20 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle className="w-3 h-3 text-[#ACC2EF]" />
                                                </div>
                                                <span className="text-[#8B9DC3] text-sm">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Installation Standard - HIGHLIGHTED */}
                        <ScrollReveal delay={0.2}>
                            <div className="group relative">
                                {/* Glowing border */}
                                <div className="absolute -inset-[2px] bg-gradient-to-br from-[#ACC2EF] via-[#7FA8E8] to-[#ACC2EF] rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity"></div>

                                <div className="relative bg-gradient-to-br from-[#1C2A3A] to-[#0F1C2E] rounded-3xl p-8 hover:-translate-y-3 transition-all duration-500">
                                    {/* Badge */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-[#ACC2EF] to-[#7FA8E8] text-[#0F1C2E] font-tech text-xs uppercase tracking-wider rounded-full shadow-lg font-bold">
                                        Recommandé
                                    </div>

                                    <div className="mb-6 pt-4">
                                        <div className="text-[#ACC2EF] text-sm uppercase tracking-wider mb-3">Installation</div>
                                        <h3 className="font-display font-bold text-2xl text-white mb-4">
                                            Standard
                                        </h3>
                                        <div className="flex items-baseline gap-2 mb-2">
                                            <span className="font-display font-bold text-5xl text-[#ACC2EF]">3K - 5K</span>
                                            <span className="text-[#8B9DC3] text-xl">€</span>
                                        </div>
                                        <p className="text-[#ACC2EF]/70 text-xs">Selon fonctionnalités</p>
                                    </div>

                                    <p className="text-[#8B9DC3] text-sm mb-8 leading-relaxed">
                                        Configuration complète avec personnalisation avancée
                                    </p>

                                    <div className="space-y-3">
                                        {[
                                            'Personnalisation complète de l\'IA',
                                            'Intégration CRM sur mesure',
                                            'Formation équipe complète',
                                            'Multi-numéros possibles',
                                            'Support prioritaire'
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full bg-[#ACC2EF]/30 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle className="w-3 h-3 text-[#ACC2EF]" />
                                                </div>
                                                <span className="text-[#8B9DC3] text-sm">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Multi-Agents */}
                        <ScrollReveal delay={0.3}>
                            <div className="group relative">
                                <div className="absolute -inset-[2px] bg-gradient-to-br from-[#1C2A3A] to-[#0F1C2E] rounded-3xl"></div>
                                <div className="relative bg-gradient-to-br from-[#1C2A3A]/90 to-[#0F1C2E]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-[#FF6B6B]/50 transition-all duration-500 hover:-translate-y-2">
                                    <div className="mb-6">
                                        <div className="text-[#8B9DC3] text-sm uppercase tracking-wider mb-3">Installation</div>
                                        <h3 className="font-display font-bold text-2xl text-white mb-4">
                                            Multi-Agents
                                        </h3>
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-display font-bold text-6xl text-[#FF6B6B]">+500</span>
                                            <span className="text-[#8B9DC3] text-xl">€</span>
                                            <span className="text-[#8B9DC3] text-sm">/agent</span>
                                        </div>
                                    </div>

                                    <p className="text-[#8B9DC3] text-sm mb-8 leading-relaxed">
                                        Ajout d'agents différents par numéro
                                    </p>

                                    <div className="space-y-3">
                                        {[
                                            'Agent vocal supplémentaire',
                                            'Personnalité et voix distinctes',
                                            'Configuration métier spécifique',
                                            'Formation dédiée'
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full bg-[#FF6B6B]/20 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle className="w-3 h-3 text-[#FF6B6B]" />
                                                </div>
                                                <span className="text-[#8B9DC3] text-sm">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Explanation */}
                    <ScrollReveal delay={0.4}>
                        <div className="mt-20 max-w-4xl mx-auto">
                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C2A3A]/50 to-[#0F1C2E]/50 backdrop-blur-xl border border-[#ACC2EF]/20 p-6 md:p-10">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ACC2EF]/5 rounded-full blur-3xl"></div>
                                <div className="relative flex flex-col md:flex-row items-start gap-6 w-full">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ACC2EF]/20 to-[#7FA8E8]/10 flex items-center justify-center flex-shrink-0 border border-[#ACC2EF]/30">
                                        <Settings className="w-7 h-7 text-[#ACC2EF]" />
                                    </div>
                                    <div>
                                        <h4 className="font-display font-bold text-2xl text-white mb-4">
                                            Installation Standard : 3K€ - 5K€
                                        </h4>
                                        <p className="text-[#8B9DC3] text-lg leading-relaxed">
                                            Le prix varie selon les <span className="font-bold text-white">fonctionnalités à connecter ou configurer</span> : intégrations CRM complexes, connexions API multiples, configurations métier avancées, etc.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* SUBSCRIPTION SECTION */}
            <section className="relative w-full py-40 px-6 md:px-12" style={{ backgroundColor: '#1a2332' }}>
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-[#ACC2EF]/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#5B8DEF]/5 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-24">
                        <ScrollReveal>
                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#ACC2EF]/10 border border-[#ACC2EF]/30 rounded-full mb-8 backdrop-blur-sm">
                                <TrendingUp className="w-5 h-5 text-[#ACC2EF]" />
                                <span className="font-tech text-sm text-[#ACC2EF] uppercase tracking-wider">Abonnement Mensuel</span>
                            </div>
                            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight">
                                Abonnement<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ACC2EF] to-white">Calculé</span>
                            </h2>
                            <p className="text-[#8B9DC3] text-sm sm:text-base md:text-xl max-w-3xl mx-auto">
                                Tout inclus : maintenance + crédits d'appel IA
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* Pricing Explanation */}
                    <ScrollReveal delay={0.2}>
                        <div className="max-w-4xl mx-auto">
                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C2A3A]/80 to-[#0F1C2E]/80 backdrop-blur-xl border border-[#ACC2EF]/20 p-6 md:p-12">
                                {/* Glow effect */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ACC2EF]/10 rounded-full blur-3xl"></div>

                                <div className="relative flex flex-col md:flex-row items-start gap-6 w-full">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ACC2EF]/30 to-[#7FA8E8]/20 flex items-center justify-center flex-shrink-0 border border-[#ACC2EF]/40">
                                        <Zap className="w-8 h-8 text-[#ACC2EF]" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-display font-bold text-xl sm:text-2xl md:text-2xl lg:text-3xl text-white mb-6">
                                            Comment est calculé l'abonnement ?
                                        </h4>

                                        {/* Formula */}
                                        <div className="bg-gradient-to-r from-[#ACC2EF]/10 to-[#7FA8E8]/5 border border-[#ACC2EF]/30 rounded-2xl p-6 mb-6">
                                            <div className="text-[#ACC2EF] text-sm uppercase tracking-wider mb-3">Formule</div>
                                            <p className="text-white text-base sm:text-lg md:text-lg lg:text-xl font-display">
                                                Appels/jour × Durée moyenne × 30 jours × Tarif/minute
                                            </p>
                                        </div>

                                        {/* Example */}
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                            <div className="text-[#8B9DC3] text-sm uppercase tracking-wider mb-3">Exemple Concret</div>
                                            <div className="flex items-baseline gap-3 flex-wrap">
                                                <span className="text-[#8B9DC3] text-base sm:text-lg md:text-lg">20 appels/jour × 3 min × 30 jours × 0,40€/min =</span>
                                                <span className="font-display font-bold text-5xl sm:text-6xl md:text-5xl text-[#ACC2EF]">720€</span>
                                                <span className="text-[#8B9DC3] text-xl">/mois</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* PRICING TIERS SECTION */}
            <section className="relative w-full py-40 px-6 md:px-12" style={{ backgroundColor: '#0F1C2E' }}>
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#ACC2EF]/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#A78BFA]/5 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-24">
                        <ScrollReveal>
                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 rounded-full mb-8 backdrop-blur-sm">
                                <Euro className="w-5 h-5 text-[#FF6B6B]" />
                                <span className="font-tech text-sm text-[#FF6B6B] uppercase tracking-wider">Grille Tarifaire</span>
                            </div>
                            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight">
                                Tarifs à<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-white">la Minute</span>
                            </h2>
                            <p className="text-[#8B9DC3] text-sm sm:text-base md:text-xl max-w-3xl mx-auto">
                                Votre pack s'adapte automatiquement à votre volume d'appels
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* START Pack */}
                        <ScrollReveal delay={0.1}>
                            <div className="group relative">
                                <div className="absolute -inset-[2px] bg-gradient-to-br from-[#1C2A3A] to-[#0F1C2E] rounded-3xl"></div>
                                <div className="relative bg-gradient-to-br from-[#1C2A3A]/90 to-[#0F1C2E]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-[#5B8DEF]/50 transition-all duration-500 hover:-translate-y-2">
                                    <div className="mb-8">
                                        <h3 className="font-display font-bold text-2xl text-white mb-2">STARTER</h3>
                                        <p className="text-[#8B9DC3] text-sm">3 appels/jour</p>
                                        <p className="text-[#8B9DC3] text-xs mt-1">400 min/mois</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <div className="text-[#8B9DC3] text-xs mb-3 uppercase tracking-wider">Abonnement mensuel</div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="font-display font-bold text-5xl text-[#5B8DEF]">199</span>
                                                <span className="text-[#8B9DC3] text-lg">€/mois</span>
                                            </div>
                                            <p className="text-[#8B9DC3] text-xs mt-2">0,50€/min</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* GROWTH Pack - HIGHLIGHTED */}
                        <ScrollReveal delay={0.2}>
                            <div className="group relative">
                                {/* Glowing border */}
                                <div className="absolute -inset-[2px] bg-gradient-to-br from-[#ACC2EF] via-[#7FA8E8] to-[#ACC2EF] rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity"></div>

                                <div className="relative bg-gradient-to-br from-[#1C2A3A] to-[#0F1C2E] rounded-3xl p-8 hover:-translate-y-3 transition-all duration-500">
                                    {/* Badge */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-[#ACC2EF] to-[#7FA8E8] text-[#0F1C2E] font-tech text-xs uppercase tracking-wider rounded-full shadow-lg font-bold">
                                        Populaire
                                    </div>

                                    <div className="mb-8 pt-4">
                                        <h3 className="font-display font-bold text-2xl text-white mb-2">GROWTH</h3>
                                        <p className="text-[#ACC2EF]/80 text-sm">10 appels/jour</p>
                                        <p className="text-[#ACC2EF]/60 text-xs mt-1">1250 min/mois</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <div className="text-[#ACC2EF]/70 text-xs mb-3 uppercase tracking-wider">Abonnement mensuel</div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="font-display font-bold text-5xl text-[#ACC2EF]">499</span>
                                                <span className="text-[#8B9DC3] text-lg">€/mois</span>
                                            </div>
                                            <p className="text-[#8B9DC3] text-xs mt-2">0,40€/min</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* SCALE Pack */}
                        <ScrollReveal delay={0.3}>
                            <div className="group relative">
                                <div className="absolute -inset-[2px] bg-gradient-to-br from-[#1C2A3A] to-[#0F1C2E] rounded-3xl"></div>
                                <div className="relative bg-gradient-to-br from-[#1C2A3A]/90 to-[#0F1C2E]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-[#FF6B6B]/50 transition-all duration-500 hover:-translate-y-2">
                                    <div className="mb-8">
                                        <h3 className="font-display font-bold text-2xl text-white mb-2">SCALE</h3>
                                        <p className="text-[#8B9DC3] text-sm">30 appels/jour</p>
                                        <p className="text-[#8B9DC3] text-xs mt-1">3500 min/mois</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <div className="text-[#8B9DC3] text-xs mb-3 uppercase tracking-wider">Abonnement mensuel</div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="font-display font-bold text-5xl text-[#FF6B6B]">1049</span>
                                                <span className="text-[#8B9DC3] text-lg">€/mois</span>
                                            </div>
                                            <p className="text-[#8B9DC3] text-xs mt-2">0,30€/min</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* ENTERPRISE Pack */}
                        <ScrollReveal delay={0.4}>
                            <div className="group relative">
                                <div className="absolute -inset-[2px] bg-gradient-to-br from-[#1C2A3A] to-[#0F1C2E] rounded-3xl"></div>
                                <div className="relative bg-gradient-to-br from-[#1C2A3A]/90 to-[#0F1C2E]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-[#A78BFA]/50 transition-all duration-500 hover:-translate-y-2">
                                    <div className="mb-8">
                                        <h3 className="font-display font-bold text-2xl text-white mb-2">ENTERPRISE</h3>
                                        <p className="text-[#8B9DC3] text-sm">+30 appels/jour</p>
                                        <p className="text-[#8B9DC3] text-xs mt-1">+3500 min/mois</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <div className="text-[#8B9DC3] text-xs mb-3 uppercase tracking-wider">Tarif sur devis</div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="font-display font-bold text-3xl text-[#A78BFA]">0,22-0,30</span>
                                                <span className="text-[#8B9DC3] text-lg">€/min</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Explanation */}
                    <ScrollReveal delay={0.5}>
                        <div className="mt-20 max-w-4xl mx-auto">
                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C2A3A]/50 to-[#0F1C2E]/50 backdrop-blur-xl border border-[#FF6B6B]/20 p-6 md:p-10">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B6B]/5 rounded-full blur-3xl"></div>
                                <div className="relative flex flex-col md:flex-row items-start gap-6 w-full">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/20 to-[#EE5A6F]/10 flex items-center justify-center flex-shrink-0 border border-[#FF6B6B]/30">
                                        <Zap className="w-7 h-7 text-[#FF6B6B]" />
                                    </div>
                                    <div>
                                        <h4 className="font-display font-bold text-2xl text-white mb-4">
                                            Comment ça marche ?
                                        </h4>
                                        <p className="text-[#8B9DC3] text-lg leading-relaxed">
                                            Votre <span className="font-bold text-white">pack s'adapte automatiquement</span> selon votre volume d'appels quotidien. Plus vous appelez, moins c'est cher à la minute !
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div >
            </section >

            {/* CALCULATOR SECTION */}
            < section id="calculator" className="relative w-full py-40 px-6 md:px-12" style={{ backgroundColor: '#1a2332' }}>
                <CostCalculator />
            </section >

            {/* FAQ SECTION */}
            < section className="relative w-full py-40 px-6 md:px-12" style={{ backgroundColor: '#0F1C2E' }}>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-20">
                        <ScrollReveal>
                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary-300/10 border border-primary-300/30 rounded-full mb-8">
                                <HelpCircle className="w-5 h-5 text-primary-300" />
                                <span className="font-tech text-sm text-primary-300 uppercase tracking-wider">Questions Fréquentes</span>
                            </div>
                            <h2 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-4">
                                FAQ
                            </h2>
                        </ScrollReveal>
                    </div>

                    <div className="space-y-4">
                        {faqItems.map((faq, idx) => (
                            <ScrollReveal key={idx} delay={idx * 0.05}>
                                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary-300/50 transition-all duration-300">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                        className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors group"
                                    >
                                        <span className="font-display font-bold text-xl text-white pr-4 group-hover:text-primary-300 transition-colors">{faq.question}</span>
                                        <ChevronDown className={`w-6 h-6 text-primary-300 flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-96' : 'max-h-0'}`}>
                                        <div className="px-8 pb-6 text-text-200 leading-relaxed text-lg">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section >

            {/* FINAL CTA SECTION */}
            < section className="relative w-full py-48 px-6" style={{ backgroundColor: '#0F1C2E' }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[150px]" style={{ backgroundColor: 'rgba(172, 194, 239, 0.12)' }}></div>

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <ScrollReveal direction="down">
                        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-white mb-10 leading-tight">
                            Prêt à Transformer<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-200">Votre Gestion d'Appels ?</span>
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <p className="font-sans text-text-200 text-base sm:text-lg md:text-2xl mb-14 max-w-3xl mx-auto leading-relaxed">
                            Calculez votre tarif ou demandez une démo personnalisée
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.4} direction="up">
                        <div className="flex flex-wrap gap-6 justify-center">
                            <a
                                href="#calculator"
                                className="group inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-primary-300 to-primary-400 text-bg-100 font-display font-bold text-xl rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_50px_rgba(172,194,239,0.6)]"
                            >
                                CALCULER MON TARIF
                                <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-3 px-12 py-6 border-2 border-white/20 text-white font-display font-bold text-xl rounded-full hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
                            >
                                DEMANDER UNE DÉMO
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section >
        </div >
    );
};

export default PricingUnified;
