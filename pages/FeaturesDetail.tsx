import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Database, Zap, FileText, PhoneCall, CheckCircle2, ArrowRight, Brain, Calendar, BarChart3, Headphones, MessageSquare, Clock, Sparkles } from 'lucide-react';

const FeaturesDetail: React.FC = () => {
    const location = useLocation();
    const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Mouse tracking for spotlight effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('data-section-id');
                        if (id) {
                            setVisibleSections(prev => new Set(prev).add(parseInt(id)));
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('[data-section-id]').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // Scroll to section if hash is present
    useEffect(() => {
        if (location.hash) {
            setTimeout(() => {
                const element = document.querySelector(location.hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    return (
        <div className="w-full min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0F1C2E' }}>
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
            </div>

            {/* Spotlight Effect */}
            <div
                className="fixed w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out blur-3xl opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(100,150,255,0.3) 0%, transparent 70%)',
                    left: mousePosition.x - 192,
                    top: mousePosition.y - 192,
                }}
            />

            {/* Hero Section */}
            <section className="relative w-full py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 via-transparent to-transparent"></div>

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-primary-300/30 rounded-full animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${5 + Math.random() * 10}s`
                            }}
                        />
                    ))}
                </div>

                <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center mb-12" data-section-id="0">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-300/10 border border-primary-300/30 rounded-full mb-6 backdrop-blur-md animate-fade-in-up">
                            <Sparkles className="w-4 h-4 text-primary-300 animate-pulse" />
                            <span className="font-tech text-xs text-primary-300 uppercase tracking-wider">Documentation Complète</span>
                        </div>
                        <h1 className="font-display font-bold text-5xl md:text-7xl text-white mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            Fonctionnalités <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Vocal Flow</span>
                        </h1>
                        <p className="text-text-200 text-xl max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            Découvrez en détail comment Vocal Flow révolutionne la gestion d'appels professionnelle grâce à l'intelligence artificielle vocale de pointe
                        </p>
                    </div>

                    {/* Quick Navigation */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {[
                            { icon: <Database className="w-5 h-5" />, label: "Intelligence", href: "#intelligence", gradient: "from-blue-400 to-blue-500" },
                            { icon: <Zap className="w-5 h-5" />, label: "Automatisation", href: "#automation", gradient: "from-blue-400 to-blue-600" },
                            { icon: <FileText className="w-5 h-5" />, label: "Transcription", href: "#transcription", gradient: "from-blue-500 to-blue-700" },
                            { icon: <PhoneCall className="w-5 h-5" />, label: "Communication", href: "#communication", gradient: "from-blue-400 to-indigo-600" }
                        ].map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href}
                                className="group relative flex items-center gap-3 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:border-primary-300/40 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,240,255,0.2)] animate-fade-in-up overflow-hidden"
                                style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
                            >
                                {/* Gradient background on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                                <div className="relative text-primary-300 group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                <span className="relative text-white text-sm font-display">{item.label}</span>

                                {/* Shine effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Intelligence & Données Section */}
            <section id="intelligence" className="relative w-full py-24 border-t border-white/5" data-section-id="1">
                <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 transition-all duration-1000 ${visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 animate-float">
                                    <Database className="w-7 h-7 text-white" />
                                </div>
                                <h2 className="font-display font-bold text-4xl text-white">Intelligence & Données</h2>
                            </div>
                            <p className="text-text-200 text-lg leading-relaxed mb-6">
                                Vocal Flow ne se contente pas de répondre aux appels : il comprend votre business dans les moindres détails. Grâce à une connexion profonde avec vos systèmes métier, l'IA dispose d'une connaissance exhaustive pour fournir des réponses ultra-précises et contextualisées.
                            </p>
                            <div className="flex items-center gap-2 text-primary-300">
                                <div className="w-12 h-[2px] bg-gradient-to-r from-primary-300 to-transparent"></div>
                                <span className="font-tech text-sm uppercase tracking-wider">Powered by AI</span>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/60 to-blue-500/60 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                            <img
                                src="/ai_data_intelligence.png"
                                alt="Intelligence artificielle et données"
                                className="relative w-full rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Feature Cards with Glassmorphism */}
                    <div className="space-y-6">
                        {[
                            {
                                icon: <Database className="w-6 h-6" />,
                                title: "Base de Données Ultra Enrichie",
                                desc: "Vocal Flow s'intègre nativement à vos systèmes existants pour accéder en temps réel à toutes les informations critiques de votre activité.",
                                features: [
                                    { title: "Catalogue Produits & Services", desc: "Accès instantané avec prix, disponibilités et recommandations IA" },
                                    { title: "Agenda Temps Réel", desc: "Synchronisation bidirectionnelle pour une gestion optimale des RDV" },
                                    { title: "Historique Client CRM", desc: "Personnalisation basée sur le profil et l'historique complet" },
                                    { title: "Données Métier Spécifiques", desc: "Adaptation totale à vos processus et informations uniques" }
                                ]
                            },
                            {
                                icon: <Headphones className="w-6 h-6" />,
                                title: "Connexion CRM Native",
                                desc: "Intégration CRM incluse dans le prix de base. Synchronisation automatique et bidirectionnelle des données clients.",
                                features: [
                                    { title: "Synchronisation Automatique", desc: "Enrichissement CRM sans saisie manuelle" },
                                    { title: "Reconnaissance Client", desc: "Identification instantanée et personnalisation" },
                                    { title: "Création de Fiches", desc: "Nouveaux contacts ajoutés automatiquement" }
                                ]
                            },
                            {
                                icon: <BarChart3 className="w-6 h-6" />,
                                title: "Dashboard Analytics Avancé",
                                desc: "Métriques détaillées en temps réel pour optimiser continuellement vos processus.",
                                stats: [
                                    { value: "97.6%", label: "Taux de résolution" },
                                    { value: "24/7", label: "Disponibilité" },
                                    { value: "-70%", label: "Réduction coûts" }
                                ]
                            }
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className={`group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-all duration-700 hover:border-primary-300/40 hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,240,255,0.2)] ${visibleSections.has(1) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
                                style={{ transitionDelay: `${idx * 150}ms` }}
                            >
                                {/* Gradient glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-300/20 to-cyan-500/20 backdrop-blur-md border border-cyan-300/30 rounded-xl flex items-center justify-center text-primary-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                                            {feature.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-display font-bold text-2xl text-white mb-3">{feature.title}</h3>
                                            <p className="text-text-200 leading-relaxed">{feature.desc}</p>
                                        </div>
                                    </div>

                                    {feature.features && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {feature.features.map((item, i) => (
                                                <div key={i} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                                                    <h4 className="font-display font-bold text-white mb-2 flex items-center gap-2">
                                                        <CheckCircle2 className="w-4 h-4 text-primary-300 flex-shrink-0" />
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-text-200 text-sm">{item.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {feature.stats && (
                                        <div className="grid grid-cols-3 gap-4">
                                            {feature.stats.map((stat, i) => (
                                                <div key={i} className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition-colors">
                                                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-2">{stat.value}</div>
                                                    <div className="text-text-200 text-sm">{stat.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Shimmer effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Automation Section with alternating layout */}
            <section id="automation" className="relative w-full py-24 border-t border-white/5" style={{ backgroundColor: '#1a2332' }} data-section-id="2">
                <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 transition-all duration-1000 ${visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                        <div className="order-2 lg:order-1 relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/60 to-blue-600/60 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                            <img
                                src="/automation_workflow.png"
                                alt="Automatisation et workflow"
                                className="relative w-full rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 animate-float" style={{ animationDelay: '0.5s' }}>
                                    <Zap className="w-7 h-7 text-white" />
                                </div>
                                <h2 className="font-display font-bold text-4xl text-white">Automatisation & Gestion</h2>
                            </div>
                            <p className="text-text-200 text-lg leading-relaxed">
                                Libérez votre équipe des tâches répétitives. Vocal Flow automatise l'intégralité du processus de gestion d'appels avec une intelligence qui s'améliore continuellement.
                            </p>
                        </div>
                    </div>

                    {/* Automation Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Calendar className="w-6 h-6" />,
                                title: "Prise de RDV 24/7",
                                desc: "Workflow intelligent en 4 étapes",
                                color: "from-blue-400 to-blue-600"
                            },
                            {
                                icon: <CheckCircle2 className="w-6 h-6" />,
                                title: "Classification Auto",
                                desc: "Statuts intelligents et scoring",
                                color: "from-blue-500 to-blue-700"
                            },
                            {
                                icon: <Clock className="w-6 h-6" />,
                                title: "Disponibilité Continue",
                                desc: "0 appel manqué, service 24/7",
                                color: "from-blue-400 to-indigo-600"
                            }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className={`group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-primary-300/40 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,240,255,0.2)] ${visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                                style={{ transitionDelay: `${idx * 150}ms` }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500`}></div>
                                <div className="relative">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="font-display font-bold text-xl text-white mb-2">{item.title}</h3>
                                    <p className="text-text-200 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Transcription Section */}
            <section id="transcription" className="relative w-full py-24 border-t border-white/5" data-section-id="3">
                <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 transition-all duration-1000 ${visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30 animate-float" style={{ animationDelay: '1s' }}>
                                    <FileText className="w-7 h-7 text-white" />
                                </div>
                                <h2 className="font-display font-bold text-4xl text-white">Transcription & Analyse</h2>
                            </div>
                            <p className="text-text-200 text-lg leading-relaxed">
                                Ne perdez plus jamais une information importante. Vocal Flow enregistre, transcrit et analyse chaque conversation pour en extraire automatiquement les insights clés.
                            </p>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/60 to-blue-700/60 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                            <img
                                src="/transcription_analysis.png"
                                alt="Transcription et analyse"
                                className="relative w-full rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Transcription Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                icon: <FileText className="w-5 h-5" />,
                                title: "Transcription Complète",
                                accuracy: "97.6%",
                                features: ["Horodatage précis", "Multi-langues", "Export PDF/TXT/DOCX"]
                            },
                            {
                                icon: <MessageSquare className="w-5 h-5" />,
                                title: "Résumé Automatique",
                                accuracy: "100%",
                                features: ["Structure en 4 parties", "Personnalisable", "Actions de suivi"]
                            },
                            {
                                icon: <Brain className="w-5 h-5" />,
                                title: "Qualification Client",
                                accuracy: "Auto",
                                features: ["Collecte automatique", "Scoring intelligent", "Enrichissement continu"]
                            },
                            {
                                icon: <BarChart3 className="w-5 h-5" />,
                                title: "Analytics Avancés",
                                accuracy: "Real-time",
                                features: ["Métriques détaillées", "Rapports exportables", "Insights IA"]
                            }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className={`group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-primary-300/40 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,240,255,0.2)] ${visibleSections.has(3) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                                style={{ transitionDelay: `${idx * 100}ms` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                                            {item.icon}
                                        </div>
                                        <div className="px-3 py-1 bg-primary-300/20 border border-primary-300/30 rounded-full">
                                            <span className="text-primary-300 text-xs font-bold">{item.accuracy}</span>
                                        </div>
                                    </div>
                                    <h3 className="font-display font-bold text-lg text-white mb-3">{item.title}</h3>
                                    <ul className="space-y-2">
                                        {item.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-text-200 text-sm">
                                                <div className="w-1.5 h-1.5 bg-primary-300 rounded-full"></div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Communication Section */}
            <section id="communication" className="relative w-full py-24 border-t border-white/5" style={{ backgroundColor: '#1a2332' }} data-section-id="4">
                <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 animate-float" style={{ animationDelay: '1.5s' }}>
                            <PhoneCall className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="font-display font-bold text-4xl text-white">Appels & Communication</h2>
                    </div>

                    {/* Inbound vs Outbound Cards */}
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 transition-all duration-1000 ${visibleSections.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                        {[
                            {
                                title: "Inbound (Entrants)",
                                icon: <PhoneCall className="w-6 h-6" />,
                                gradient: "from-blue-400 to-blue-600",
                                features: [
                                    "Réponse immédiate sans attente",
                                    "Logique conversationnelle personnalisée",
                                    "Gestion des urgences",
                                    "Volume illimité simultané"
                                ]
                            },
                            {
                                title: "Outbound (Sortants)",
                                icon: <PhoneCall className="w-6 h-6" />,
                                gradient: "from-blue-500 to-indigo-700",
                                features: [
                                    "Uniquement à chaud (demande de rappel)",
                                    "Qualification et prise de RDV",
                                    "Message vocal si pas de réponse",
                                    "Statut mis à jour automatiquement"
                                ]
                            }
                        ].map((type, idx) => (
                            <div
                                key={idx}
                                className="group relative bg-white/5 backdrop-blur-xl border-2 border-primary-300/40 rounded-2xl p-8 hover:border-primary-300/60 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,240,255,0.3)] overflow-hidden"
                                style={{ transitionDelay: `${idx * 150}ms` }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                                <div className="relative">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className={`w-12 h-12 bg-gradient-to-br ${type.gradient} rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            {type.icon}
                                        </div>
                                        <h3 className="font-display font-bold text-2xl text-white">{type.title}</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {type.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-primary-300 mt-0.5 flex-shrink-0" />
                                                <span className="text-text-200 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final with Gradient */}
            <section className="relative w-full py-32 border-t border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/10 to-transparent"></div>
                <div className="max-w-screen-xl mx-auto px-6 md:px-12 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-300/10 border border-primary-300/30 rounded-full mb-6 backdrop-blur-md">
                        <Sparkles className="w-4 h-4 text-primary-300 animate-pulse" />
                        <span className="font-tech text-xs text-primary-300 uppercase tracking-wider">Prêt à Démarrer</span>
                    </div>
                    <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-6">
                        Révolutionnez Votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Gestion d'Appels</span>
                    </h2>
                    <p className="text-text-200 text-xl mb-12 max-w-2xl mx-auto">
                        Découvrez comment Vocal Flow peut transformer votre activité avec une démo personnalisée gratuite
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-display font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(100,150,255,0.4)]"
                        >
                            <span className="relative z-10">Demander une Démo</span>
                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </a>
                        <a
                            href="/tarification"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-md border-2 border-primary-300/50 text-primary-300 font-display font-bold rounded-lg hover:bg-white/10 hover:border-primary-300 transition-all duration-300"
                        >
                            <span>Voir les Tarifs</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Custom CSS for animations */}
            <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default FeaturesDetail;
