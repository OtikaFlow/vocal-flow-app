import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full relative pt-20 pb-10 overflow-hidden" style={{ backgroundColor: '#0B1221' }}>
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-300/30 to-transparent"></div>
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-300/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link to="/" className="text-2xl font-display font-bold text-white tracking-wider block">
                            VOCAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-primary-300">FLOW</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            L'intelligence artificielle qui transforme votre gestion d'appels. Automatisation, transcription et analyse pour les entreprises modernes.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://www.linkedin.com/in/yassir-larabi/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-300/20 hover:border-primary-300/50 transition-all duration-300 group"
                            >
                                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-display font-bold text-white mb-6">Navigation</h4>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-gray-400 hover:text-primary-300 transition-colors text-sm">Accueil</Link></li>
                            <li><Link to="/demos" className="text-gray-400 hover:text-primary-300 transition-colors text-sm">Démos</Link></li>
                            <li><Link to="/features" className="text-gray-400 hover:text-primary-300 transition-colors text-sm">Fonctionnalités</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-display font-bold text-white mb-6">Services</h4>
                        <ul className="space-y-4">
                            <li><Link to="/installation" className="text-gray-400 hover:text-primary-300 transition-colors text-sm">Installation</Link></li>
                            <li><Link to="/tarification" className="text-gray-400 hover:text-primary-300 transition-colors text-sm">Tarification</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-primary-300 transition-colors text-sm">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="font-display font-bold text-white mb-6">Contact</h4>
                        <div className="space-y-4">
                            <a href="https://www.google.com/maps/place/Paris,+France" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary-300/10 transition-colors">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <span className="text-sm">Paris, France</span>
                            </a>
                        </div>

                        {/* Newsletter Tiny */}
                        <div className="mt-8">
                            <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-tech">Newsletter</p>
                            <div className="flex bg-white/5 rounded-lg border border-white/10 p-1 focus-within:border-primary-300/50 transition-colors">
                                <input
                                    type="email"
                                    placeholder="Email..."
                                    className="bg-transparent border-none outline-none text-white text-sm px-3 w-full placeholder-gray-600"
                                />
                                <button className="w-8 h-8 bg-primary-300 rounded-md flex items-center justify-center text-bg-100 hover:bg-white transition-colors">
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 text-xs">
                        &copy; 2025 Vocal Flow. Tous droits réservés.
                    </p>
                    <div className="flex gap-6">
                        <Link to="/mentions-legales" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Mentions Légales</Link>
                        <Link to="/confidentialite" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Confidentialité</Link>
                        <span className="text-gray-700 text-xs">|</span>
                        <a href="https://otika.fr" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-neon-blue text-xs transition-colors">
                            Made by Otika
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
