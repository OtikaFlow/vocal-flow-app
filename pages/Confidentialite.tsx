import React from 'react';
import { ScrollReveal } from '../components/ui/scroll-reveal';

const Confidentialite: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-bg-100 font-sans pt-32 pb-20 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                <ScrollReveal>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-12">Politique de Confidentialité</h1>
                </ScrollReveal>

                <div className="space-y-12 text-gray-300">
                    <ScrollReveal delay={0.1}>
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">1. Collecte des données</h2>
                            <p>
                                Dans le cadre de l'utilisation du site <strong>Vocal Flow</strong>, nous pouvons être amenés à collecter les données suivantes :
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Nom et Prénom</li>
                                <li>Adresse email</li>
                                <li>Numéro de téléphone</li>
                                <li>Nom de l'entreprise</li>
                                <li>Données de navigation (cookies)</li>
                            </ul>
                            <p>
                                Ces données sont collectées lorsque vous remplissez notre formulaire de contact, demandez une démonstration, ou naviguez sur notre site.
                            </p>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">2. Utilisation des données</h2>
                            <p>
                                Les données collectées sont utilisées pour les finalités suivantes :
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Répondre à vos demandes de contact et de démonstration.</li>
                                <li>Gérer la relation commerciale.</li>
                                <li>Améliorer nos services et votre expérience utilisateur.</li>
                                <li>Vous envoyer des informations sur nos produits (si vous y avez consenti).</li>
                            </ul>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3}>
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">3. Partage des données</h2>
                            <p>
                                Vos données personnelles sont strictement confidentielles et ne sont <strong>jamais vendues</strong> à des tiers.
                            </p>
                            <p>
                                Elles peuvent être partagées uniquement avec nos prestataires de services techniques (hébergement, outils d'analyse) dans la stricte limite nécessaire à l'exécution de leurs missions et conformément à la réglementation en vigueur (RGPD).
                            </p>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal delay={0.4}>
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">4. Vos droits</h2>
                            <p>
                                Conformément à la réglementation applicable (RGPD), vous disposez des droits suivants sur vos données personnelles :
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Droit d'accès et de rectification.</li>
                                <li>Droit à l'effacement (droit à l'oubli).</li>
                                <li>Droit à la limitation du traitement.</li>
                                <li>Droit d'opposition.</li>
                            </ul>
                            <p>
                                Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante : <strong>contact@vocalflow.ai</strong>.
                            </p>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal delay={0.5}>
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">5. Cookies</h2>
                            <p>
                                Notre site utilise des cookies pour améliorer l'interactivité et nos services. Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies.
                            </p>
                        </section>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
};

export default Confidentialite;
