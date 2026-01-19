import React from 'react';
import { ScrollReveal } from '../components/ui/scroll-reveal';

const MentionsLegales: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-bg-100 font-sans pt-32 pb-20 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                <ScrollReveal>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-12">Mentions Légales</h1>
                </ScrollReveal>

                <div className="space-y-12 text-gray-300">
                    <ScrollReveal delay={0.1}>
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">1. Édition du site</h2>
                            <p>
                                En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site internet <strong>Vocal Flow</strong> l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :
                            </p>
                            <p>
                                <strong>Propriétaires du site :</strong><br />
                                Yassir Larabi (LBI Agency)<br />
                                Dylan BELLUR (Otika Agence digitale)
                            </p>
                            <p>
                                <strong>Contact :</strong><br />
                                Email : contact@vocalflow.ai<br />
                                Téléphone : +33 1 23 45 67 89
                            </p>
                            <p>
                                <strong>Adresse :</strong><br />
                                Paris, France
                            </p>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">2. Hébergement</h2>
                            <p>
                                Le site est hébergé par <strong>Vercel Inc.</strong><br />
                                340 S Lemon Ave #4133 Walnut, CA 91789, USA
                            </p>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3}>
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">3. Propriété intellectuelle</h2>
                            <p>
                                <strong>Vocal Flow</strong> est propriétaire des droits de propriété intellectuelle et détient les droits d’usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons.
                            </p>
                            <p>
                                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
                            </p>
                            <p>
                                Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
                            </p>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal delay={0.4}>
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">4. Limitations de responsabilité</h2>
                            <p>
                                <strong>Vocal Flow</strong> ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site.
                            </p>
                            <p>
                                <strong>Vocal Flow</strong> décline toute responsabilité quant à l’utilisation qui pourrait être faite des informations et contenus présents sur le site.
                            </p>
                            <p>
                                <strong>Vocal Flow</strong> s’engage à sécuriser au mieux le site, cependant sa responsabilité ne pourra être mise en cause si des données indésirables sont importées et installées sur son site à son insu.
                            </p>
                        </section>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
};

export default MentionsLegales;
