import React from 'react';
import { Database, Server, Shield, Share2, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../../components/ui/scroll-reveal';
import { SparklesCore } from '../../components/ui/aceternity/sparkles';

const DatabaseFeature: React.FC = () => {
    return (
        <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#0F1C2E', overflowX: 'hidden' }}>

            {/* Hero Section */}
            <section className="relative w-full min-h-[90vh] flex items-center px-6 md:px-12 pt-32 pb-20">
                {/* Background Effects */}
                <div className="absolute inset-0 w-full h-full">
                    <SparklesCore
                        id="tsparticlesdatabase"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={60}
                        className="w-full h-full"
                        particleColor="#acc2ef"
                    />
                </div>

                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div>
                        <ScrollReveal>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                                    <Database className="w-6 h-6 text-white" />
                                </div>
                                <span className="font-tech text-sm tracking-[0.2em] text-gray-400">01 // INTELLIGENCE</span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[0.9]">
                                Base de <br />
                                Données <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-white">Ultra</span> <br />
                                Enrichie
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <div className="pl-6 border-l-2 border-neon-blue/30 max-w-xl">
                                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                    Vocal Flow accède à une connaissance complète de votre business : catalogue produits/services avec prix, disponibilités agenda en temps réel, historique client CRM, et toutes les informations métier nécessaires pour des réponses ultra-précises.
                                </p>

                                <a href="/contact" className="inline-flex items-center gap-3 text-neon-blue font-tech tracking-widest text-sm hover:translate-x-2 transition-transform cursor-pointer group">
                                    EN SAVOIR PLUS
                                    <span className="h-[1px] w-12 bg-neon-blue group-hover:w-20 transition-all"></span>
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Visual / Image placeholder based on design */}
                    <ScrollReveal delay={0.3} className="relative hidden lg:block h-[600px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-purple-500/20 rounded-3xl blur-3xl opacity-30"></div>
                        <div className="relative h-full w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-between overflow-hidden group hover:border-neon-blue/30 transition-colors duration-500">
                            {/* Abstract UI Representation */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400/50"></div>
                                    </div>
                                    <div className="font-tech text-xs text-gray-500">DATABASE_CX_V2.0</div>
                                </div>
                                <div className="space-y-2 font-mono text-xs text-neon-blue/80">
                                    <div className="flex justify-between"><span className="text-gray-500">STATUS:</span> <span>CONNECTED</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">LATENCY:</span> <span>12ms</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">SYNC:</span> <span>REAL-TIME</span></div>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-neon-blue/10 to-transparent"></div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

        </div>
    );
};

export default DatabaseFeature;
