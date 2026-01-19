import React, { useState, useEffect, useRef } from 'react';
import VoiceOrb from './VoiceOrb';
import { ArrowRight, Cpu, Activity, Play, X, Building2, Phone, Wrench } from 'lucide-react';
import { TextGenerateEffect } from './ui/aceternity/text-generate-effect';
import { SparklesCore } from './ui/aceternity/sparkles';
import { useBooking } from '../context/BookingContext';

const demosData = [
  {
    id: 1,
    icon: <Building2 className="w-5 h-5" />,
    title: "Médical",
    videoUrl: "https://www.youtube.com/embed/p0WxxNbVySQ",
    videoThumbnail: "https://img.youtube.com/vi/p0WxxNbVySQ/maxresdefault.jpg",
    delay: 0
  },
  {
    id: 2,
    icon: <Phone className="w-5 h-5" />,
    title: "Call Center",
    videoUrl: "https://www.youtube.com/embed/ahDNbwCvLaA",
    videoThumbnail: "https://img.youtube.com/vi/ahDNbwCvLaA/maxresdefault.jpg",
    delay: 150
  },
  {
    id: 3,
    icon: <Wrench className="w-5 h-5" />,
    title: "Garage",
    videoUrl: "https://www.youtube.com/embed/7NFiiVx7JJA",
    videoThumbnail: "https://img.youtube.com/vi/7NFiiVx7JJA/maxresdefault.jpg",
    delay: 300
  }
];

const Hero: React.FC = () => {
  const { openModal } = useBooking();
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const demoCardsRef = useRef<HTMLDivElement>(null);

  const openVideoPopup = (videoUrl: string, title: string) => {
    setActiveVideo({ url: videoUrl, title });
    setShowVideoPopup(true);
  };

  const closeVideoPopup = () => {
    setShowVideoPopup(false);
    setActiveVideo(null);
  };

  // Same Intersection Observer as Stats section
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });

    if (demoCardsRef.current) observer.observe(demoCardsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="relative w-full min-h-[90vh] flex flex-col md:flex-row items-center justify-center px-6 md:px-12 pt-32 max-w-screen-2xl mx-auto overflow-hidden">

        {/* Left Content */}
        <div className="w-full md:w-1/2 z-20 flex flex-col items-start pt-12 md:pt-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-blue/10 border border-neon-blue/30 rounded-full mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></span>
            <span className="font-tech text-neon-blue tracking-widest text-xs uppercase">La meilleur IA vocale du marché et de loin !</span>
          </div>

          <div className="mb-8 relative">
            <TextGenerateEffect
              words="L'IA VOCALE QUI COMPREND, PARLE ET INTERAGIT"
              className="font-display font-bold text-5xl md:text-7xl lg:text-[5rem] leading-[0.9] text-white tracking-tight"
            />
            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-[5rem] leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-200 tracking-tight mt-2">
              Comme un humain.
            </h1>
            {/* Glow effect behind title */}
            <div className="absolute -inset-10 bg-neon-blue/20 blur-[100px] -z-10 pointer-events-none"></div>
          </div>

          <h2 className="font-display font-medium text-2xl md:text-3xl text-gray-300 mb-8 max-w-xl leading-snug">
            Prise de RDV, Qualification Client & <span className="text-white">Gestion d'Appels Automatisée</span>
          </h2>

          <p className="font-sans text-gray-400 text-lg max-w-lg mb-12 leading-relaxed border-l-2 border-neon-blue/30 pl-6">
            Vocal Flow automatise vos appels entrants et sortants avec une IA vocale ultra-précise. Idéal pour <span className="text-white font-medium">cabinets dentaires, call centers et garages</span> : prise de rendez-vous automatique, qualification client intelligente et transcription complète.
          </p>

          {/* Demo Cards - Same animation as Stats section */}
          <div ref={demoCardsRef} className="w-full max-w-md mb-8">
            <p
              className={`font-tech text-xs text-primary-300 uppercase tracking-wider mb-3 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
              🎥 Voir les démos en conditions réelles
            </p>
            <div className="grid grid-cols-3 gap-3">
              {demosData.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => openVideoPopup(demo.videoUrl, demo.title)}
                  className={`group relative h-24 rounded-lg overflow-hidden border border-primary-300/30 hover:border-primary-300/60 transition-all duration-700 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(172,194,239,0.3)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                  style={{ transitionDelay: `${demo.delay}ms` }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={demo.videoThumbnail}
                      alt={demo.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-100 via-bg-100/70 to-bg-100/40"></div>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center gap-2 p-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white group-hover:bg-primary-300/30 transition-colors border border-white/30">
                      {demo.icon}
                    </div>
                    <span className="font-display text-xs text-white font-bold drop-shadow-lg">{demo.title}</span>

                    {/* Play Icon */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary-300 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(172,194,239,0.6)] group-hover:scale-110 transition-transform">
                      <Play className="w-3 h-3 text-bg-100 ml-0.5" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={openModal}
            className="group relative inline-flex items-center justify-center px-6 py-3 font-display font-bold text-white transition-all duration-200 bg-neon-blue rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-blue hover:scale-105 shadow-[0_0_30px_rgba(0,240,255,0.4)] overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
            <span className="relative flex items-center gap-2">
              RÉSERVER UNE DÉMO <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        {/* Right Content / Visualizer */}
        <div className="w-full md:w-1/2 relative h-[50vh] md:h-[80vh] flex items-center justify-center z-10">

          {/* The 3D Orb Canvas */}
          <div className="absolute inset-0 animate-float">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className="w-full h-full absolute z-0"
              particleColor="#acc2ef"
            />
            <VoiceOrb />
          </div>

          {/* Floating Data Points */}
          <div className="absolute top-[15%] right-0 md:right-10 bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-lg transform translate-x-4 md:translate-x-0 z-20">
            <div className="flex items-start gap-4">
              <div className="text-right">
                <div className="font-display text-3xl font-bold text-white">97.6%</div>
                <div className="font-tech text-xs text-neon-blue uppercase tracking-wider">Précision Contextuelle</div>
              </div>
              <div className="w-10 h-10 bg-blue-900/30 rounded flex items-center justify-center border border-blue-500/30">
                <Activity className="w-5 h-5 text-neon-blue" />
              </div>
            </div>
            <div className="absolute top-1/2 -left-20 w-20 h-[1px] bg-gradient-to-r from-transparent to-neon-blue/50 hidden md:block"></div>
            <div className="absolute top-1/2 -left-20 w-1 h-1 bg-neon-blue rounded-full shadow-[0_0_5px_#00f0ff] hidden md:block"></div>
          </div>

          <div className="absolute bottom-1/4 left-0 md:left-10 bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-lg hidden md:block">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="font-tech text-xs text-gray-300 uppercase tracking-wider">Traitement Neural Actif</div>
            </div>
            <div className="absolute top-1/2 -right-16 w-16 h-[1px] bg-gradient-to-l from-transparent to-neon-blue/50"></div>
            <div className="absolute top-1/2 -right-16 w-1 h-1 bg-neon-blue rounded-full shadow-[0_0_5px_#00f0ff]"></div>
          </div>

        </div>
      </section>

      {/* Video Popup Modal */}
      {showVideoPopup && activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={closeVideoPopup}
        >
          <div
            className="relative w-full max-w-5xl bg-bg-200 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(172,194,239,0.4)] border-2 border-primary-300/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideoPopup}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-bg-100/80 hover:bg-primary-300 border border-primary-300/50 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>

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

export default Hero;