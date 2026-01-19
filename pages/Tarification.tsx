import React, { useEffect, useState } from 'react';
import { Check, ArrowRight, Zap, Star, TrendingUp, Phone, Building2, Factory } from 'lucide-react';
import { InfiniteMovingCards } from '../components/ui/aceternity/infinite-moving-cards';
import { ScrollReveal } from '../components/ui/scroll-reveal';
import { CountUp } from '../components/ui/count-up';
import { VolumeCardsGrid } from '../components/ui/aceternity/volume-cards-grid';

const Tarification: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Client typologies based on call volume
    const clientTypologies = [
        {
            icon: <Building2 className="w-6 h-6" />,
            volume: "3-4 appels/jour",
            priceRange: "0,50€ - 0,60€",
            description: "Petits cabinets, artisans, professions libérales",
            color: "from-white/5 to-white/10 border-white/10"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            volume: "30-100 appels/jour",
            priceRange: "0,40€ - 0,50€",
            description: "PME, cabinets médicaux, garages",
            color: "from-primary-300/10 to-primary-300/20 border-primary-300/30"
        },
        {
            icon: <Factory className="w-6 h-6" />,
            volume: "+100 appels/jour",
            priceRange: "0,30€ - 0,40€",
            description: "Call centers, grandes entreprises",
            color: "from-primary-300/20 to-primary-300/30 border-primary-300/50"
        },
        {
            icon: <Star className="w-6 h-6" />,
            volume: "+1000 appels/jour",
            priceRange: "0,22€ - 0,30€",
            description: "Centres d'appels haute volumétrie",
            color: "from-accent-200/20 to-accent-200/30 border-accent-200/50"
        }
    ];

    // Pricing tiers
    const pricingTiers = [
        {
            name: 'Starter',
            tagline: 'Pour démarrer',
            callRange: '3 appels/jour',
            minutes: '400 minutes/mois',
            calls: '100 appels/mois',
            monthlyEstimate: '199€',
            pricePerMinute: '0,50€/min',
            costInfo: 'Coût: 48€ - Marge: 151€',
            description: 'Idéal pour les petits cabinets et artisans qui souhaitent automatiser leurs premiers appels.',
            features: [
                'Prise de RDV automatique 24/7',
                'Transcription complète des appels',
                'Dashboard de suivi en temps réel',
                'Connexion CRM incluse',
                'Support WhatsApp sous 24h',
                'Mises à jour IA continues',
                'Sécurisation et maintenance',
                'Optimisation continue'
            ],
            cta: 'Démarrer',
            popular: false,
            color: 'primary-300'
        },
        {
            name: 'Growth',
            tagline: 'Le plus populaire',
            callRange: '10 appels/jour',
            minutes: '1250 minutes/mois',
            calls: '300 appels/mois',
            monthlyEstimate: '499€',
            pricePerMinute: '0,40€/min',
            costInfo: 'Coût: 150€ - Marge: 349€',
            description: 'Pour les PME et cabinets médicaux qui veulent automatiser à grande échelle.',
            features: [
                'Tout du plan Starter',
                'Qualification client ultra-précise',
                'Génération résumé d\'appel automatique',
                'Statut d\'appel automatique',
                'Multi-numéros et multi-agents',
                'Redirection vers humain si besoin',
                'Intégration WhatsApp (émission/réception)',
                'Analytics avancés'
            ],
            cta: 'Choisir Growth',
            popular: true,
            color: 'accent-200'
        },
        {
            name: 'Scale',
            tagline: 'Haute volumétrie',
            callRange: '30 appels/jour',
            minutes: '3500 minutes/mois',
            calls: '900 appels/mois',
            monthlyEstimate: '1049€',
            pricePerMinute: '0,30€/min',
            costInfo: 'Coût: 420€ - Marge: 629€',
            description: 'Solution complète pour call centers et organisations avec volume élevé.',
            features: [
                'Tout du plan Growth',
                'Volume élevé d\'appels',
                'Agents vocaux multiples',
                'Support dédié prioritaire',
                'Personnalisation complète de l\'IA',
                'Intégrations sur mesure',
                'SLA garanti',
                'Account manager dédié'
            ],
            cta: 'Choisir Scale',
            popular: false,
            color: 'primary-200'
        },
        {
            name: 'Enterprise',
            tagline: 'Sur mesure',
            callRange: '+30 appels/jour',
            minutes: '+3500 minutes/mois',
            calls: '+900 appels/mois',
            monthlyEstimate: 'Sur devis',
            pricePerMinute: '0,22€ - 0,30€/min',
            costInfo: 'Tarification personnalisée',
            description: 'Solution entièrement personnalisée pour les centres d\'appels haute volumétrie.',
            features: [
                'Tout du plan Scale',
                'Volume illimité d\'appels',
                'Agents vocaux illimités',
                'Support dédié 24/7',
                'Personnalisation complète de l\'IA',
                'Intégrations sur mesure',
                'SLA garanti premium',
                'Account manager dédié'
            ],
            cta: 'Contactez-nous',
            popular: false,
            color: 'primary-200'
        }
    ];

    return (
        <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#0F1C2E', overflowX: 'hidden' }}>

            {/* Hero Section */}
            <section className="relative w-full min-h-[70vh] flex items-center justify-center px-6 md:px-12 pt-32 pb-20">
                <div className={`absolute inset-0 opacity-10 transition-opacity duration-1000 ${isVisible ? 'opacity-10' : 'opacity-0'}`}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px]" style={{ backgroundColor: 'rgba(172, 194, 239, 0.2)' }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                            <ScrollReveal direction="down" duration={0.8}>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-300/10 border border-primary-300/30 rounded-full mb-8">
                                    <TrendingUp className="w-4 h-4 text-primary-300" />
                                    <span className="font-tech text-xs text-primary-300 uppercase tracking-wider">Tarification Transparente</span>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.2} blur>
                                <h1 className="font-display font-bold text-5xl md:text-7xl text-white mb-6 leading-tight">
                                    Un Prix <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-200">Juste</span><br />
                                    Pour Chaque Volume
                                </h1>
                            </ScrollReveal>

                            <ScrollReveal delay={0.4} direction="up">
                                <p className="font-sans text-xl text-text-200 max-w-xl mb-8 leading-relaxed">
                                    Tarification à la minute basée sur votre volume d'appels. Plus vous appelez, moins vous payez. Sans engagement, sans frais cachés.
                                </p>
                            </ScrollReveal>
                        </div>

                        {/* Cost Structure Info - Right Side */}
                        <ScrollReveal delay={0.6} direction="left">
                            <div className="w-full max-w-md mx-auto lg:ml-auto bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
                                <div className="flex flex-col gap-8">
                                    <div className="flex justify-between items-center border-b border-white/10 pb-6">
                                        <div>
                                            <p className="font-tech text-xs text-primary-300 uppercase tracking-wider mb-2">Prix Moyen / Min</p>
                                            <p className="font-display text-4xl text-white font-bold">~<CountUp to={0.33} decimals={2} delay={0.5} />€<span className="text-sm text-text-200 font-normal">/min</span></p>
                                        </div>
                                        <div className="h-12 w-12 bg-primary-300/10 rounded-lg flex items-center justify-center text-primary-300">
                                            <TrendingUp className="w-6 h-6" />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-tech text-xs text-primary-300 uppercase tracking-wider mb-2">Durée Moyenne</p>
                                            <p className="font-display text-4xl text-white font-bold"><CountUp to={3} delay={0.7} />-<CountUp to={4} delay={0.9} /><span className="text-sm text-text-200 font-normal"> min</span></p>
                                            <p className="text-xs text-text-200 mt-1">Par appel traité</p>
                                        </div>
                                        <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center text-gray-400">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Client Typologies */}
            <section className="relative w-full py-24 px-6 md:px-12" style={{ backgroundColor: '#1f2b3e' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                            Tarification Par Volume
                        </h2>
                        <p className="text-text-200 text-lg max-w-2xl mx-auto">
                            Plus vous utilisez Vocal Flow, plus le prix à la minute diminue
                        </p>
                    </div>



                    <VolumeCardsGrid items={clientTypologies} />
                    {/* Special Note */}
                    <div className="mt-12 text-center">
                        <p className="text-text-200 text-sm italic">
                            💡 Certains métiers (ex: avocats, consultants) acceptent un coût plus élevé même avec peu d'appels, compte tenu de la valeur ajoutée
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="relative w-full py-24 px-6 md:px-12" style={{ backgroundColor: '#0F1C2E' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                            Choisissez Votre Pack
                        </h2>
                        <p className="text-text-200 text-lg">
                            Tous les packs incluent les mêmes fonctionnalités, seul le volume d'appels change
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pricingTiers.map((tier, idx) => (
                            <ScrollReveal key={idx} delay={idx * 0.15} className="h-full">
                                <div
                                    className={`relative group rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col ${tier.popular
                                        ? 'bg-gradient-to-b from-primary-300/20 to-bg-100 border-2 border-primary-300 shadow-[0_0_50px_rgba(172,194,239,0.3)] scale-105 z-10'
                                        : 'bg-bg-100 border border-white/10 hover:border-primary-300/50 hover:shadow-[0_0_30px_rgba(172,194,239,0.15)]'
                                        }`}
                                >
                                    {tier.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-300 text-bg-100 font-tech text-xs uppercase tracking-wider rounded-full flex items-center gap-1">
                                            <Star className="w-3 h-3" />
                                            Plus Populaire
                                        </div>
                                    )}

                                    <div className="mb-6">
                                        <h3 className="font-display font-bold text-3xl text-white mb-2">{tier.name}</h3>
                                        <p className="text-text-200 text-sm">{tier.tagline}</p>
                                    </div>

                                    <div className="mb-6">
                                        <div className="font-tech text-xs text-primary-300 uppercase tracking-wider mb-2">{tier.callRange}</div>
                                        <div className="font-display font-bold text-4xl text-white mb-2">{tier.monthlyEstimate}<span className="text-lg text-text-200 font-normal">/mois</span></div>

                                        {/* Additional pricing details */}
                                        <div className="mt-4 space-y-2">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-text-200">Minutes incluses:</span>
                                                <span className="text-white font-semibold">{tier.minutes}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-text-200">Appels inclus:</span>
                                                <span className="text-white font-semibold">{tier.calls}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm pt-2 border-t border-white/10">
                                                <span className="text-text-200">Prix par minute:</span>
                                                <span className="text-primary-300 font-bold">{tier.pricePerMinute}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-text-200 mb-8 leading-relaxed flex-grow">{tier.description}</p>

                                    <button className={`w-full py-4 rounded-full font-display font-bold transition-all duration-200 mb-8 ${tier.popular
                                        ? 'bg-primary-300 text-bg-100 hover:scale-105 shadow-[0_0_20px_rgba(172,194,239,0.4)]'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}>
                                        {tier.cta}
                                    </button>

                                    <div className="space-y-4">
                                        <div className="font-tech text-xs text-primary-300 uppercase tracking-wider mb-4">Inclus:</div>
                                        {tier.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-primary-300 mt-0.5 flex-shrink-0" />
                                                <span className="text-text-200 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* All Subscriptions Include */}
                    <div className="mt-20 w-full">
                        <ScrollReveal>
                            <div className="bg-gradient-to-br from-primary-300/10 to-accent-200/10 border border-primary-300/30 rounded-2xl p-8">
                                <h3 className="font-display font-bold text-2xl text-white mb-6 text-center">
                                    Tous Les Abonnements Incluent
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        'Mises à jour IA automatiques',
                                        'Sécurisation des données',
                                        'Maintenance technique',
                                        'Support client sous 24h via WhatsApp privé',
                                        'Optimisation continue de l\'IA',
                                        'Connexion CRM incluse'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <Check className="w-5 h-5 text-primary-300 flex-shrink-0" />
                                            <span className="text-text-200">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-20">
                        <ScrollReveal delay={0.4}>
                            <p className="text-text-200 mb-8 text-center uppercase tracking-widest font-tech text-sm">Ils nous font confiance</p>
                            <div className="h-[20rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
                                <InfiniteMovingCards
                                    items={[
                                        { name: "Cabinet Dentaire Paris 15", title: "Santé", quote: "Vocal Flow gère nos RDV 24/7. Nos patients adorent la simplicité et nous avons réduit les no-shows de 40%." },
                                        { name: "Garage Auto Pro", title: "Automobile", quote: "L'IA prend les RDV atelier et collecte toutes les infos véhicule. Un gain de temps énorme pour notre équipe." },
                                        { name: "Call Center Solutions", title: "Services", quote: "La qualification automatique des leads nous a permis d'augmenter notre productivité de 60%." },
                                        { name: "Clinique Vétérinaire", title: "Santé", quote: "Parfait pour gérer les urgences et les RDV de routine. L'IA sait rediriger vers un humain quand nécessaire." },
                                    ]}
                                    direction="right"
                                    speed="slow"
                                />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative w-full py-32 px-6 bg-gradient-to-b from-bg-200 to-bg-100 border-t border-white/5">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px]" style={{ backgroundColor: 'rgba(172, 194, 239, 0.1)' }}></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <ScrollReveal direction="down">
                        <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-8">
                            Prêt à Automatiser <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-200">Vos Appels ?</span>
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <p className="font-sans text-text-200 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                            Démarrez avec un audit gratuit de vos besoins. Sans engagement, sans frais cachés.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.4} direction="up">
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a href="/contact" className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-bg-100 font-display font-bold rounded-full hover:scale-105 transition-all duration-200 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                                DEMANDER UN DEVIS
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="/installation" className="inline-flex items-center gap-3 px-10 py-5 border-2 border-white/20 text-white font-display font-bold rounded-full hover:bg-white/5 transition-all duration-200">
                                VOIR L'INSTALLATION
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
};

export default Tarification;
