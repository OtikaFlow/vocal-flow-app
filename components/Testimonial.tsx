import React, { useState } from 'react';
import { Quote, Star } from 'lucide-react';

// Enhanced testimonials data
const testimonials = [
    {
        id: 1,
        name: "Thomas",
        role: "Gérant",
        company: "Garage Automobile",
        quote: "On perdait 30% des appels atelier. Aujourd'hui, Vocal Flow gère toutes les prises de RDV et les demandes de devis simples. Mon équipe ne touche plus au téléphone.",
        rating: 5,
        context: "Garage & Concession - 50+ appels/jour"
    },
    {
        id: 2,
        name: "Sophie",
        role: "Coordinatrice Médicale",
        company: "Centre de Santé",
        quote: "L'IA gère le tri des urgences et les rendez-vous de routine avec une empathie surprenante. Nos secrétaires médicales sont enfin soulagées.",
        rating: 5,
        context: "Santé - 120+ appels/jour"
    },
    {
        id: 3,
        name: "Marc",
        role: "Directeur",
        company: "Agence Immobilière",
        quote: "Les prospects peuvent maintenant planifier une visite à 23h ou le dimanche. Notre taux de transformation a doublé depuis l'installation.",
        rating: 5,
        context: "Immobilier - 40+ appels/jour"
    },
    {
        id: 4,
        name: "Julie",
        role: "Responsable Service Client",
        company: "E-Commerce",
        quote: "Vocal Flow qualifie chaque appel entrant. On sait exactement pourquoi le client appelle avant même de décrocher. Un gain de temps phénoménal.",
        rating: 5,
        context: "Retail - 300+ appels/jour"
    },
    {
        id: 5,
        name: "Karim",
        role: "Chef de Salle",
        company: "Grand Restaurant",
        quote: "Fini le téléphone qui sonne pendant le service. Les réservations se font toutes seules, et l'IA gère même les questions sur le menu.",
        rating: 5,
        context: "Restauration - 80+ appels/jour"
    },
    {
        id: 6,
        name: "Elise",
        role: "Directrice",
        company: "Cabinet Juridique",
        quote: "Une image ultra-professionnelle pour notre cabinet. Aucun appel manqué, et une pré-qualification juridique qui nous fait gagner des heures.",
        rating: 5,
        context: "Juridique - 60+ appels/jour"
    }
];

const Testimonial: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-scroll effect
    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % testimonials.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="testimony" className="relative w-full py-24 overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#1f2b3e' }}>
            {/* Abstract Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px]" style={{ backgroundColor: 'rgba(172, 194, 239, 0.15)' }}></div>
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-300/10 border border-primary-300/30 rounded-full mb-6">
                        <Star className="w-4 h-4 text-primary-300" />
                        <span className="font-tech text-xs text-primary-300 uppercase tracking-wider">Témoignages Clients</span>
                    </div>
                    <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                        Ils Nous Font Confiance
                    </h2>
                    <p className="text-text-200 text-lg">
                        Découvrez comment Vocal Flow transforme leur quotidien
                    </p>
                </div>

                {/* Testimonial Carousel */}
                <div className="relative min-h-[400px]">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${index === activeIndex
                                ? 'opacity-100 translate-x-0 z-20'
                                : 'opacity-0 translate-x-10 z-10'
                                }`}
                        >
                            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 hover:border-primary-300/30 transition-colors shadow-2xl backdrop-blur-sm">
                                {/* Quote Icon */}
                                <div className="absolute top-8 right-8">
                                    <Quote className="w-16 h-16 text-primary-300/10 rotate-180" />
                                </div>

                                {/* Rating */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-primary-300 text-primary-300 drop-shadow-[0_0_8px_rgba(172,194,239,0.5)]" />
                                    ))}
                                </div>

                                {/* Quote Text */}
                                <blockquote className="mb-8 relative z-10">
                                    <p className="font-display font-medium text-xl md:text-3xl leading-relaxed text-white">
                                        « {testimonial.quote} »
                                    </p>
                                </blockquote>

                                {/* Context Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-300/10 border border-primary-300/20 rounded-lg mb-8">
                                    <span className="font-tech text-xs text-primary-300 uppercase tracking-wider">
                                        {testimonial.context}
                                    </span>
                                </div>

                                {/* Author Info */}
                                <footer className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary-300 rounded-full flex items-center justify-center font-bold text-bg-100 text-lg">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <cite className="font-display font-bold text-lg text-white not-italic block">
                                            {testimonial.name}
                                        </cite>
                                        <span className="font-sans text-primary-300/80 text-sm block">
                                            {testimonial.role} - {testimonial.company}
                                        </span>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                ? 'w-8 bg-primary-300 shadow-[0_0_10px_rgba(172,194,239,0.5)]'
                                : 'w-2 bg-white/20 hover:bg-white/40'
                                }`}
                            aria-label={`Aller au témoignage ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
