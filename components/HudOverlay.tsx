import React from 'react';

const HudOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden hidden md:block">

      {/* Left Vertical Bar */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-12 opacity-40">
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
        <div className="writing-vertical-rl font-tech text-[10px] tracking-[0.3em] text-white/70 uppercase">
          System Operational
        </div>
        <div className="flex flex-col gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white/50 rounded-full"></div>
          ))}
        </div>
        <div className="writing-vertical-rl font-tech text-[10px] tracking-[0.3em] text-neon-blue uppercase">
          Pack: Alpha
        </div>
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
      </div>

      {/* Right Vertical Bar (Date/Time) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-12 opacity-40">
        <div className="w-[1px] h-20 bg-white/20"></div>
        <div className="writing-vertical-rl font-tech text-[10px] tracking-[0.3em] text-white/50 uppercase">
          {new Date().getFullYear()} // V.2.0
        </div>
        <div className="writing-vertical-rl font-tech text-[10px] tracking-[0.3em] text-white/50 uppercase animate-pulse">
          Live Feed
        </div>
        <div className="w-[1px] h-20 bg-white/20"></div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-[1px] h-8 bg-neon-blue/50"></div>
        <div className="font-tech text-[10px] tracking-[0.2em] text-white/50 uppercase">Scroll</div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-24 left-6 w-4 h-4 border-l border-t border-white/20"></div>
      <div className="absolute top-24 right-6 w-4 h-4 border-r border-t border-white/20"></div>
      <div className="absolute bottom-6 left-6 w-4 h-4 border-l border-b border-white/20"></div>
      <div className="absolute bottom-6 right-6 w-4 h-4 border-r border-b border-white/20"></div>

    </div>
  );
};

export default HudOverlay;