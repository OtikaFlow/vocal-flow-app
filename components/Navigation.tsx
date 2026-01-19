import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useBooking();
  const location = useLocation();

  const navItems = [
    { label: 'ACCUEIL', path: '/' },
    { label: 'DÉMOS', path: '/demos' },
    { label: 'INSTALLATION', path: '/installation' },
    { label: 'FONCTIONNALITÉS', path: '/features' },
    { label: 'TARIFICATION', path: '/tarification' },
    { label: 'CONTACT', path: '/contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-3 md:py-4 px-4 md:px-12 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">

        {/* Logo - Touch optimized */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 group cursor-pointer min-h-[44px]">
          <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <img
              src="/assets/logo.png"
              alt="Vocal Flow Logo"
              className="w-full h-full object-contain animate-pulse-slow drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]"
              loading="eager"
            />
          </div>
          <span className="font-display font-bold text-base md:text-xl tracking-wider text-white group-hover:text-neon-blue transition-colors">
            VOCAL FLOW
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-tech text-xs xl:text-sm tracking-widest uppercase transition-colors min-h-[44px] flex items-center ${isActive(item.path)
                ? 'text-neon-blue'
                : 'text-white hover:text-neon-blue'
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden lg:flex items-center gap-4">
            {/* Booking Button - Touch optimized */}
            <button
              onClick={openModal}
              className="bg-neon-blue/10 hover:bg-neon-blue/20 border border-neon-blue/50 text-neon-blue px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all hover:scale-105 group min-h-[44px]"
            >
              <Calendar className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-bold tracking-wider">PRENDRE RDV</span>
            </button>
          </div>

          {/* Mobile Menu Button - Touch optimized (min 44px) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex items-center gap-2 cursor-pointer hover:text-neon-blue transition-colors text-white min-h-[44px] min-w-[44px] justify-center"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
          >
            <span className="font-display font-bold text-sm tracking-widest hidden sm:inline">MENU</span>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Optimized for touch */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-black/95 backdrop-blur-lg border-t border-white/10 overflow-y-auto animate-fade-in">
          <div className="flex flex-col p-4 md:p-6 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`font-tech text-sm tracking-widest uppercase py-4 px-5 rounded-xl transition-all min-h-[56px] flex items-center ${isActive(item.path)
                  ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/30'
                  : 'text-white hover:bg-white/5 active:bg-white/10'
                  }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile CTA Button - Touch optimized */}
            <button
              onClick={() => { openModal(); setIsMenuOpen(false); }}
              className="bg-neon-blue/10 border border-neon-blue text-neon-blue py-4 px-5 rounded-xl flex items-center justify-center gap-2 mt-4 font-tech text-sm tracking-widest uppercase min-h-[56px] active:scale-95 transition-transform"
            >
              <Calendar className="w-5 h-5" />
              PRENDRE RDV
            </button>
          </div>
        </div>
      )}
    </nav >
  );
};

export default Navigation;