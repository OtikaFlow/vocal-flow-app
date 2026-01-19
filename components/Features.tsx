import React, { useRef, useEffect, useState } from 'react';
import { Brain, Cpu, Heart, Database, Calendar, FileText, BarChart3, Headphones, PhoneCall, Zap, Clock, CheckCircle2, MessageSquare } from 'lucide-react';

const features = [
  {
    id: 1,
    title: "Intelligence",
    subtitle: "Base de Données Ultra Enrichie",
    desc: "Vocal Flow accède à une connaissance complète de votre business : catalogue produits/services avec prix, disponibilités agenda en temps réel, historique client CRM, et toutes les informations métier nécessaires pour des réponses ultra-précises.",
    stat: "100% Connecté",
    icon: <Brain className="w-8 h-8 text-white" />
  },
  {
    id: 2,
    title: "Automation",
    subtitle: "Prise de RDV & Réservations Automatisées",
    desc: "Automatisez complètement vos prises de rendez-vous et réservations. L'IA consulte vos disponibilités, propose des créneaux, confirme les RDV et envoie les rappels automatiques. Zéro intervention humaine requise.",
    stat: "24/7 Actif",
    icon: <Cpu className="w-8 h-8 text-white" />
  },
  {
    id: 3,
    title: "Qualification",
    subtitle: "Qualification Client Ultra-Précise",
    desc: "L'IA collecte et mémorise toutes les informations clés au fil de la conversation : besoins, budget, urgence, coordonnées. Chaque appel génère une fiche client complète avec transcription, résumé et statut automatique (RDV booké = succès).",
    stat: "97.6% Précis",
    icon: <Heart className="w-8 h-8 text-white" />
  }
];

const featureCategories = [
  {
    category: "Intelligence & Données",
    icon: <Database className="w-6 h-6" />,
    color: "from-cyan-300 to-cyan-500", // Cyan light to medium
    features: [
      { icon: <Database className="w-6 h-6" />, title: "BDD Ultra Enrichie", desc: "Connaissance complète : business, prix produits/services, agenda temps réel, historique CRM", highlight: true },
      { icon: <Headphones className="w-6 h-6" />, title: "Connexion CRM Native", desc: "Intégration bidirectionnelle avec votre CRM incluse dans le prix de base" },
      { icon: <BarChart3 className="w-6 h-6" />, title: "Dashboard Analytics", desc: "Suivi en temps réel de l'activité IA avec métriques détaillées et rapports" }
    ]
  },
  {
    category: "Automatisation & Gestion",
    icon: <Zap className="w-6 h-6" />,
    color: "from-cyan-400 to-blue-500", // Cyan to blue
    features: [
      { icon: <Calendar className="w-6 h-6" />, title: "Prise de RDV Automatique", desc: "Réservations 24/7 avec consultation agenda, confirmation et rappels intelligents", highlight: true },
      { icon: <CheckCircle2 className="w-6 h-6" />, title: "Statut d'Appel Automatique", desc: "Classification intelligente selon objectifs définis (ex: RDV booké = succès)" },
      { icon: <Clock className="w-6 h-6" />, title: "Disponibilité 24/7", desc: "Votre assistant vocal ne dort jamais - disponible en continu sans interruption" }
    ]
  },
  {
    category: "Transcription & Analyse",
    icon: <FileText className="w-6 h-6" />,
    color: "from-blue-400 to-blue-600", // Blue medium to dark
    features: [
      { icon: <FileText className="w-6 h-6" />, title: "Transcription Complète", desc: "Retranscription texte et audio de chaque appel avec horodatage précis", highlight: true },
      { icon: <MessageSquare className="w-6 h-6" />, title: "Résumé Automatique", desc: "Génération instantanée d'un résumé structuré de chaque conversation" },
      { icon: <Brain className="w-6 h-6" />, title: "Qualification Client", desc: "Collecte et mémorisation automatique de toutes les informations clés", highlight: true }
    ]
  },
  {
    category: "Appels & Communication",
    icon: <PhoneCall className="w-6 h-6" />,
    color: "from-cyan-500 to-blue-700", // Cyan medium to blue dark
    features: [
      { icon: <PhoneCall className="w-6 h-6" />, title: "Inbound & Outbound", desc: "Appels entrants illimités + sortants à chaud (demande de rappel uniquement)", highlight: true },
      { icon: <MessageSquare className="w-6 h-6" />, title: "Message Vocal Automatique", desc: "Si pas de réponse en outbound : mise à jour statut + message vocal laissé" },
      { icon: <Headphones className="w-6 h-6" />, title: "Redirection Intelligente", desc: "Transfert vers un humain si nécessaire avec contexte complet de l'appel" }
    ]
  }
];

const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-id'));
            setActiveFeature(id);
          }
        });
      },
      { threshold: 0.6 }
    );
    document.querySelectorAll('.feature-section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardId = Number(entry.target.getAttribute('data-card-id'));
          setVisibleCards(prev => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) newSet.add(cardId);
            return newSet;
          });
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll('.feature-card').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div id="features-section" className="relative w-full" style={{ backgroundColor: '#0F1C2E' }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              id={index === 2 ? 'feature-dynamics' : undefined}
              data-id={feature.id}
              className="feature-section min-h-[60vh] md:min-h-screen flex items-center py-12 md:py-20 border-l border-white/5 ml-4 md:ml-0 px-6 md:pl-20"
            >
              <div className={`max-w-xl transition-all duration-1000 transform ${activeFeature === feature.id ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-30 blur-sm'}`}>
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    {feature.icon}
                  </div>
                  <span className="font-tech text-neon-cyan uppercase tracking-widest text-xs md:text-sm">
                    0{feature.id} // {feature.title}
                  </span>
                </div>
                <h3 className="font-display font-bold text-3xl md:text-6xl text-white mb-4 md:mb-6 leading-tight">
                  {feature.subtitle}
                </h3>
                <p className="font-sans text-gray-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8 border-l-2 border-white/10 pl-4 md:pl-6">
                  {feature.desc}
                </p>
                <a
                  href={`/features#${feature.id === 1 ? 'intelligence' : feature.id === 2 ? 'automation' : 'transcription'}`}
                  className="inline-flex items-center gap-2 text-neon-blue font-tech text-sm tracking-widest uppercase cursor-pointer hover:text-white transition-colors"
                >
                  <span>En savoir plus</span>
                  <div className="w-8 h-[1px] bg-neon-blue"></div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section ref={sectionRef} id="additional-features" className="relative w-full py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0F1C2E 0%, #1a2332 50%, #0F1C2E 100%)' }}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-purple-500/20" style={{ animation: 'mesh-gradient 15s ease infinite' }}></div>
        </div>

        <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none transition-all duration-300 ease-out" style={{ left: mousePosition.x, top: mousePosition.y, transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />

        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-300/10 border border-primary-300/30 rounded-full mb-6 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-primary-300 animate-pulse" />
              <span className="font-tech text-xs text-primary-300 uppercase tracking-wider">Fonctionnalités Complètes</span>
            </div>
            <h2 className="font-display font-bold text-5xl md:text-6xl text-white mb-6 relative">
              Tout Ce Dont Vous Avez Besoin
              <div className="absolute -inset-4 bg-primary-500/20 blur-[80px] -z-10 animate-pulse"></div>
            </h2>
            <p className="text-text-200 text-xl max-w-3xl mx-auto">
              Une solution complète pour automatiser et optimiser votre gestion d'appels professionnelle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {featureCategories.map((category, catIdx) => (
              <div key={catIdx} data-card-id={catIdx} className={`feature-card group relative transition-all duration-700 transform ${visibleCards.has(catIdx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: `${catIdx * 150}ms`, perspective: '1000px' }}>
                <div className="relative h-full p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,240,255,0.3)]" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(0deg) rotateY(0deg)' }}>
                  {/* Animated gradient border */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${category.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-2xl text-white">{category.category}</h3>
                      <div className={`w-20 h-1 bg-gradient-to-r ${category.color} mt-2 group-hover:w-32 transition-all duration-500`}></div>
                    </div>
                  </div>
                  <div className="space-y-4 relative z-10">
                    {category.features.map((feature, idx) => (
                      <div key={idx} className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-white/5 ${feature.highlight ? 'bg-white/5' : ''}`}>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${feature.highlight ? `bg-gradient-to-br ${category.color}` : 'bg-white/10'} text-white`}>
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-display font-bold text-white mb-1 flex items-center gap-2">
                            {feature.title}
                            {feature.highlight && <span className="px-2 py-0.5 bg-primary-300/20 text-primary-300 text-[10px] font-tech uppercase rounded-full">Premium</span>}
                          </h4>
                          <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-20 max-w-6xl mx-auto">
            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-primary-300/30 rounded-3xl p-10 backdrop-blur-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10 opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8 justify-center">
                  <PhoneCall className="w-8 h-8 text-primary-300" />
                  <h3 className="font-display font-bold text-3xl text-white">Appels Entrants & Sortants</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
                    <div className="relative bg-white/5 border-2 border-primary-300/40 rounded-xl p-6 hover:border-primary-300/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                          <PhoneCall className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-display font-bold text-xl text-white">Inbound (Entrants)</h4>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary-300 mt-0.5 flex-shrink-0" />
                          <span className="text-text-200 text-sm"><strong className="text-white">Gestion complète</strong> de tous vos appels entrants</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary-300 mt-0.5 flex-shrink-0" />
                          <span className="text-text-200 text-sm">Logique chatbot intelligente avec questions prédéfinies</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary-300 mt-0.5 flex-shrink-0" />
                          <span className="text-text-200 text-sm"><strong className="text-white">Disponibilité 24/7</strong> sans interruption</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
                    <div className="relative bg-white/5 border-2 border-cyan-500/40 rounded-xl p-6 hover:border-cyan-500/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                          <PhoneCall className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-display font-bold text-xl text-white">Outbound (Sortants)</h4>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-text-200 text-sm"><strong className="text-white">Uniquement à chaud</strong> (demande de rappel)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-text-200 text-sm">Qualification client + prise de RDV automatique</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-text-200 text-sm">Si pas de réponse : statut mis à jour + <strong className="text-white">message vocal laissé</strong></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-6 bg-white/5 border border-primary-300/30 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-text-200 text-sm flex items-start gap-2">
                    <span className="text-primary-300 font-bold text-lg">⚠️</span>
                    <span><strong className="text-white">Important :</strong> Pas de prospection à froid - Vocal Flow respecte les bonnes pratiques et privilégie une approche qualitative</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes mesh-gradient {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(30px, -50px) rotate(120deg); }
            66% { transform: translate(-20px, 20px) rotate(240deg); }
          }
        `}</style>
      </section>
    </>
  );
};

export default Features;