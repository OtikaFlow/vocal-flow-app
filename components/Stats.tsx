import React, { useEffect, useRef, useState } from 'react';
import { Activity, Clock, Zap } from 'lucide-react';

const stats = [
    {
        id: 1,
        value: "97.6%",
        label: "Précision contextuelle sur appels décrochés",
        icon: <Activity className="w-6 h-6 text-neon-cyan" />,
        delay: 0
    },
    {
        id: 2,
        value: "3-4 min",
        label: "Durée moyenne d'un appel",
        icon: <Clock className="w-6 h-6 text-neon-blue" />,
        delay: 150
    },
    {
        id: 3,
        value: "24/7",
        label: "Disponibilité continue sans interruption",
        icon: <Zap className="w-6 h-6 text-white" />,
        delay: 300
    }
];

const Stats: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsVisible(true);
        }, { threshold: 0.2 });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="stats" className="relative w-full py-24 border-t border-white/5" style={{ backgroundColor: '#1f2b3e' }}>
            <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                <div className="flex flex-col items-center mb-16">
                    <h2 className="font-display font-medium text-3xl md:text-4xl text-white mb-4 text-center">
                        Performances Prouvées
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-300 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className={`relative group bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm transition-all duration-700 transform hover:-translate-y-2 hover:border-neon-blue/50 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${stat.delay}ms` }}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                {stat.icon}
                            </div>
                            <h3 className="font-display font-bold text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-4 group-hover:from-neon-blue group-hover:to-neon-cyan transition-colors">
                                {stat.value}
                            </h3>
                            <p className="font-tech text-gray-400 uppercase tracking-widest text-sm">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
